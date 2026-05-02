import React from "react";
import Sidebar from "@/components/Sidebar";
import { Review } from "@/lib/types";
import { serverReviewService } from "@/lib/server/services";
import ReviewsGrid from "@/components/ReviewsGrid";

export default async function ReviewsPage() {
    let reviews: Review[] = [];
    try {
        const data = await serverReviewService.getAllReviews();
        // Convert node-appwrite documents to our Review type
        reviews = data.map((doc: any) => ({
            ...doc,
            $id: doc.$id,
            $createdAt: doc.$createdAt,
            $updatedAt: doc.$updatedAt,
        }));
    } catch (error) {
        console.error("Failed to fetch reviews on server:", error);
    }

    return (
        <div className="flex min-h-screen bg-zinc-50">
            <Sidebar />
            
            <main className="flex-1 overflow-y-auto px-8 py-10">
                <ReviewsGrid initialReviews={reviews} />
            </main>
        </div>
    );
}
