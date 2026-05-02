import { Client, Account, Databases, Storage, Query, ID, TablesDB } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const tablesDB = new TablesDB(client);

export const APPWRITE_CONFIG = {
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    projectsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID!,
    reviewsCollectionId: 'reviews',
    profilesCollectionId: 'profiles',
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!,
};

export { client, account, databases, storage, tablesDB, Query, ID };
