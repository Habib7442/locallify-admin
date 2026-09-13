"use client";

import React, { useMemo, useState } from "react";
import { Review } from "@/lib/types";
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
import { toggleReviewAction, deleteReviewAction } from "@/lib/server/actions";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { StatusPill } from "@/components/ui/status-pill";

interface ReviewsGridProps {
    initialReviews: Review[];
}

export default function ReviewsGrid({ initialReviews }: ReviewsGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [tab, setTab] = useState("all");
    const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

    const tabs = [
        { id: "all", label: "All Reviews", count: initialReviews.length },
        { id: "published", label: "Published", count: initialReviews.filter(r => r.is_published).length },
        { id: "pending", label: "Pending", count: initialReviews.filter(r => !r.is_published).length },
    ];

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

    const filteredReviews = useMemo(() => {
        return initialReviews.filter(r => {
            const matchesSearch =
                r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.review.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTab =
                tab === "all" ? true :
                tab === "published" ? r.is_published :
                !r.is_published;
            return matchesSearch && matchesTab;
        });
    }, [initialReviews, searchQuery, tab]);

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Customer Reviews</h1>
                    <p className="text-sm font-medium text-zinc-400 mt-1">Manage testimonials & public feedback</p>
                </div>

                <div className="relative">
                    <HugeiconsIcon icon={Search01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search reviews..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-11 w-full md:w-72 bg-zinc-50 border border-zinc-100 rounded-2xl pl-11 pr-4 font-medium text-sm focus:ring-4 focus:ring-[#0066FF]/10 focus:border-[#0066FF] outline-none transition-all"
                    />
                </div>
            </div>

            <div className="rounded-[32px] bg-white ring-1 ring-zinc-100 p-2">
                <div className="px-6 pt-4">
                    <FilterTabs tabs={tabs} active={tab} onChange={setTab} />
                </div>

                {filteredReviews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50">
                            <HugeiconsIcon icon={Message01Icon} className="text-zinc-300" size={28} />
                        </div>
                        <p className="text-sm font-semibold text-zinc-400">No reviews match this view</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] border-collapse">
                            <thead>
                                <tr className="text-left text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    <th className="px-6 py-3 font-bold">Reviewer</th>
                                    <th className="px-6 py-3 font-bold">Rating</th>
                                    <th className="px-6 py-3 font-bold">Review</th>
                                    <th className="px-6 py-3 font-bold">Status</th>
                                    <th className="px-6 py-3 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReviews.map((item) => (
                                    <tr key={item.$id} className="border-t border-zinc-50 hover:bg-zinc-50/60 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400">
                                                    <HugeiconsIcon icon={UserIcon} size={18} />
                                                </div>
                                                <span className="text-sm font-bold text-zinc-900">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <HugeiconsIcon
                                                        key={i}
                                                        icon={StarIcon}
                                                        size={13}
                                                        className={i < item.rating ? "text-amber-400 fill-amber-400" : "text-zinc-200"}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs">
                                            <p className="text-sm font-medium text-zinc-500 line-clamp-2 italic">"{item.review}"</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusPill
                                                label={item.is_published ? "Published" : "Pending"}
                                                tone={item.is_published ? "success" : "warning"}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleTogglePublish(item.$id, item.is_published)}
                                                    disabled={isActionLoading === item.$id}
                                                    className={cn(
                                                        "flex items-center gap-1.5 px-3 h-9 rounded-xl text-xs font-bold transition-all disabled:opacity-50",
                                                        item.is_published
                                                            ? "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                                            : "bg-emerald-500 text-white hover:bg-emerald-600"
                                                    )}
                                                >
                                                    <HugeiconsIcon icon={item.is_published ? Cancel01Icon : Tick01Icon} size={13} />
                                                    {item.is_published ? "Unpublish" : "Approve"}
                                                </button>
                                                <button
                                                    disabled={isActionLoading === item.$id}
                                                    onClick={() => handleDelete(item.$id)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-xl text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <HugeiconsIcon icon={Delete02Icon} size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
