import { 
    getCurrentUserAction, 
    createProjectAction,
    updateProjectAction,
    deleteProjectAction,
    uploadImageAction,
    getAllProjectsAction
} from "./server/actions";
import { Project, CreateProjectData } from "./types";
import { urlFor } from "./sanity";

export const projectService = {
    async uploadThumbnail(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadImageAction(formData);
        if (!result.success || !result.assetId) {
            throw new Error(result.error || "Failed to upload thumbnail");
        }
        return result.assetId;
    },

    async getAllProjects(): Promise<Project[]> {
        const result = await getAllProjectsAction();
        if (!result.success || !result.projects) {
            throw new Error(result.error || "Failed to fetch projects");
        }
        return result.projects as unknown as Project[];
    },

    getThumbnailUrl(thumbnail: any): string {
        return urlFor(thumbnail);
    },

    async createProject(data: CreateProjectData, thumbnailFile: File) {
        const assetId = await this.uploadThumbnail(thumbnailFile);
        const payload: Partial<Project> = {
            ...data,
            thumbnail: assetId,
        };
        const result = await createProjectAction(payload);
        if (!result.success) {
            throw new Error(result.error || "Failed to create project");
        }
        return result.project;
    },

    async updateProject(id: string, data: Partial<Project>, newThumbnailFile?: File) {
        let payload = { ...data };
        if (newThumbnailFile) {
            const assetId = await this.uploadThumbnail(newThumbnailFile);
            payload.thumbnail = assetId;
        }
        
        // Remove Sanity system fields from payload
        delete (payload as any)._id;
        delete (payload as any)._createdAt;
        delete (payload as any)._updatedAt;
        delete (payload as any)._type;
        delete (payload as any)._rev;
        
        const result = await updateProjectAction(id, payload);
        if (!result.success) {
            throw new Error(result.error || "Failed to update project");
        }
        return result.project;
    },

    async deleteProject(id: string, thumbnailId?: string) {
        // thumbnailId is optional for Appwrite compatibility
        const result = await deleteProjectAction(id);
        if (!result.success) {
            throw new Error(result.error || "Failed to delete project");
        }
    }
};

export const authService = {
    async getCurrentUser() {
        return await getCurrentUserAction();
    },
    async logout() {
        // Handled directly via redirect in logoutAction
    }
};
