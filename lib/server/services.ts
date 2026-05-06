import { createSessionClient, createAdminClient } from "./appwrite";
import { Query } from "node-appwrite";
import { Project } from "../types";

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const projectsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID!;
const reviewsCollectionId = "reviews";
const profilesCollectionId = "profiles";

export const serverProjectService = {
  async getAllProjects() {
    const client = await createSessionClient();
    if (!client) throw new Error("Not authenticated");

    const response = await client.databases.listDocuments(
      databaseId,
      projectsCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    return response.documents;
  },

  async createProject(data: Partial<Project>) {
    const client = await createAdminClient();
    return await client.databases.createDocument(
      databaseId,
      projectsCollectionId,
      "unique()",
      data
    );
  },

  async updateProject(projectId: string, data: Partial<Project>) {
    const client = await createAdminClient();
    return await client.databases.updateDocument(
      databaseId,
      projectsCollectionId,
      projectId,
      data
    );
  },

  async deleteProject(projectId: string) {
    const client = await createAdminClient();
    return await client.databases.deleteDocument(
      databaseId,
      projectsCollectionId,
      projectId
    );
  },
};

export const serverProfilesService = {
  async getProfilesCount() {
    const client = await createSessionClient();
    if (!client) throw new Error("Not authenticated");

    const response = await client.databases.listDocuments(
      databaseId,
      profilesCollectionId
    );
    return response.total;
  },
};

export const serverReviewService = {
  async getAllReviews() {
    const client = await createSessionClient();
    if (!client) throw new Error("Not authenticated");

    const response = await client.databases.listDocuments(
      databaseId,
      reviewsCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    return response.documents;
  },
};
