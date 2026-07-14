"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Project, Challenge, KeyFeature, FAQItem, ProjectResult } from "@/lib/types";
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
    WorkHistoryIcon, 
    GlobalIcon, 
    Link01Icon,
    Tick01Icon,
    Loading01Icon,
    ImageAdd01Icon,
    DashboardCircleIcon,
    BrowserIcon,
    PlusSignIcon,
    Delete02Icon,
    UserIcon,
    Settings02Icon
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { createProjectAction, updateProjectAction, uploadImageAction } from "@/lib/server/actions";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";

interface ProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project?: Project | null;
}

type TabType = "basic" | "case" | "media" | "seo" | "perf" | "settings";

export default function ProjectDialog({ open, onOpenChange, project }: ProjectDialogProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>("basic");

    // Preview URL states for all upload slots
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
    const [heroPreviewUrl, setHeroPreviewUrl] = useState<string | null>(null);
    const [desktopPreviewUrl, setDesktopPreviewUrl] = useState<string | null>(null);
    const [mobilePreviewUrl, setMobileScreenshotPreview] = useState<string | null>(null);
    const [scPerformancePreviewUrl, setScPerformancePreviewUrl] = useState<string | null>(null);
    const [scCoveragePreviewUrl, setScCoveragePreviewUrl] = useState<string | null>(null);
    const [scIndexingPreviewUrl, setScIndexingPreviewUrl] = useState<string | null>(null);
    const [scWebVitalsPreviewUrl, setScWebVitalsPreviewUrl] = useState<string | null>(null);
    const [testimonialPhotoPreviewUrl, setTestimonialPhotoPreviewUrl] = useState<string | null>(null);

    // List Editor temporary states
    const [newGoal, setNewGoal] = useState("");
    const [newFeatureTitle, setNewFeatureTitle] = useState("");
    const [newFeatureDesc, setNewFeatureDesc] = useState("");
    const [newResultTitle, setNewResultTitle] = useState("");
    const [newResultDesc, setNewResultDesc] = useState("");
    const [newFaqQuestion, setNewFaqQuestion] = useState("");
    const [newFaqAnswer, setNewFaqAnswer] = useState("");

    const { register, handleSubmit, reset, setValue, watch, formState: { isSubmitting } } = useForm<Partial<Project>>({
        defaultValues: {
            title: "",
            description: "",
            status: "ongoing",
            live_url: "",
            tags: [],
            is_public: true,
            thumbnail: "default",
            slug: "",
            shortDescription: "",
            clientName: "",
            clientLocation: "",
            clientWebsite: "",
            industry: "",
            category: "",
            duration: "",
            myRole: "",
            teamSize: 1,
            completionDate: "",
            displayOrder: 0,
            clientLogo: "",
            heroBannerImage: "",
            featured: false,
            heroTitle: "",
            heroSubtitle: "",
            overview: "",
            problemSummary: "",
            goals: [],
            challenges: [],
            solution: "",
            technologies: [],
            keyFeatures: [],
            gallery: [],
            lighthouseDesktop: { performance: 90, accessibility: 90, bestPractices: 90, seo: 90, screenshot: "" },
            lighthouseMobile: { performance: 90, accessibility: 90, bestPractices: 90, seo: 90, screenshot: "" },
            enableLocalSeo: false,
            enableAiOptimization: false,
            scClicks: 0,
            scImpressions: 0,
            scCtr: 0,
            scPosition: 0,
            scIndexedPages: 0,
            scPerformanceScreenshot: "",
            scCoverageScreenshot: "",
            scIndexingScreenshot: "",
            scCoreWebVitalsScreenshot: "",
            metaTitle: "",
            metaDescription: "",
            metaKeywords: [],
            robotsRule: "",
            canonicalUrl: "",
            agenticSummary: "",
            agentInstructions: "",
            gbpUrl: "",
            mapsEmbedUrl: "",
            localKeywords: [],
            targetAreas: [],
            napConsistency: "",
            results: [],
            testimonial: { clientName: "", company: "", designation: "", photo: "", rating: 5, testimonial: "" },
            faq: [],
            cta: { title: "", description: "", buttonText: "", buttonLink: "" }
        }
    });

    // Helper to resolve and set image previews
    const resolvePreview = (fieldVal: any, setter: (url: string | null) => void) => {
        if (fieldVal && fieldVal !== "default" && fieldVal !== "") {
            setter(urlFor(fieldVal));
        } else {
            setter(null);
        }
    };

    useEffect(() => {
        if (project) {
            reset({
                title: project.title || "",
                description: project.description || "",
                status: project.status || "ongoing",
                live_url: project.live_url || "",
                tags: project.tags || [],
                is_public: project.is_public !== false,
                thumbnail: project.thumbnail || "default",
                slug: project.slug || "",
                shortDescription: project.shortDescription || "",
                clientName: project.clientName || "",
                clientLocation: project.clientLocation || "",
                clientWebsite: project.clientWebsite || "",
                industry: project.industry || "",
                category: project.category || "",
                duration: project.duration || "",
                myRole: project.myRole || "",
                teamSize: project.teamSize || 1,
                completionDate: project.completionDate || "",
                displayOrder: project.displayOrder || 0,
                clientLogo: project.clientLogo || "",
                heroBannerImage: project.heroBannerImage || "",
                featured: project.featured || false,
                heroTitle: project.heroTitle || "",
                heroSubtitle: project.heroSubtitle || "",
                overview: project.overview || "",
                problemSummary: project.problemSummary || "",
                goals: project.goals || [],
                challenges: project.challenges || [],
                solution: project.solution || "",
                technologies: project.technologies || [],
                keyFeatures: project.keyFeatures || [],
                gallery: project.gallery || [],
                lighthouseDesktop: {
                    performance: project.lighthouseDesktop?.performance ?? 90,
                    accessibility: project.lighthouseDesktop?.accessibility ?? 90,
                    bestPractices: project.lighthouseDesktop?.bestPractices ?? 90,
                    seo: project.lighthouseDesktop?.seo ?? 90,
                    screenshot: project.lighthouseDesktop?.screenshot || ""
                },
                lighthouseMobile: {
                    performance: project.lighthouseMobile?.performance ?? 90,
                    accessibility: project.lighthouseMobile?.accessibility ?? 90,
                    bestPractices: project.lighthouseMobile?.bestPractices ?? 90,
                    seo: project.lighthouseMobile?.seo ?? 90,
                    screenshot: project.lighthouseMobile?.screenshot || ""
                },
                enableLocalSeo: project.enableLocalSeo || false,
                enableAiOptimization: project.enableAiOptimization || false,
                scClicks: project.scClicks || 0,
                scImpressions: project.scImpressions || 0,
                scCtr: project.scCtr || 0,
                scPosition: project.scPosition || 0,
                scIndexedPages: project.scIndexedPages || 0,
                scPerformanceScreenshot: project.scPerformanceScreenshot || "",
                scCoverageScreenshot: project.scCoverageScreenshot || "",
                scIndexingScreenshot: project.scIndexingScreenshot || "",
                scCoreWebVitalsScreenshot: project.scCoreWebVitalsScreenshot || "",
                metaTitle: project.metaTitle || "",
                metaDescription: project.metaDescription || "",
                metaKeywords: project.metaKeywords || [],
                robotsRule: project.robotsRule || "",
                canonicalUrl: project.canonicalUrl || "",
                agenticSummary: project.agenticSummary || "",
                agentInstructions: project.agentInstructions || "",
                gbpUrl: project.gbpUrl || "",
                mapsEmbedUrl: project.mapsEmbedUrl || "",
                localKeywords: project.localKeywords || [],
                targetAreas: project.targetAreas || [],
                napConsistency: project.napConsistency || "",
                results: project.results || [],
                testimonial: {
                    clientName: project.testimonial?.clientName || "",
                    company: project.testimonial?.company || "",
                    designation: project.testimonial?.designation || "",
                    photo: project.testimonial?.photo || "",
                    rating: project.testimonial?.rating ?? 5,
                    testimonial: project.testimonial?.testimonial || ""
                },
                faq: project.faq || [],
                cta: {
                    title: project.cta?.title || "",
                    description: project.cta?.description || "",
                    buttonText: project.cta?.buttonText || "",
                    buttonLink: project.cta?.buttonLink || ""
                }
            });

            // Set previews
            resolvePreview(project.thumbnail, setPreviewUrl);
            resolvePreview(project.clientLogo, setLogoPreviewUrl);
            resolvePreview(project.heroBannerImage, setHeroPreviewUrl);
            resolvePreview(project.lighthouseDesktop?.screenshot, setDesktopPreviewUrl);
            resolvePreview(project.lighthouseMobile?.screenshot, setMobileScreenshotPreview);
            resolvePreview(project.scPerformanceScreenshot, setScPerformancePreviewUrl);
            resolvePreview(project.scCoverageScreenshot, setScCoveragePreviewUrl);
            resolvePreview(project.scIndexingScreenshot, setScIndexingPreviewUrl);
            resolvePreview(project.scCoreWebVitalsScreenshot, setScWebVitalsPreviewUrl);
            resolvePreview(project.testimonial?.photo, setTestimonialPhotoPreviewUrl);
        } else {
            reset({
                title: "",
                description: "",
                status: "ongoing",
                live_url: "",
                tags: [],
                is_public: true,
                thumbnail: "default",
                slug: "",
                shortDescription: "",
                clientName: "",
                clientLocation: "",
                clientWebsite: "",
                industry: "",
                category: "",
                duration: "",
                myRole: "",
                teamSize: 1,
                completionDate: "",
                displayOrder: 0,
                clientLogo: "",
                heroBannerImage: "",
                featured: false,
                heroTitle: "",
                heroSubtitle: "",
                overview: "",
                problemSummary: "",
                goals: [],
                challenges: [],
                solution: "",
                technologies: [],
                keyFeatures: [],
                gallery: [],
                lighthouseDesktop: { performance: 90, accessibility: 90, bestPractices: 90, seo: 90, screenshot: "" },
                lighthouseMobile: { performance: 90, accessibility: 90, bestPractices: 90, seo: 90, screenshot: "" },
                enableLocalSeo: false,
                enableAiOptimization: false,
                scClicks: 0,
                scImpressions: 0,
                scCtr: 0,
                scPosition: 0,
                scIndexedPages: 0,
                scPerformanceScreenshot: "",
                scCoverageScreenshot: "",
                scIndexingScreenshot: "",
                scCoreWebVitalsScreenshot: "",
                metaTitle: "",
                metaDescription: "",
                metaKeywords: [],
                robotsRule: "",
                canonicalUrl: "",
                agenticSummary: "",
                agentInstructions: "",
                gbpUrl: "",
                mapsEmbedUrl: "",
                localKeywords: [],
                targetAreas: [],
                napConsistency: "",
                results: [],
                testimonial: { clientName: "", company: "", designation: "", photo: "", rating: 5, testimonial: "" },
                faq: [],
                cta: { title: "", description: "", buttonText: "", buttonLink: "" }
            });
            setPreviewUrl(null);
            setLogoPreviewUrl(null);
            setHeroPreviewUrl(null);
            setDesktopPreviewUrl(null);
            setMobileScreenshotPreview(null);
            setScPerformancePreviewUrl(null);
            setScCoveragePreviewUrl(null);
            setScIndexingPreviewUrl(null);
            setScWebVitalsPreviewUrl(null);
            setTestimonialPhotoPreviewUrl(null);
        }
        setActiveTab("basic");
    }, [project, reset, open]);

    // General-purpose uploader wrapper
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, previewSetter: (url: string) => void) => {
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

    const onSubmit = async (data: Partial<Project>) => {
        try {
            const parseCommaSeparated = (val: any): string[] => {
                if (typeof val === "string") {
                    return val.split(",").map(item => item.trim()).filter(Boolean);
                }
                return val || [];
            };

            const payload: Partial<Project> = {
                ...data,
                tags: parseCommaSeparated(data.tags),
                technologies: parseCommaSeparated(data.technologies),
                metaKeywords: parseCommaSeparated(data.metaKeywords),
                localKeywords: parseCommaSeparated(data.localKeywords),
                targetAreas: parseCommaSeparated(data.targetAreas),
            };

            const result = project 
                ? await updateProjectAction(project.$id, payload)
                : await createProjectAction(payload);

            if (result.success) {
                toast.success(project ? "Project updated successfully" : "Project created successfully");
                onOpenChange(false);
                reset();
            } else {
                toast.error(result.error || "Something went wrong");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        }
    };

    // Watched list arrays to build simple list builders
    const goalsList = watch("goals") || [];
    const featuresList = watch("keyFeatures") || [];
    const resultsList = watch("results") || [];
    const faqList = watch("faq") || [];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[750px] bg-white rounded-[40px] border-none shadow-2xl p-0 overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Header */}
                    <div className="p-8 pb-4 border-b border-zinc-100 bg-zinc-50/50">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black text-zinc-900 tracking-tight uppercase italic flex items-center justify-between">
                                <span>{project ? "Manage" : "New"} <span className="text-[#0066FF]">Case Study</span></span>
                                {project && (
                                    <span className="text-[10px] bg-blue-100 text-blue-600 px-3 py-1 rounded-full normal-case font-bold tracking-normal italic">
                                        ID: {project.$id.slice(0, 8)}...
                                    </span>
                                )}
                            </DialogTitle>
                            <DialogDescription className="font-bold text-zinc-400 uppercase text-[10px] tracking-widest mt-2">
                                Configure full metadata, local SEO optimization, lighthouse audits, and client reviews.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex border-b border-zinc-100 bg-zinc-50/30 px-8 gap-5 overflow-x-auto scrollbar-none">
                        {[
                            { id: "basic", label: "Basic Info" },
                            { id: "case", label: "Case Study" },
                            { id: "media", label: "Media & Gallery" },
                            { id: "seo", label: "SEO & Discovery" },
                            { id: "perf", label: "Performance" },
                            { id: "settings", label: "Portfolio Config" }
                        ].map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setActiveTab(t.id as TabType)}
                                className={cn(
                                    "pb-3 pt-3 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all duration-300 relative outline-none whitespace-nowrap",
                                    activeTab === t.id 
                                        ? "border-blue-600 text-blue-600" 
                                        : "border-transparent text-zinc-400 hover:text-zinc-950"
                                )}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Form Scroll Container */}
                    <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-thin">
                        
                        {/* TAB 1: BASIC INFO */}
                        <div className={cn("space-y-6", activeTab !== "basic" && "hidden")}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Project Title</Label>
                                        <Input {...register("title", { required: true })} placeholder="e.g. The ENT Clinic" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Slug</Label>
                                        <Input {...register("slug")} placeholder="e.g. ent-clinic-silchar" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Client Name</Label>
                                        <Input {...register("clientName")} placeholder="e.g. Dr. Ray" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Client Location</Label>
                                        <Input {...register("clientLocation")} placeholder="e.g. Silchar, India" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Client Website</Label>
                                        <Input {...register("clientWebsite")} placeholder="https://entclinicsilchar.com" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Industry</Label>
                                        <Input {...register("industry")} placeholder="e.g. Healthcare, Medicine" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Category</Label>
                                        <Input {...register("category")} placeholder="e.g. Local SEO Landing Page" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Duration</Label>
                                        <Input {...register("duration")} placeholder="e.g. 4 Weeks" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Completion Date</Label>
                                        <Input {...register("completionDate")} type="date" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2 col-span-1">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">My Role</Label>
                                        <Input {...register("myRole")} placeholder="e.g. Full Stack Developer" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                    <div className="space-y-2 col-span-1">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Team Size</Label>
                                        <Input {...register("teamSize", { valueAsNumber: true })} type="number" placeholder="1" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                    <div className="space-y-2 col-span-1">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Project Status</Label>
                                        <Select onValueChange={(val) => setValue("status", val as any)} defaultValue={watch("status") || "ongoing"}>
                                            <SelectTrigger className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                <SelectItem value="ongoing" className="font-bold">Ongoing</SelectItem>
                                                <SelectItem value="completed" className="font-bold">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Technologies Used (Comma-separated)</Label>
                                        <Input placeholder="e.g. Next.js, React, Tailwind, Supabase" defaultValue={watch("technologies")?.join(", ")} onChange={(e) => setValue("technologies", e.target.value.split(",").map(t => t.trim()))} className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">General Tags (Comma-separated)</Label>
                                        <Input placeholder="e.g. Web Dev, SEO, Local Search" defaultValue={watch("tags")?.join(", ")} onChange={(e) => setValue("tags", e.target.value.split(",").map(t => t.trim()))} className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Project Live URL</Label>
                                    <div className="relative group">
                                        <HugeiconsIcon icon={Link01Icon} size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                        <Input {...register("live_url")} placeholder="https://entclinicsilchar.com" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl pl-12 font-bold" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Short Description</Label>
                                    <Textarea {...register("description", { required: true })} placeholder="Short summary displayed on cards..." className="h-20 bg-zinc-50 border-zinc-100 rounded-xl font-bold resize-none p-3" />
                                </div>
                        </div>

                        {/* TAB 2: CASE STUDY */}
                        <div className={cn("space-y-6", activeTab !== "case" && "hidden")}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Hero Title</Label>
                                        <Input {...register("heroTitle")} placeholder="e.g. Local authority for ENT specialists" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Hero Subtitle</Label>
                                        <Input {...register("heroSubtitle")} placeholder="e.g. 100 Lighthouse SEO and optimized Maps rankings" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">About / Project Overview</Label>
                                    <Textarea {...register("overview")} placeholder="Describe the project overview and background details..." className="min-h-[100px] bg-zinc-50 border-zinc-100 rounded-xl font-bold p-3" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Client Challenge</Label>
                                    <Textarea {...register("problemSummary")} placeholder="Describe the challenges or problems the client had..." className="min-h-[100px] bg-zinc-50 border-zinc-100 rounded-xl font-bold p-3" />
                                </div>

                                {/* Goals Array List Editor */}
                                <div className="space-y-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                                    <Label className="text-[10px] font-black text-zinc-950 uppercase tracking-widest">Project Goals List</Label>
                                    <div className="flex gap-2">
                                        <Input value={newGoal} onChange={(e) => setNewGoal(e.target.value)} placeholder="Add a specific goal..." className="h-10 bg-white" />
                                        <Button type="button" onClick={() => {
                                            if (newGoal.trim()) {
                                                setValue("goals", [...goalsList, newGoal.trim()]);
                                                setNewGoal("");
                                            }
                                        }} className="bg-zinc-900 text-white font-bold h-10 px-4 rounded-xl flex items-center gap-1 text-[10px] uppercase tracking-widest">
                                            <HugeiconsIcon icon={PlusSignIcon} size={14} /> Add
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {goalsList.map((g, idx) => (
                                            <span key={idx} className="bg-white border border-zinc-200 text-zinc-700 text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-2">
                                                {g}
                                                <button type="button" onClick={() => setValue("goals", goalsList.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 font-bold">×</button>
                                            </span>
                                        ))}
                                        {goalsList.length === 0 && <p className="text-[10px] text-zinc-400 font-bold italic ml-1">No goals added yet.</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">My Solution</Label>
                                    <Textarea {...register("solution")} placeholder="Describe the implementation strategy and results..." className="min-h-[100px] bg-zinc-50 border-zinc-100 rounded-xl font-bold p-3" />
                                </div>

                                {/* Key Features List Editor */}
                                <div className="space-y-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                                    <Label className="text-[10px] font-black text-zinc-950 uppercase tracking-widest">Key Features List</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input value={newFeatureTitle} onChange={(e) => setNewFeatureTitle(e.target.value)} placeholder="Feature Title (e.g. Appointment Booking)" className="h-10 bg-white" />
                                        <Input value={newFeatureDesc} onChange={(e) => setNewFeatureDesc(e.target.value)} placeholder="Feature Description" className="h-10 bg-white" />
                                    </div>
                                    <Button type="button" onClick={() => {
                                        if (newFeatureTitle.trim()) {
                                            setValue("keyFeatures", [...featuresList, { title: newFeatureTitle.trim(), description: newFeatureDesc.trim() }]);
                                            setNewFeatureTitle("");
                                            setNewFeatureDesc("");
                                        }
                                    }} className="bg-zinc-900 text-white font-bold h-10 px-4 rounded-xl flex items-center gap-1 text-[10px] uppercase tracking-widest">
                                        <HugeiconsIcon icon={PlusSignIcon} size={14} /> Add Feature
                                    </Button>
                                    <div className="space-y-2">
                                        {featuresList.map((f, idx) => (
                                            <div key={idx} className="bg-white border border-zinc-100 p-4 rounded-xl flex justify-between items-start">
                                                <div>
                                                    <h5 className="text-xs font-black text-zinc-900">{f.title}</h5>
                                                    <p className="text-[10px] text-zinc-500 font-bold mt-1">{f.description}</p>
                                                </div>
                                                <Button type="button" variant="ghost" onClick={() => setValue("keyFeatures", featuresList.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 h-8 w-8 p-0"><HugeiconsIcon icon={Delete02Icon} size={16} /></Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Results badges */}
                                <div className="space-y-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                                    <Label className="text-[10px] font-black text-zinc-950 uppercase tracking-widest">Client Results List</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input value={newResultTitle} onChange={(e) => setNewResultTitle(e.target.value)} placeholder="Result Title (e.g. 100 SEO)" className="h-10 bg-white" />
                                        <Input value={newResultDesc} onChange={(e) => setNewResultDesc(e.target.value)} placeholder="Result Description (e.g. Lighthouse score)" className="h-10 bg-white" />
                                    </div>
                                    <Button type="button" onClick={() => {
                                        if (newResultTitle.trim()) {
                                            setValue("results", [...resultsList, { title: newResultTitle.trim(), description: newResultDesc.trim() }]);
                                            setNewResultTitle("");
                                            setNewResultDesc("");
                                        }
                                    }} className="bg-zinc-900 text-white font-bold h-10 px-4 rounded-xl flex items-center gap-1 text-[10px] uppercase tracking-widest">
                                        <HugeiconsIcon icon={PlusSignIcon} size={14} /> Add Result
                                    </Button>
                                    <div className="flex flex-wrap gap-2">
                                        {resultsList.map((r, idx) => (
                                            <span key={idx} className="bg-white border border-zinc-200 text-zinc-700 text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-2">
                                                <strong>{r.title}</strong>: {r.description}
                                                <button type="button" onClick={() => setValue("results", resultsList.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 font-bold">×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                        </div>

                        {/* TAB 3: MEDIA & GALLERY */}
                        <div className={cn("space-y-6", activeTab !== "media" && "hidden")}>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Cover Thumbnail */}
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Cover Image</Label>
                                        <div onClick={() => document.getElementById('cover-media-upload')?.click()} className="group relative w-full h-32 bg-zinc-50 border-2 border-dashed border-zinc-100 rounded-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer">
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Cover" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center gap-1 text-zinc-400"><HugeiconsIcon icon={ImageAdd01Icon} size={18} /><p className="text-[9px] font-black uppercase tracking-widest">Cover Image</p></div>
                                            )}
                                            <input id="cover-media-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "thumbnail", setPreviewUrl)} />
                                        </div>
                                    </div>

                                    {/* Client Logo */}
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Client Logo</Label>
                                        <div onClick={() => document.getElementById('logo-media-upload')?.click()} className="group relative w-full h-32 bg-zinc-50 border-2 border-dashed border-zinc-100 rounded-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer">
                                            {logoPreviewUrl ? (
                                                <img src={logoPreviewUrl} alt="Logo" className="w-full h-full object-contain p-4" />
                                            ) : (
                                                <div className="flex flex-col items-center gap-1 text-zinc-400"><HugeiconsIcon icon={ImageAdd01Icon} size={18} /><p className="text-[9px] font-black uppercase tracking-widest">Client Logo</p></div>
                                            )}
                                            <input id="logo-media-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "clientLogo", setLogoPreviewUrl)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Hero Banner Image */}
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Hero Banner Image</Label>
                                        <div onClick={() => document.getElementById('hero-media-upload')?.click()} className="group relative w-full h-32 bg-zinc-50 border-2 border-dashed border-zinc-100 rounded-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer">
                                            {heroPreviewUrl ? (
                                                <img src={heroPreviewUrl} alt="Hero Banner" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center gap-1 text-zinc-400"><HugeiconsIcon icon={ImageAdd01Icon} size={18} /><p className="text-[9px] font-black uppercase tracking-widest">Hero Banner</p></div>
                                            )}
                                            <input id="hero-media-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "heroBannerImage", setHeroPreviewUrl)} />
                                        </div>
                                    </div>

                                    {/* Desktop & Mobile Previews */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1">
                                            <Label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Desktop Screenshot</Label>
                                            <div onClick={() => document.getElementById('desktop-media-upload')?.click()} className="relative w-full h-24 bg-zinc-50 border border-dashed rounded-lg overflow-hidden flex items-center justify-center cursor-pointer text-zinc-400">
                                                {desktopPreviewUrl ? <img src={desktopPreviewUrl} className="w-full h-full object-cover" /> : <HugeiconsIcon icon={ImageAdd01Icon} size={14} />}
                                                <input id="desktop-media-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "lighthouseDesktop.screenshot", setDesktopPreviewUrl)} />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Mobile Screenshot</Label>
                                            <div onClick={() => document.getElementById('mobile-media-upload')?.click()} className="relative w-full h-24 bg-zinc-50 border border-dashed rounded-lg overflow-hidden flex items-center justify-center cursor-pointer text-zinc-400">
                                                {mobilePreviewUrl ? <img src={mobilePreviewUrl} className="w-full h-full object-cover" /> : <HugeiconsIcon icon={ImageAdd01Icon} size={14} />}
                                                <input id="mobile-media-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "lighthouseMobile.screenshot", setMobileScreenshotPreview)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>

                        {/* TAB 4: SEO & DISCOVERABILITY */}
                        <div className={cn("space-y-6", activeTab !== "seo" && "hidden")}>
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black text-zinc-900 uppercase tracking-wider">General SEO</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Meta Title</Label>
                                            <Input {...register("metaTitle")} placeholder="e.g. Best ENT Clinic in Silchar" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Canonical URL</Label>
                                            <Input {...register("canonicalUrl")} placeholder="https://entclinicsilchar.com/" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Meta Description</Label>
                                        <Textarea {...register("metaDescription")} placeholder="Meta descriptions improve search click rates..." className="h-20 bg-zinc-50 border-zinc-100 rounded-xl font-bold resize-none p-3" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Keywords (Comma-separated)</Label>
                                            <Input placeholder="e.g. ent doctor, sinus relief, ear infection" defaultValue={watch("metaKeywords")?.join(", ")} onChange={(e) => setValue("metaKeywords", e.target.value.split(",").map(k => k.trim()))} className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Robots Meta Rule</Label>
                                            <Input {...register("robotsRule")} placeholder="index, follow" className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                        </div>
                                    </div>
                                </div>

                                {/* Local SEO Conditional Toggle */}
                                <div className="border-t border-zinc-100 pt-6 space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm font-black text-zinc-900">Enable Local SEO Panel</Label>
                                            <p className="text-xs text-zinc-500 font-medium">For physical retail stores, hospitals, and local agencies</p>
                                        </div>
                                        <Switch checked={watch("enableLocalSeo") || false} onCheckedChange={(val) => setValue("enableLocalSeo", val)} />
                                    </div>

                                    {watch("enableLocalSeo") && (
                                        <div className="space-y-4 p-5 bg-zinc-50/50 border border-zinc-100 rounded-2xl space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Google Business Link</Label>
                                                    <Input {...register("gbpUrl")} placeholder="https://g.page/r/your-listing-id" className="h-12 bg-white border-zinc-200 rounded-xl font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Google Maps Embed URL</Label>
                                                    <Input {...register("mapsEmbedUrl")} placeholder="https://google.com/maps/embed/..." className="h-12 bg-white border-zinc-200 rounded-xl font-bold" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Local Keywords (Comma-separated)</Label>
                                                    <Input defaultValue={watch("localKeywords")?.join(", ")} onChange={(e) => setValue("localKeywords", e.target.value.split(",").map(k => k.trim()))} placeholder="e.g. ent doctor silchar, best doctor in silchar" className="h-12 bg-white border-zinc-200 rounded-xl font-bold" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Target Areas (Comma-separated)</Label>
                                                    <Input defaultValue={watch("targetAreas")?.join(", ")} onChange={(e) => setValue("targetAreas", e.target.value.split(",").map(a => a.trim()))} placeholder="e.g. Silchar, Cachar, Assam" className="h-12 bg-white border-zinc-200 rounded-xl font-bold" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">NAP Consistency Details</Label>
                                                <Textarea {...register("napConsistency")} placeholder="Consistent Name, Address, and Phone data formatting..." className="h-16 bg-white border-zinc-200 rounded-xl font-bold p-3 resize-none" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* AI Agent Optimization Conditional Toggle */}
                                <div className="border-t border-zinc-100 pt-6 space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm font-black text-zinc-900">Enable AI & Crawler Optimization</Label>
                                            <p className="text-xs text-zinc-500 font-medium">Exposes markdown profiles optimized for LLM retrievers and search agents</p>
                                        </div>
                                        <Switch checked={watch("enableAiOptimization") || false} onCheckedChange={(val) => setValue("enableAiOptimization", val)} />
                                    </div>

                                    {watch("enableAiOptimization") && (
                                        <div className="space-y-4 p-5 bg-zinc-50/50 border border-zinc-100 rounded-2xl space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">AI Agentic Summary (Markdown)</Label>
                                                <Textarea {...register("agenticSummary")} placeholder="Provide a clean markdown summary outlining metrics, features, and specs..." className="min-h-[100px] bg-white border-zinc-200 rounded-xl font-bold p-3" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">LLM System Hints</Label>
                                                <Input {...register("agentInstructions")} placeholder="Hints, e.g. 'Synthesize this as a high-performance e-commerce local search page'" className="h-12 bg-white border-zinc-200 rounded-xl font-bold" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                        </div>

                        {/* TAB 5: PERFORMANCE */}
                        <div className={cn("space-y-6", activeTab !== "perf" && "hidden")}>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Desktop Lighthouse Scores */}
                                    <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-3">
                                        <h5 className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">Desktop Lighthouse</h5>
                                        <div className="grid grid-cols-4 gap-1">
                                            <div className="text-center"><Label className="text-[8px] font-bold text-zinc-400 uppercase">Perf</Label><Input type="number" min="0" max="100" {...register("lighthouseDesktop.performance", { valueAsNumber: true })} className="h-9 text-center rounded bg-white text-xs font-bold" /></div>
                                            <div className="text-center"><Label className="text-[8px] font-bold text-zinc-400 uppercase">Acc</Label><Input type="number" min="0" max="100" {...register("lighthouseDesktop.accessibility", { valueAsNumber: true })} className="h-9 text-center rounded bg-white text-xs font-bold" /></div>
                                            <div className="text-center"><Label className="text-[8px] font-bold text-zinc-400 uppercase">Pract</Label><Input type="number" min="0" max="100" {...register("lighthouseDesktop.bestPractices", { valueAsNumber: true })} className="h-9 text-center rounded bg-white text-xs font-bold" /></div>
                                            <div className="text-center"><Label className="text-[8px] font-bold text-zinc-400 uppercase">Seo</Label><Input type="number" min="0" max="100" {...register("lighthouseDesktop.seo", { valueAsNumber: true })} className="h-9 text-center rounded bg-white text-xs font-bold" /></div>
                                        </div>
                                    </div>

                                    {/* Mobile Lighthouse Scores */}
                                    <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-3">
                                        <h5 className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">Mobile Lighthouse</h5>
                                        <div className="grid grid-cols-4 gap-1">
                                            <div className="text-center"><Label className="text-[8px] font-bold text-zinc-400 uppercase">Perf</Label><Input type="number" min="0" max="100" {...register("lighthouseMobile.performance", { valueAsNumber: true })} className="h-9 text-center rounded bg-white text-xs font-bold" /></div>
                                            <div className="text-center"><Label className="text-[8px] font-bold text-zinc-400 uppercase">Acc</Label><Input type="number" min="0" max="100" {...register("lighthouseMobile.accessibility", { valueAsNumber: true })} className="h-9 text-center rounded bg-white text-xs font-bold" /></div>
                                            <div className="text-center"><Label className="text-[8px] font-bold text-zinc-400 uppercase">Pract</Label><Input type="number" min="0" max="100" {...register("lighthouseMobile.bestPractices", { valueAsNumber: true })} className="h-9 text-center rounded bg-white text-xs font-bold" /></div>
                                            <div className="text-center"><Label className="text-[8px] font-bold text-zinc-400 uppercase">Seo</Label><Input type="number" min="0" max="100" {...register("lighthouseMobile.seo", { valueAsNumber: true })} className="h-9 text-center rounded bg-white text-xs font-bold" /></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-zinc-100 pt-6 space-y-4">
                                    <h5 className="text-[10px] font-black text-zinc-950 uppercase tracking-wider ml-1 border-l-2 border-zinc-950 pl-2">Search Console Metrics</h5>
                                    <div className="grid grid-cols-5 gap-2">
                                        <div className="text-center"><Label className="text-[8px] font-bold text-zinc-400 uppercase">Clicks</Label><Input type="number" {...register("scClicks", { valueAsNumber: true })} className="h-10 text-center rounded-lg bg-zinc-50 font-bold" /></div>
                                        <div className="text-center"><Label className="text-[8px] font-bold text-zinc-400 uppercase">Impressions</Label><Input type="number" {...register("scImpressions", { valueAsNumber: true })} className="h-10 text-center rounded-lg bg-zinc-50 font-bold" /></div>
                                        <div className="text-center"><Label className="text-[8px] font-bold text-zinc-400 uppercase">CTR (%)</Label><Input type="number" step="0.01" {...register("scCtr", { valueAsNumber: true })} className="h-10 text-center rounded-lg bg-zinc-50 font-bold" /></div>
                                        <div className="text-center"><Label className="text-[8px] font-bold text-zinc-400 uppercase">Avg Pos</Label><Input type="number" step="0.1" {...register("scPosition", { valueAsNumber: true })} className="h-10 text-center rounded-lg bg-zinc-50 font-bold" /></div>
                                        <div className="text-center"><Label className="text-[8px] font-bold text-zinc-400 uppercase">Indexed</Label><Input type="number" {...register("scIndexedPages", { valueAsNumber: true })} className="h-10 text-center rounded-lg bg-zinc-50 font-bold" /></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-100">
                                    {/* Search Console screenshots */}
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Search Console Performance screenshot</Label>
                                        <div onClick={() => document.getElementById('sc-perf-upload')?.click()} className="relative w-full h-24 bg-zinc-50 border border-dashed rounded-xl flex items-center justify-center cursor-pointer text-zinc-400">
                                            {scPerformancePreviewUrl ? <img src={scPerformancePreviewUrl} className="w-full h-full object-cover" /> : <HugeiconsIcon icon={ImageAdd01Icon} size={14} />}
                                            <input id="sc-perf-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "scPerformanceScreenshot", setScPerformancePreviewUrl)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Core Web Vitals screenshot</Label>
                                        <div onClick={() => document.getElementById('sc-vitals-upload')?.click()} className="relative w-full h-24 bg-zinc-50 border border-dashed rounded-xl flex items-center justify-center cursor-pointer text-zinc-400">
                                            {scWebVitalsPreviewUrl ? <img src={scWebVitalsPreviewUrl} className="w-full h-full object-cover" /> : <HugeiconsIcon icon={ImageAdd01Icon} size={14} />}
                                            <input id="sc-vitals-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "scCoreWebVitalsScreenshot", setScWebVitalsPreviewUrl)} />
                                        </div>
                                    </div>
                                </div>
                        </div>

                        {/* TAB 6: PORTFOLIO CONFIG / SETTINGS */}
                        <div className={cn("space-y-6", activeTab !== "settings" && "hidden")}>
                                <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                    <div className="flex items-center justify-between col-span-1">
                                        <div className="space-y-0.5">
                                            <Label className="text-xs font-black text-zinc-900">Featured Case Study</Label>
                                            <p className="text-[9px] text-zinc-500 font-bold">Display in hero/featured slots</p>
                                        </div>
                                        <Switch checked={watch("featured") || false} onCheckedChange={(val) => setValue("featured", val)} />
                                    </div>
                                    <div className="flex items-center justify-between col-span-1">
                                        <div className="space-y-0.5">
                                            <Label className="text-xs font-black text-zinc-900">Public Visibility</Label>
                                            <p className="text-[9px] text-zinc-500 font-bold">Visible on client portfolio page</p>
                                        </div>
                                        <Switch checked={watch("is_public") !== false} onCheckedChange={(val) => setValue("is_public", val)} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Display Order Priority</Label>
                                        <Input type="number" {...register("displayOrder", { valueAsNumber: true })} className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Testimonial Rating (1-5)</Label>
                                        <Input type="number" min="1" max="5" {...register("testimonial.rating", { valueAsNumber: true })} className="h-12 bg-zinc-50 border-zinc-100 rounded-xl font-bold" />
                                    </div>
                                </div>

                                {/* Testimonial inputs */}
                                <div className="space-y-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-4">
                                    <h5 className="text-[10px] font-black text-zinc-950 uppercase tracking-widest flex items-center gap-2">
                                        <HugeiconsIcon icon={UserIcon} className="text-blue-500" size={16} />
                                        Client Testimonial Review
                                    </h5>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="space-y-1"><Label className="text-[9px] font-bold text-zinc-400">Reviewer Name</Label><Input {...register("testimonial.clientName")} placeholder="Dr. Ray" className="h-10 bg-white" /></div>
                                        <div className="space-y-1"><Label className="text-[9px] font-bold text-zinc-400">Company Name</Label><Input {...register("testimonial.company")} placeholder="The ENT Clinic" className="h-10 bg-white" /></div>
                                        <div className="space-y-1"><Label className="text-[9px] font-bold text-zinc-400">Designation</Label><Input {...register("testimonial.designation")} placeholder="Head Surgeon" className="h-10 bg-white" /></div>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[9px] font-bold text-zinc-400">Client Photo</Label>
                                        <div onClick={() => document.getElementById('reviewer-photo-upload')?.click()} className="relative w-20 h-20 bg-white border border-dashed rounded-2xl flex items-center justify-center cursor-pointer text-zinc-400">
                                            {testimonialPhotoPreviewUrl ? <img src={testimonialPhotoPreviewUrl} className="w-full h-full object-cover rounded-2xl" /> : <HugeiconsIcon icon={ImageAdd01Icon} size={14} />}
                                            <input id="reviewer-photo-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "testimonial.photo", setTestimonialPhotoPreviewUrl)} />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[9px] font-bold text-zinc-400">Review Quote</Label>
                                        <Textarea {...register("testimonial.testimonial")} placeholder="Client's testimonial quote text..." className="h-20 bg-white border-zinc-200 rounded-xl font-bold p-3" />
                                    </div>
                                </div>

                                {/* CTA Details */}
                                <div className="space-y-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-4">
                                    <h5 className="text-[10px] font-black text-zinc-950 uppercase tracking-widest flex items-center gap-2">
                                        <HugeiconsIcon icon={Settings02Icon} className="text-blue-500" size={16} />
                                        CTA Section Banner
                                    </h5>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1"><Label className="text-[9px] font-bold text-zinc-400">CTA Title</Label><Input {...register("cta.title")} placeholder="Want to optimize your local search presence?" className="h-10 bg-white" /></div>
                                        <div className="space-y-1"><Label className="text-[9px] font-bold text-zinc-400">Button Link</Label><Input {...register("cta.buttonLink")} placeholder="/contact" className="h-10 bg-white" /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1"><Label className="text-[9px] font-bold text-zinc-400">CTA Description</Label><Input {...register("cta.description")} placeholder="Connect with Locallify Elite today." className="h-10 bg-white" /></div>
                                        <div className="space-y-1"><Label className="text-[9px] font-bold text-zinc-400">Button Label</Label><Input {...register("cta.buttonText")} placeholder="Get Audit Report" className="h-10 bg-white" /></div>
                                    </div>
                                </div>

                                {/* FAQ Array List Editor */}
                                <div className="space-y-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                                    <Label className="text-[10px] font-black text-zinc-950 uppercase tracking-widest">Case Study FAQ List</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input value={newFaqQuestion} onChange={(e) => setNewFaqQuestion(e.target.value)} placeholder="FAQ Question (e.g. How long did it take?)" className="h-10 bg-white" />
                                        <Input value={newFaqAnswer} onChange={(e) => setNewFaqAnswer(e.target.value)} placeholder="FAQ Answer" className="h-10 bg-white" />
                                    </div>
                                    <Button type="button" onClick={() => {
                                        if (newFaqQuestion.trim()) {
                                            setValue("faq", [...faqList, { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() }]);
                                            setNewFaqQuestion("");
                                            setNewFaqAnswer("");
                                        }
                                    }} className="bg-zinc-900 text-white font-bold h-10 px-4 rounded-xl flex items-center gap-1 text-[10px] uppercase tracking-widest">
                                        <HugeiconsIcon icon={PlusSignIcon} size={14} /> Add FAQ
                                    </Button>
                                    <div className="space-y-2">
                                        {faqList.map((faq, idx) => (
                                            <div key={idx} className="bg-white border border-zinc-100 p-4 rounded-xl flex justify-between items-start">
                                                <div>
                                                    <h5 className="text-xs font-black text-zinc-900">Q: {faq.question}</h5>
                                                    <p className="text-[10px] text-zinc-500 font-bold mt-1">A: {faq.answer}</p>
                                                </div>
                                                <Button type="button" variant="ghost" onClick={() => setValue("faq", faqList.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700 h-8 w-8 p-0"><HugeiconsIcon icon={Delete02Icon} size={16} /></Button>
                                            </div>
                                        ))}
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
                            disabled={isSubmitting}
                            className="h-12 px-8 bg-[#0066FF] hover:bg-[#0052CC] text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/10 transition-all active:scale-95 flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <HugeiconsIcon icon={Loading01Icon} className="animate-spin" size={16} />
                            ) : (
                                <>
                                    <HugeiconsIcon icon={Tick01Icon} size={16} />
                                    {project ? "Save Case Study" : "Create Project"}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
