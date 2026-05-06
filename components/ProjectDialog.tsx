"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Project } from "@/lib/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
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
    SelectValue,
} from "@/components/ui/select";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    WorkHistoryIcon, 
    GlobalIcon, 
    Link01Icon,
    Tick01Icon,
    Loading01Icon
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { createProjectAction, updateProjectAction } from "@/lib/server/actions";

interface ProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project?: Project | null;
}

export default function ProjectDialog({ open, onOpenChange, project }: ProjectDialogProps) {
    const { register, handleSubmit, reset, setValue, watch, formState: { isSubmitting } } = useForm<Partial<Project>>({
        defaultValues: {
            title: "",
            description: "",
            status: "ongoing",
            live_url: "",
            tags: [],
            is_public: true,
            thumbnail: "default",
        }
    });

    useEffect(() => {
        if (project) {
            reset({
                title: project.title,
                description: project.description,
                status: project.status,
                live_url: project.live_url,
                tags: project.tags,
                is_public: project.is_public,
                thumbnail: project.thumbnail,
            });
        } else {
            reset({
                title: "",
                description: "",
                status: "ongoing",
                live_url: "",
                tags: [],
                is_public: true,
                thumbnail: "default",
            });
        }
    }, [project, reset]);

    const onSubmit = async (data: Partial<Project>) => {
        try {
            // Convert tags from string to array if needed (though we handle as array in state)
            const result = project 
                ? await updateProjectAction(project.$id, data)
                : await createProjectAction(data);

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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] bg-white rounded-[40px] border-none shadow-2xl p-0 overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-8 border-b border-zinc-100 bg-zinc-50/50">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black text-zinc-900 tracking-tight uppercase italic">
                                {project ? "Edit" : "New"} <span className="text-[#0066FF]">Project</span>
                            </DialogTitle>
                            <DialogDescription className="font-bold text-zinc-400 uppercase text-[10px] tracking-widest mt-2">
                                {project ? "Update project roadmap and details" : "Register a new client deployment"}
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Project Title</Label>
                            <Input 
                                {...register("title", { required: true })}
                                placeholder="e.g., Hotel Luxuria Dashboard"
                                className="h-12 bg-zinc-50 border-zinc-100 rounded-2xl font-bold placeholder:text-zinc-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Status</Label>
                                <Select 
                                    onValueChange={(val) => setValue("status", val as any)} 
                                    defaultValue={project?.status || "ongoing"}
                                >
                                    <SelectTrigger className="h-12 bg-zinc-50 border-zinc-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-zinc-100 shadow-xl">
                                        <SelectItem value="ongoing" className="font-bold">Ongoing</SelectItem>
                                        <SelectItem value="completed" className="font-bold">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Platform / Tags</Label>
                                <Input 
                                    placeholder="e.g., Web, Next.js, React"
                                    onChange={(e) => setValue("tags", e.target.value.split(",").map(t => t.trim()))}
                                    defaultValue={project?.tags?.join(", ")}
                                    className="h-12 bg-zinc-50 border-zinc-100 rounded-2xl font-bold placeholder:text-zinc-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Description</Label>
                            <Textarea 
                                {...register("description", { required: true })}
                                placeholder="Provide a brief overview of the project scope..."
                                className="min-h-[120px] bg-zinc-50 border-zinc-100 rounded-2xl font-bold placeholder:text-zinc-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none p-4"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Live URL</Label>
                            <div className="relative group">
                                <HugeiconsIcon icon={Link01Icon} size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                                <Input 
                                    {...register("live_url")}
                                    placeholder="https://client-website.com"
                                    className="h-12 bg-zinc-50 border-zinc-100 rounded-2xl pl-12 font-bold placeholder:text-zinc-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-end gap-3">
                        <Button 
                            type="button" 
                            variant="ghost" 
                            onClick={() => onOpenChange(false)}
                            className="h-12 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-all"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="h-12 px-8 bg-[#0066FF] hover:bg-[#0052CC] text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <HugeiconsIcon icon={Loading01Icon} className="animate-spin" size={16} />
                            ) : (
                                <>
                                    <HugeiconsIcon icon={Tick01Icon} size={16} />
                                    {project ? "Update Project" : "Create Project"}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
