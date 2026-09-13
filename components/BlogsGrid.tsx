"use client";

import React, { useMemo, useState } from "react";
import { Blog } from "@/lib/types";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Calendar01Icon,
    Clock01Icon,
    Add01Icon,
    Search01Icon,
    Delete02Icon,
    Book01Icon,
    Tick01Icon,
    Cancel01Icon,
    StarIcon,
    PencilEdit02Icon,
} from "@hugeicons/core-free-icons";
import BlogDialog from "./BlogDialog";
import { deleteBlogAction, toggleBlogStatusAction } from "@/lib/server/actions";
import { toast } from "sonner";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { StatusPill } from "@/components/ui/status-pill";

interface BlogsGridProps {
    initialBlogs: Blog[];
}

export default function BlogsGrid({ initialBlogs }: BlogsGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [tab, setTab] = useState("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isToggling, setIsToggling] = useState<string | null>(null);

    const tabs = [
        { id: "all", label: "All Posts", count: initialBlogs.length },
        { id: "published", label: "Published", count: initialBlogs.filter(b => b.status === "published").length },
        { id: "draft", label: "Draft", count: initialBlogs.filter(b => b.status === "draft").length },
        { id: "featured", label: "Featured", count: initialBlogs.filter(b => b.featured).length },
    ];

    const filteredBlogs = useMemo(() => {
        return initialBlogs.filter(b => {
            const matchesSearch =
                b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTab =
                tab === "all" ? true :
                tab === "featured" ? !!b.featured :
                b.status === tab;

            return matchesSearch && matchesTab;
        });
    }, [initialBlogs, searchQuery, tab]);

    const handleEdit = (blog: Blog) => {
        setSelectedBlog(blog);
        setIsDialogOpen(true);
    };

    const handleAdd = () => {
        setSelectedBlog(null);
        setIsDialogOpen(true);
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this blog post?")) return;

        setIsDeleting(id);
        try {
            const result = await deleteBlogAction(id);
            if (result.success) {
                toast.success("Blog post deleted successfully");
            } else {
                toast.error(result.error || "Failed to delete blog post");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsDeleting(null);
        }
    };

    const handleToggleStatus = async (e: React.MouseEvent, id: string, currentStatus: "draft" | "published") => {
        e.stopPropagation();
        setIsToggling(id);
        try {
            const result = await toggleBlogStatusAction(id, currentStatus);
            if (result.success) {
                toast.success(currentStatus === "published" ? "Moved to drafts" : "Published!");
            } else {
                toast.error(result.error || "Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsToggling(null);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Blog Posts</h1>
                    <p className="text-sm font-medium text-zinc-400 mt-1">SEO-optimized content for your website</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <HugeiconsIcon icon={Search01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search posts, tags, category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-11 w-full md:w-72 bg-zinc-50 border border-zinc-100 rounded-2xl pl-11 pr-4 font-medium text-sm focus:ring-4 focus:ring-[#0066FF]/10 focus:border-[#0066FF] outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={handleAdd}
                        className="h-11 px-5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-2xl text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2 shrink-0"
                    >
                        <HugeiconsIcon icon={Add01Icon} size={17} />
                        New Blog Post
                    </button>
                </div>
            </div>

            <div className="rounded-[32px] bg-white ring-1 ring-zinc-100 p-2">
                <div className="px-6 pt-4">
                    <FilterTabs tabs={tabs} active={tab} onChange={setTab} />
                </div>

                {filteredBlogs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50">
                            <HugeiconsIcon icon={Book01Icon} className="text-zinc-300" size={28} />
                        </div>
                        <p className="text-sm font-semibold text-zinc-400 mb-6">No blog posts match this view</p>
                        {tab === "all" && (
                            <button
                                onClick={handleAdd}
                                className="h-11 px-6 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-2xl text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2"
                            >
                                <HugeiconsIcon icon={Add01Icon} size={16} />
                                Write Your First Post
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[840px] border-collapse">
                            <thead>
                                <tr className="text-left text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    <th className="px-6 py-3 font-bold">Post</th>
                                    <th className="px-6 py-3 font-bold">Author</th>
                                    <th className="px-6 py-3 font-bold">Created</th>
                                    <th className="px-6 py-3 font-bold">Read time</th>
                                    <th className="px-6 py-3 font-bold">Status</th>
                                    <th className="px-6 py-3 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBlogs.map((blog) => (
                                    <tr
                                        key={blog.$id}
                                        onClick={() => handleEdit(blog)}
                                        className="border-t border-zinc-50 hover:bg-zinc-50/60 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-300">
                                                    {blog.coverImage && blog.coverImage !== "default" ? (
                                                        <img src={urlFor(blog.coverImage)} alt={blog.title} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <HugeiconsIcon icon={Book01Icon} size={17} />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-1.5">
                                                        <p className="text-sm font-bold text-zinc-900 truncate max-w-[220px]">{blog.title}</p>
                                                        {blog.featured && <HugeiconsIcon icon={StarIcon} size={12} className="text-amber-400 shrink-0" />}
                                                    </div>
                                                    <p className="text-xs font-medium text-zinc-400 truncate max-w-[220px]">{blog.category || "Uncategorized"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-zinc-500">{blog.author || "Unknown"}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-zinc-500">
                                            <div className="flex items-center gap-1.5">
                                                <HugeiconsIcon icon={Calendar01Icon} size={12} />
                                                <span suppressHydrationWarning>{new Date(blog.$createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-zinc-500">
                                            <div className="flex items-center gap-1.5">
                                                <HugeiconsIcon icon={Clock01Icon} size={12} />
                                                {blog.readingTime || 1} min
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusPill
                                                label={blog.status === "published" ? "Published" : "Draft"}
                                                tone={blog.status === "published" ? "success" : "neutral"}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    disabled={isToggling === blog.$id}
                                                    onClick={(e) => handleToggleStatus(e, blog.$id, blog.status)}
                                                    className={cn(
                                                        "flex items-center gap-1.5 px-3 h-9 rounded-xl text-xs font-bold transition-all disabled:opacity-50",
                                                        blog.status === "published"
                                                            ? "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                                            : "bg-emerald-500 text-white hover:bg-emerald-600"
                                                    )}
                                                >
                                                    <HugeiconsIcon icon={blog.status === "published" ? Cancel01Icon : Tick01Icon} size={13} />
                                                    {blog.status === "published" ? "Unpublish" : "Publish"}
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleEdit(blog); }}
                                                    className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                                                    title="Edit"
                                                >
                                                    <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
                                                </button>
                                                <button
                                                    disabled={isDeleting === blog.$id}
                                                    onClick={(e) => handleDelete(e, blog.$id)}
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

            <BlogDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                blog={selectedBlog}
            />
        </>
    );
}
