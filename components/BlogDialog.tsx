"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Blog } from "@/lib/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Tick01Icon,
    Loading01Icon,
    ImageAdd01Icon,
    Link01Icon,
    Clock01Icon,
    SparklesIcon,
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { createBlogAction, updateBlogAction, uploadImageAction } from "@/lib/server/actions";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";

interface BlogDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    blog?: Blog | null;
}

type TabType = "basic" | "content" | "seo";

const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const estimateReadingTime = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
};

const defaultValues: Partial<Blog> = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "default",
    author: "",
    authorImage: "",
    category: "",
    tags: [],
    status: "draft",
    featured: false,
    readingTime: 1,
    publishedAt: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    canonicalUrl: "",
    robotsRule: "index, follow",
    ogImage: "",
};

export default function BlogDialog({ open, onOpenChange, blog }: BlogDialogProps) {
    const [activeTab, setActiveTab] = useState<TabType>("basic");
    const [isUploading, setIsUploading] = useState(false);
    const [slugTouched, setSlugTouched] = useState(false);

    const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
    const [authorPreviewUrl, setAuthorPreviewUrl] = useState<string | null>(null);
    const [ogPreviewUrl, setOgPreviewUrl] = useState<string | null>(null);

    const { register, handleSubmit, reset, setValue, watch, formState: { isSubmitting, errors } } = useForm<Partial<Blog>>({
        defaultValues,
    });

    const fieldMeta: Record<string, { tab: TabType; label: string }> = {
        title: { tab: "basic", label: "Post Title" },
        excerpt: { tab: "basic", label: "Excerpt / Summary" },
        author: { tab: "basic", label: "Author Name" },
        content: { tab: "content", label: "Blog Content" },
    };

    const onInvalid = (formErrors: typeof errors) => {
        const firstErrorField = Object.keys(formErrors)[0];
        const meta = fieldMeta[firstErrorField];
        if (meta) {
            setActiveTab(meta.tab);
            toast.error(`"${meta.label}" is required before you can save.`);
        } else {
            toast.error("Please fill in all required fields.");
        }
    };

    const resolvePreview = (fieldVal: any, setter: (url: string | null) => void) => {
        if (fieldVal && fieldVal !== "default" && fieldVal !== "") {
            setter(urlFor(fieldVal));
        } else {
            setter(null);
        }
    };

    useEffect(() => {
        if (blog) {
            reset({
                title: blog.title || "",
                slug: blog.slug || "",
                excerpt: blog.excerpt || "",
                content: blog.content || "",
                coverImage: blog.coverImage || "default",
                author: blog.author || "",
                authorImage: blog.authorImage || "",
                category: blog.category || "",
                tags: blog.tags || [],
                status: blog.status || "draft",
                featured: blog.featured || false,
                readingTime: blog.readingTime || 1,
                publishedAt: blog.publishedAt ? blog.publishedAt.slice(0, 10) : "",
                metaTitle: blog.metaTitle || "",
                metaDescription: blog.metaDescription || "",
                metaKeywords: blog.metaKeywords || [],
                canonicalUrl: blog.canonicalUrl || "",
                robotsRule: blog.robotsRule || "index, follow",
                ogImage: blog.ogImage || "",
            });
            resolvePreview(blog.coverImage, setCoverPreviewUrl);
            resolvePreview(blog.authorImage, setAuthorPreviewUrl);
            resolvePreview(blog.ogImage, setOgPreviewUrl);
            setSlugTouched(true);
        } else {
            reset(defaultValues);
            setCoverPreviewUrl(null);
            setAuthorPreviewUrl(null);
            setOgPreviewUrl(null);
            setSlugTouched(false);
        }
        setActiveTab("basic");
    }, [blog, reset, open]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof Blog, previewSetter: (url: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const localUrl = URL.createObjectURL(file);
        previewSetter(localUrl);

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const result = await uploadImageAction(formData);
            if (!result.success || !result.assetId) {
                throw new Error(result.error || "Upload failed");
            }
            setValue(fieldName as any, result.assetId);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image");
            previewSetter("");
        } finally {
            setIsUploading(false);
        }
    };

    const titleValue = watch("title") || "";
    const slugValue = watch("slug") || "";
    const contentValue = watch("content") || "";
    const metaTitleValue = watch("metaTitle") || "";
    const metaDescValue = watch("metaDescription") || "";
    const wordCount = useMemo(() => contentValue.trim().split(/\s+/).filter(Boolean).length, [contentValue]);

    useEffect(() => {
        if (!slugTouched) {
            setValue("slug", slugify(titleValue));
        }
    }, [titleValue, slugTouched, setValue]);

    useEffect(() => {
        setValue("readingTime", estimateReadingTime(contentValue));
    }, [contentValue, setValue]);

    const onSubmit = async (data: Partial<Blog>) => {
        try {
            const parseCommaSeparated = (val: any): string[] => {
                if (typeof val === "string") {
                    return val.split(",").map(item => item.trim()).filter(Boolean);
                }
                return val || [];
            };

            const payload: Partial<Blog> = {
                ...data,
                slug: slugify(data.slug || ""),
                tags: parseCommaSeparated(data.tags),
                metaKeywords: parseCommaSeparated(data.metaKeywords),
                metaTitle: data.metaTitle || data.title,
                metaDescription: data.metaDescription || data.excerpt,
                publishedAt: data.status === "published" && !data.publishedAt
                    ? new Date().toISOString()
                    : data.publishedAt,
            };

            const result = blog
                ? await updateBlogAction(blog.$id, payload)
                : await createBlogAction(payload);

            if (result.success) {
                toast.success(blog ? "Blog updated successfully" : "Blog published to drafts");
                onOpenChange(false);
                reset();
            } else {
                toast.error(result.error || "Something went wrong");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[750px] bg-white rounded-[40px] border-none shadow-2xl p-0 overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    {/* Header */}
                    <div className="p-8 pb-4 border-b border-zinc-100 bg-zinc-50/50">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black text-zinc-900 tracking-tight uppercase italic flex items-center justify-between">
                                <span>{blog ? "Edit" : "New"} <span className="text-[#0066FF]">Blog Post</span></span>
                                {blog && (
                                    <span className="text-[10px] bg-blue-100 text-blue-600 px-3 py-1 rounded-full normal-case font-bold tracking-normal italic">
                                        ID: {blog.$id.slice(0, 8)}...
                                    </span>
                                )}
                            </DialogTitle>
                            <DialogDescription className="font-bold text-zinc-400 uppercase text-[10px] tracking-widest mt-2">
                                Write content, add images, and optimize for search engines.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex border-b border-zinc-100 bg-zinc-50/30 px-8 gap-5 overflow-x-auto scrollbar-none">
                        {[
                            { id: "basic", label: "Basic Info", hasError: !!(errors.title || errors.excerpt || errors.author) },
                            { id: "content", label: "Content & Media", hasError: !!errors.content },
                            { id: "seo", label: "SEO & Discovery", hasError: false },
                        ].map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setActiveTab(t.id as TabType)}
                                className={cn(
                                    "pb-3 pt-3 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all duration-300 relative outline-none whitespace-nowrap flex items-center gap-1.5",
                                    activeTab === t.id
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-zinc-400 hover:text-zinc-950"
                                )}
                            >
                                {t.label}
                                {t.hasError && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                            </button>
                        ))}
                    </div>

                    {/* Form Scroll Container */}
                    <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-thin">

                        {/* TAB 1: BASIC INFO */}
                        <div className={cn("space-y-6", activeTab !== "basic" && "hidden")}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Post Title *</Label>
                                    <Input {...register("title", { required: true })} placeholder="e.g. 7 Local SEO Tips for 2026" className={cn("h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold", errors.title && "border-red-300 ring-2 ring-red-100")} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">URL Slug</Label>
                                    <Input
                                        {...register("slug")}
                                        onChange={(e) => {
                                            setSlugTouched(true);
                                            setValue("slug", e.target.value);
                                        }}
                                        placeholder="7-local-seo-tips-2026"
                                        className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Author Name *</Label>
                                    <Input {...register("author", { required: true })} placeholder="e.g. Habib Tanwir" className={cn("h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold", errors.author && "border-red-300 ring-2 ring-red-100")} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Category</Label>
                                    <Input {...register("category")} placeholder="e.g. Local SEO, Web Design" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Tags (Comma-separated)</Label>
                                    <Input placeholder="e.g. SEO, Marketing, Local Search" defaultValue={watch("tags")?.join(", ")} onChange={(e) => setValue("tags", e.target.value.split(",").map(t => t.trim()))} className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Publish Status</Label>
                                    <Select onValueChange={(val) => setValue("status", val as any)} defaultValue={watch("status") || "draft"}>
                                        <SelectTrigger className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem value="draft" className="font-bold">Draft</SelectItem>
                                            <SelectItem value="published" className="font-bold">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Publish Date</Label>
                                    <Input {...register("publishedAt")} type="date" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100 mt-auto">
                                    <div className="space-y-0.5">
                                        <Label className="text-xs font-black text-zinc-900">Featured Post</Label>
                                        <p className="text-[9px] text-zinc-500 font-bold">Highlight on blog homepage</p>
                                    </div>
                                    <Switch checked={watch("featured") || false} onCheckedChange={(val) => setValue("featured", val)} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Excerpt / Summary *</Label>
                                <Textarea {...register("excerpt", { required: true })} placeholder="A short, compelling summary shown on cards and search results..." className={cn("h-24 bg-zinc-50 border-zinc-100 rounded-xl font-bold resize-none p-3", errors.excerpt && "border-red-300 ring-2 ring-red-100")} />
                            </div>

                            {/* Author photo */}
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Author Photo</Label>
                                <div onClick={() => document.getElementById('author-media-upload')?.click()} className="group relative w-20 h-20 bg-zinc-50 border-2 border-dashed border-zinc-100 rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer">
                                    {authorPreviewUrl ? (
                                        <img src={authorPreviewUrl} alt="Author" className="w-full h-full object-cover" />
                                    ) : (
                                        <HugeiconsIcon icon={ImageAdd01Icon} size={18} className="text-zinc-400" />
                                    )}
                                    <input id="author-media-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "authorImage", setAuthorPreviewUrl)} />
                                </div>
                            </div>
                        </div>

                        {/* TAB 2: CONTENT & MEDIA */}
                        <div className={cn("space-y-6", activeTab !== "content" && "hidden")}>
                            {/* Cover Image */}
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Cover Image</Label>
                                <div onClick={() => document.getElementById('cover-media-upload')?.click()} className="group relative w-full h-48 bg-zinc-50 border-2 border-dashed border-zinc-100 rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer">
                                    {coverPreviewUrl ? (
                                        <img src={coverPreviewUrl} alt="Cover" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-zinc-400">
                                            <HugeiconsIcon icon={ImageAdd01Icon} size={24} />
                                            <p className="text-[10px] font-black uppercase tracking-widest">Upload Cover Image</p>
                                            <p className="text-[9px] font-bold text-zinc-300">Recommended: 1200x630</p>
                                        </div>
                                    )}
                                    <input id="cover-media-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "coverImage", setCoverPreviewUrl)} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Blog Content (Markdown supported) *</Label>
                                    <div className="flex items-center gap-3 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                                        <span>{wordCount} words</span>
                                        <span className="flex items-center gap-1">
                                            <HugeiconsIcon icon={Clock01Icon} size={12} />
                                            {watch("readingTime") || 1} min read
                                        </span>
                                    </div>
                                </div>
                                <Textarea
                                    {...register("content", { required: true })}
                                    placeholder={"Write your blog post here. Markdown is supported:\n\n## Heading\n\n- Bullet point\n\n**bold text**"}
                                    className={cn("min-h-[320px] bg-zinc-50 border-zinc-100 rounded-xl font-medium p-4 leading-relaxed", errors.content && "border-red-300 ring-2 ring-red-100")}
                                />
                                {errors.content && (
                                    <p className="text-[10px] font-bold text-red-500 ml-1">Blog content can't be empty.</p>
                                )}
                            </div>
                        </div>

                        {/* TAB 3: SEO & DISCOVERABILITY */}
                        <div className={cn("space-y-6", activeTab !== "seo" && "hidden")}>
                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-zinc-900 uppercase tracking-wider">Search Engine Metadata</h4>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Meta Title</Label>
                                    <Input {...register("metaTitle")} placeholder="Defaults to post title if left blank" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Meta Description</Label>
                                    <Textarea {...register("metaDescription")} placeholder="Defaults to excerpt if left blank. Aim for 150-160 characters." className="h-20 bg-zinc-50 border-zinc-100 rounded-xl font-bold resize-none p-3" />
                                </div>

                                {/* Live SERP preview */}
                                <div className="p-4 bg-white border border-zinc-100 rounded-2xl">
                                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2">Search Result Preview</p>
                                    <p className="text-[#1a0dab] text-lg leading-tight truncate">{metaTitleValue || titleValue || "Your Blog Post Title"}</p>
                                    <p className="text-[#006621] text-xs">locallify.com/blog/{slugValue || "your-post-slug"}</p>
                                    <p className="text-zinc-600 text-sm mt-1 line-clamp-2">{metaDescValue || watch("excerpt") || "Your meta description will appear here."}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Keywords (Comma-separated)</Label>
                                        <Input placeholder="e.g. local seo, google maps ranking" defaultValue={watch("metaKeywords")?.join(", ")} onChange={(e) => setValue("metaKeywords", e.target.value.split(",").map(k => k.trim()))} className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Robots Meta Rule</Label>
                                        <Input {...register("robotsRule")} placeholder="index, follow" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Canonical URL</Label>
                                    <div className="relative group">
                                        <HugeiconsIcon icon={Link01Icon} size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                        <Input {...register("canonicalUrl")} placeholder="https://locallify.com/blog/your-post-slug" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl pl-12 font-bold" />
                                    </div>
                                </div>
                            </div>

                            {/* Open Graph Image */}
                            <div className="border-t border-zinc-100 pt-6 space-y-2">
                                <div className="flex items-center gap-2">
                                    <HugeiconsIcon icon={SparklesIcon} size={14} className="text-blue-500" />
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Social Share Image (Open Graph)</Label>
                                </div>
                                <div onClick={() => document.getElementById('og-media-upload')?.click()} className="group relative w-full h-32 bg-zinc-50 border-2 border-dashed border-zinc-100 rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer">
                                    {ogPreviewUrl ? (
                                        <img src={ogPreviewUrl} alt="Open Graph" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-1 text-zinc-400">
                                            <HugeiconsIcon icon={ImageAdd01Icon} size={18} />
                                            <p className="text-[9px] font-black uppercase tracking-widest">Falls back to cover image</p>
                                        </div>
                                    )}
                                    <input id="og-media-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "ogImage", setOgPreviewUrl)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-8 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-end gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-all outline-none"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || isUploading}
                            className="h-12 px-8 bg-[#0066FF] hover:bg-[#0052CC] text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/10 transition-all active:scale-95 flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <HugeiconsIcon icon={Loading01Icon} className="animate-spin" size={16} />
                            ) : (
                                <>
                                    <HugeiconsIcon icon={Tick01Icon} size={16} />
                                    {blog ? "Save Changes" : "Create Blog Post"}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
