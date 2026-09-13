import React from "react";
import DashboardShell from "@/components/DashboardShell";
import { Blog } from "@/lib/types";
import { serverBlogService } from "@/lib/server/services";
import BlogsGrid from "@/components/BlogsGrid";

export default async function BlogsPage() {
    let blogs: Blog[] = [];
    try {
        const data = await serverBlogService.getAllBlogs();
        blogs = data.map((doc: any) => ({
            ...doc,
            $id: doc.$id,
            $createdAt: doc.$createdAt,
            $updatedAt: doc.$updatedAt,
        })) as unknown as Blog[];
    } catch (error) {
        console.error("Failed to load blogs on server:", error);
    }

    return (
        <DashboardShell>
            <BlogsGrid initialBlogs={blogs} />
        </DashboardShell>
    );
}
