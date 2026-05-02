"use server";

import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "./appwrite";
import { redirect } from "next/navigation";
import { serverReviewService } from "./services";
import { revalidatePath } from "next/cache";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("locallify-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const { account } = await createAdminClient();

  try {
    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("locallify-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function logoutAction() {
  const client = await createSessionClient();
  
  if (client) {
    await client.account.deleteSession("current");
  }

  (await cookies()).delete("locallify-session");
  redirect("/login");
}

export async function toggleReviewAction(reviewId: string, currentStatus: boolean) {
  try {
    const session = await createSessionClient();
    if (!session) throw new Error("Unauthorized");

    const { databases } = await createAdminClient();

    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      "reviews",
      reviewId,
      { is_published: !currentStatus }
    );

    revalidatePath("/reviews");
    return { success: true };
  } catch (error) {
    console.error("Toggle review error:", error);
    return { success: false, error: "Failed to update review status" };
  }
}

export async function deleteReviewAction(reviewId: string) {
  try {
    const session = await createSessionClient();
    if (!session) throw new Error("Unauthorized");

    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      "reviews",
      reviewId
    );

    revalidatePath("/reviews");
    return { success: true };
  } catch (error) {
    console.error("Delete review error:", error);
    return { success: false, error: "Failed to delete review" };
  }
}
