import { tablesDB, storage, Query, ID, APPWRITE_CONFIG, account } from './appwrite';
import { Project, CreateProjectData, Review } from './types';

export const projectService = {
  // Get all projects
  async getAllProjects(): Promise<Project[]> {
    try {
      const response = await tablesDB.listRows({
        databaseId: APPWRITE_CONFIG.databaseId,
        tableId: APPWRITE_CONFIG.projectsCollectionId,
        queries: [Query.orderDesc('$createdAt')]
      });
      return response.rows.map(row => ({ ...row })) as unknown as Project[];
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Get project by ID
  async getProjectById(id: string): Promise<Project> {
    try {
      const response = await tablesDB.getRow({
        databaseId: APPWRITE_CONFIG.databaseId,
        tableId: APPWRITE_CONFIG.projectsCollectionId,
        rowId: id
      });
      return { ...response } as unknown as Project;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

  // Upload thumbnail
  async uploadThumbnail(file: File) {
    try {
      const response = await storage.createFile(
        APPWRITE_CONFIG.bucketId,
        ID.unique(),
        file
      );
      return response.$id;
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      throw error;
    }
  },

  // Get thumbnail URL
  getThumbnailUrl(fileId: string) {
    if (!fileId) return '/placeholder-project.jpg';
    return storage.getFileView(APPWRITE_CONFIG.bucketId, fileId).toString();
  },

  // Create project
  async createProject(data: CreateProjectData, thumbnailFile: File) {
    try {
      const thumbnailId = await this.uploadThumbnail(thumbnailFile);
      
      const payload = {
        ...data,
        thumbnail: thumbnailId,
      };

      const response = await tablesDB.createRow({
        databaseId: APPWRITE_CONFIG.databaseId,
        tableId: APPWRITE_CONFIG.projectsCollectionId,
        rowId: ID.unique(),
        data: payload
      });
      return { ...response } as unknown as Project;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Update project
  async updateProject(id: string, data: Partial<Project>, newThumbnailFile?: File) {
    try {
      let payload = { ...data };

      if (newThumbnailFile) {
        const thumbnailId = await this.uploadThumbnail(newThumbnailFile);
        payload.thumbnail = thumbnailId;
      }

      // Remove Appwrite system fields from update payload
      delete (payload as any).$id;
      delete (payload as any).$createdAt;
      delete (payload as any).$updatedAt;
      delete (payload as any).$permissions;
      delete (payload as any).$databaseId;
      delete (payload as any).$collectionId;

      const response = await tablesDB.updateRow({
        databaseId: APPWRITE_CONFIG.databaseId,
        tableId: APPWRITE_CONFIG.projectsCollectionId,
        rowId: id,
        data: payload
      });
      return { ...response } as unknown as Project;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  // Delete project
  async deleteProject(id: string, thumbnailId?: string) {
    try {
      // Delete document
      await tablesDB.deleteRow({
        databaseId: APPWRITE_CONFIG.databaseId,
        tableId: APPWRITE_CONFIG.projectsCollectionId,
        rowId: id
      });

      // Delete file if provided
      if (thumbnailId) {
        await storage.deleteFile(APPWRITE_CONFIG.bucketId, thumbnailId);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }
};

export const profilesService = {
  async getProfilesCount(): Promise<number> {
    try {
      const response = await tablesDB.listRows({
        databaseId: APPWRITE_CONFIG.databaseId,
        tableId: APPWRITE_CONFIG.profilesCollectionId,
      });
      return response.total;
    } catch (error) {
      console.error('Error fetching profiles count:', error);
      return 0;
    }
  }
};

export const reviewService = {
  // Get all reviews (published and unpublished)
  async getAllReviews(): Promise<Review[]> {
    try {
      const response = await tablesDB.listRows({
        databaseId: APPWRITE_CONFIG.databaseId,
        tableId: APPWRITE_CONFIG.reviewsCollectionId,
        queries: [Query.orderDesc('$createdAt')]
      });
      return response.rows.map(row => ({ ...row })) as unknown as Review[];
    } catch (error) {
      console.error('Error fetching all reviews:', error);
      return [];
    }
  },

  // Update review status (Approve/Unpublish)
  async updateReviewStatus(reviewId: string, isPublished: boolean): Promise<void> {
    try {
      await tablesDB.updateRow({
        databaseId: APPWRITE_CONFIG.databaseId,
        tableId: APPWRITE_CONFIG.reviewsCollectionId,
        rowId: reviewId,
        data: { is_published: isPublished }
      });
    } catch (error) {
      console.error('Error updating review status:', error);
      throw error;
    }
  },

  // Delete review
  async deleteReview(reviewId: string): Promise<void> {
    try {
      await tablesDB.deleteRow({
        databaseId: APPWRITE_CONFIG.databaseId,
        tableId: APPWRITE_CONFIG.reviewsCollectionId,
        rowId: reviewId
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  }
};

export const authService = {
  async login(email: string, pass: string) {
    try {
      return await account.createEmailPasswordSession(email, pass);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  async getCurrentUser() {
    try {
      const user = await account.get();
      console.log('Current user found:', user.$id);
      return user;
    } catch (error) {
      console.log('No active session found or error:', error);
      return null;
    }
  }
};
