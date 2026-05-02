"use client";

import React, { useState } from "react";
import { Review } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    StarIcon,
    Cancel01Icon,
    Delete02Icon,
    Message01Icon,
    UserIcon,
    Tick01Icon,
    Search01Icon
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toggleReviewAction, deleteReviewAction } from "@/lib/server/actions";

interface ReviewsGridProps {
    initialReviews: Review[];
}

export default function ReviewsGrid({ initialReviews }: ReviewsGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

    const handleTogglePublish = async (id: string, currentStatus: boolean) => {
        setIsActionLoading(id);
        try {
            const result = await toggleReviewAction(id, currentStatus);
            if (result.success) {
                toast.success(currentStatus ? "Review unpublished" : "Review published!");
            } else {
                toast.error(result.error || "Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsActionLoading(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Permanently delete this review?")) return;
        setIsActionLoading(id);
        try {
            const result = await deleteReviewAction(id);
            if (result.success) {
                toast.success("Review deleted");
            } else {
                toast.error(result.error || "Failed to delete review");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsActionLoading(null);
        }
    };

    const filteredReviews = initialReviews.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.review.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 tracking-tight italic uppercase">Customer <span className="text-[#0066FF]">Reviews</span></h1>
                    <p className="text-zinc-500 font-bold mt-1 uppercase text-xs tracking-widest">
                        Manage testimonials & public feedback
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <HugeiconsIcon icon={Search01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                            type="text"
                            placeholder="Search reviews..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 w-full md:w-80 bg-white border border-zinc-200 rounded-2xl pl-12 pr-4 font-bold text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {filteredReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredReviews.map((item) => (
                            <motion.div
                                key={item.$id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[32px] overflow-hidden group bg-white border-b-4 border-transparent hover:border-[#0066FF]">
                                    <CardContent className="p-8">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400 font-black">
                                                    <HugeiconsIcon icon={UserIcon} size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-zinc-900 leading-tight">{item.name}</h3>
                                                    <div className="flex gap-0.5 mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <HugeiconsIcon 
                                                                key={i} 
                                                                icon={StarIcon} 
                                                                size={12} 
                                                                className={i < item.rating ? "text-orange-400 fill-orange-400" : "text-zinc-200"} 
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge className={cn(
                                                "font-black uppercase text-[10px] tracking-wider px-3 py-1 rounded-full",
                                                item.is_published ? "bg-emerald-50 text-emerald-600" : "bg-zinc-100 text-zinc-500"
                                            )}>
                                                {item.is_published ? "Published" : "Pending"}
                                            </Badge>
                                        </div>

                                        <div className="relative mb-8">
                                            <HugeiconsIcon icon={Message01Icon} className="absolute -top-2 -left-2 text-zinc-50 opacity-50 scale-150" size={40} />
                                            <p className="text-zinc-600 text-sm font-medium italic relative z-10 leading-relaxed">
                                                "{item.review}"
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 pt-6 border-t border-zinc-50">
                                            <Button 
                                                onClick={() => handleTogglePublish(item.$id, item.is_published)}
                                                disabled={isActionLoading === item.$id}
                                                className={cn(
                                                    "flex-1 font-black text-[10px] uppercase tracking-widest h-10 rounded-xl transition-all",
                                                    item.is_published 
                                                        ? "bg-zinc-100 text-zinc-600 hover:bg-zinc-200" 
                                                        : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
                                                )}
                                            >
                                                <HugeiconsIcon icon={item.is_published ? Cancel01Icon : Tick01Icon} size={16} className="mr-2" />
                                                {item.is_published ? "Unpublish" : "Approve"}
                                            </Button>
                                            <Button 
                                                variant="secondary"
                                                disabled={isActionLoading === item.$id}
                                                onClick={() => handleDelete(item.$id)}
                                                className="w-10 h-10 p-0 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl border-none transition-all"
                                            >
                                                <HugeiconsIcon icon={Delete02Icon} size={18} />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[50vh] bg-white rounded-[40px] border-2 border-dashed border-zinc-100 p-12 text-center">
                    <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                        <HugeiconsIcon icon={Message01Icon} size={40} className="text-zinc-300" />
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 mb-2">No reviews found</h3>
                    <p className="text-zinc-500 font-bold max-w-sm">
                        Waiting for your customers to share their experience.
                    </p>
                </div>
            )}
        </>
    );
}
