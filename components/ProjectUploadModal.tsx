"use client";

import React, { useState, useRef } from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { projectService } from "@/lib/appwrite-service";
import { CreateProjectData } from "@/lib/types";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    PlusSignIcon, 
    ImageAdd01Icon, 
    CloudUploadIcon,
    Loading01Icon
} from "@hugeicons/core-free-icons";

export function ProjectUploadModal({ onProjectCreated }: { onProjectCreated: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<CreateProjectData>({
        title: "",
        live_url: "",
        description: "",
        is_public: true,
        status: "ongoing",
        tags: [],
    });

    const [tagsInput, setTagsInput] = useState("");

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnail(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!thumbnail) {
            toast.error("Please upload a thumbnail image");
            return;
        }

        setIsLoading(true);
        try {
            const dataToSubmit = {
                ...formData,
                tags: tagsInput.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
            };

            await projectService.createProject(dataToSubmit, thumbnail);
            toast.success("Project uploaded successfully!");
            setIsOpen(false);
            resetForm();
            onProjectCreated();
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload project. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            live_url: "",
            description: "",
            is_public: true,
            status: "ongoing",
            tags: [],
        });
        setTagsInput("");
        setThumbnail(null);
        setThumbnailPreview(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold h-12 px-6 rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 group">
                    <HugeiconsIcon icon={PlusSignIcon} size={20} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    New Project
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="sm:max-w-[600px] border-none shadow-2xl rounded-3xl overflow-hidden p-0">
                <DialogHeader className="px-8 py-6 bg-zinc-900 text-white">
                    <DialogTitle className="text-2xl font-black">Upload New Project</DialogTitle>
                    <DialogDescription className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest mt-1">
                        Add a new work to your elite portfolio
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="bg-white">
                    <div className="px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent">
                    {/* Thumbnail Upload */}
                    <div className="space-y-2">
                        <Label className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Thumbnail Image</Label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="relative aspect-video w-full border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all overflow-hidden group"
                        >
                            {thumbnailPreview ? (
                                <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    <div className="p-4 bg-zinc-100 rounded-full mb-3 group-hover:bg-blue-100 transition-colors">
                                        <HugeiconsIcon icon={ImageAdd01Icon} size={32} className="text-zinc-400 group-hover:text-blue-500" />
                                    </div>
                                    <p className="text-sm font-bold text-zinc-500">Click to upload thumbnail</p>
                                    <p className="text-xs text-zinc-400 mt-1">Recommended size: 1280x720</p>
                                </>
                            )}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleThumbnailChange} 
                                className="hidden" 
                                accept="image/*"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Project Title</Label>
                            <Input 
                                id="title"
                                placeholder="e.g. Locallify V1"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="h-12 bg-zinc-50 border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Status</Label>
                            <Select 
                                value={formData.status} 
                                onValueChange={(val: any) => setFormData({...formData, status: val})}
                            >
                                <SelectTrigger className="h-12 bg-zinc-50 border-zinc-200 rounded-xl font-bold">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="ongoing">Ongoing</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>



                    <div className="space-y-2">
                        <Label htmlFor="live_url" className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Live URL</Label>
                        <Input 
                            id="live_url"
                            placeholder="https://example.com"
                            value={formData.live_url}
                            onChange={(e) => setFormData({...formData, live_url: e.target.value})}
                            className="h-12 bg-zinc-50 border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Description</Label>
                        <Textarea 
                            id="description"
                            placeholder="Write a brief description of your project..."
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="min-h-[100px] bg-zinc-50 border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold py-3"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags" className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Tags (Comma separated)</Label>
                        <Input 
                            id="tags"
                            placeholder="Next.js, Tailwind, Appwrite"
                            value={tagsInput}
                            onChange={(e) => setTagsInput(e.target.value)}
                            className="h-12 bg-zinc-50 border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold"
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className="space-y-0.5">
                            <Label className="text-sm font-black text-zinc-900">Public Visibility</Label>
                            <p className="text-xs text-zinc-500 font-medium">Allow this project to be seen on the public portfolio</p>
                        </div>
                        <Switch 
                            checked={formData.is_public}
                            onCheckedChange={(val) => setFormData({...formData, is_public: val})}
                        />
                    </div>

                    </div>
                    <DialogFooter className="px-8 py-6 bg-zinc-50 border-t border-zinc-100">
                        <Button 
                            type="button" 
                            variant="ghost" 
                            onClick={() => setIsOpen(false)}
                            className="font-bold text-zinc-500"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="bg-[#0066FF] hover:bg-[#0052CC] text-white font-black h-12 px-8 rounded-2xl shadow-lg shadow-blue-500/20 min-w-[140px]"
                        >
                            {isLoading ? (
                                <HugeiconsIcon icon={Loading01Icon} className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <HugeiconsIcon icon={CloudUploadIcon} size={20} className="mr-2" />
                                    Publish Project
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
