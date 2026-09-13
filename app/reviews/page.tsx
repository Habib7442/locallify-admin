import React from "react";
import DashboardShell from "@/components/DashboardShell";
import { Review } from "@/lib/types";
import { serverReviewService } from "@/lib/server/services";
import ReviewsGrid from "@/components/ReviewsGrid";

export default async function ReviewsPage() {
    let reviews: Review[] = [];
    try {
        const data = await serverReviewService.getAllReviews();
        // Convert Sanity documents to our Review type
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
        <DashboardShell>
            <ReviewsGrid initialReviews={reviews} />
        </DashboardShell>
    );
}
