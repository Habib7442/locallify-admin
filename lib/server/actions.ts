"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { client, writeClient } from "../sanity";
import { 
  encryptSession, 
  getLoggedInUser, 
  hashPassword, 
  verifyPassword 
} from "./sanity";
import { serverReviewService, serverProjectService } from "./services";
import { Project } from "@/lib/types";

export async function getCurrentUserAction() {
  return await getLoggedInUser();
}

export async function getAllProjectsAction() {
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");
    const projects = await serverProjectService.getAllProjects();
    return { success: true, projects };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch projects" };
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // Find the admin user by email
    const query = `*[_type == "admin" && email == $email][0]`;
    const user = await client.fetch(query, { email });

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { success: false, error: "Invalid email or password" };
    }

    // Encrypt JWT session
    const sessionToken = await encryptSession({
      userId: user._id,
      email: user.email,
      name: user.name,
    });

    // Set secure cookie
    const cookieStore = await cookies();
    cookieStore.set("locallify-session", sessionToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return { success: true };
  } catch (error: any) {
    console.error("Login action error:", error);
    return { success: false, error: error.message || "Login failed" };
  }
}

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    // Check if user already exists
    const existingQuery = `*[_type == "admin" && email == $email][0]`;
    const existing = await client.fetch(existingQuery, { email });

    if (existing) {
      return { success: false, error: "An account with this email already exists" };
    }

    const passwordHash = hashPassword(password);

    // Create the admin document in Sanity
    const newUser = {
      _type: "admin",
      name,
      email,
      passwordHash,
    };

    const createdUser = await writeClient.create(newUser);

    // Encrypt JWT session
    const sessionToken = await encryptSession({
      userId: createdUser._id,
      email: createdUser.email,
      name: createdUser.name,
    });

    // Set secure cookie
    const cookieStore = await cookies();
    cookieStore.set("locallify-session", sessionToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true };
  } catch (error: any) {
    console.error("Signup action error:", error);
    return { success: false, error: error.message || "Signup failed" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("locallify-session");
  redirect("/login");
}

export async function uploadImageAction(formData: FormData) {
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    const file = formData.get("file") as File;
    if (!file) throw new Error("No file uploaded");

    const buffer = Buffer.from(await file.arrayBuffer());
    const asset = await writeClient.assets.upload("image", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    return { success: true, assetId: asset._id };
  } catch (error: any) {
    console.error("Upload image error:", error);
    return { success: false, error: error.message || "Failed to upload image" };
  }
}

export async function toggleReviewAction(reviewId: string, currentStatus: boolean) {
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    await writeClient
      .patch(reviewId)
      .set({ is_published: !currentStatus })
      .commit();

    revalidatePath("/reviews");
    return { success: true };
  } catch (error: any) {
    console.error("Toggle review error:", error);
    return { success: false, error: error.message || "Failed to update review status" };
  }
}

export async function deleteReviewAction(reviewId: string) {
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    await writeClient.delete(reviewId);

    revalidatePath("/reviews");
    return { success: true };
  } catch (error: any) {
    console.error("Delete review error:", error);
    return { success: false, error: error.message || "Failed to delete review" };
  }
}

export async function createProjectAction(data: Partial<Project>) {
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    const cleanData = { ...data };

    const project = await serverProjectService.createProject(cleanData);
    revalidatePath("/projects");
    return { success: true, project };
  } catch (error: any) {
    console.error("Create project error:", error);
    return { success: false, error: error.message || "Failed to create project" };
  }
}

export async function updateProjectAction(projectId: string, data: Partial<Project>) {
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    const cleanData = { ...data };

    const project = await serverProjectService.updateProject(projectId, cleanData);
    revalidatePath("/projects");
    return { success: true, project };
  } catch (error: any) {
    console.error("Update project error:", error);
    return { success: false, error: error.message || "Failed to update project" };
  }
}

export async function deleteProjectAction(projectId: string) {
  try {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Unauthorized");

    await serverProjectService.deleteProject(projectId);
    revalidatePath("/projects");
    return { success: true };
  } catch (error: any) {
    console.error("Delete project error:", error);
    return { success: false, error: error.message || "Failed to delete project" };
  }
}
