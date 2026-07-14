"use client";

import React, { useState } from "react";
import { Project } from "@/lib/types";
import { projectService } from "@/lib/sanity-service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    Search01Icon, 
    Link01Icon, 
    Delete02Icon, 
    GlobalIcon, 
    WorkHistoryIcon,
    Loading01Icon,
    AlertCircleIcon,
    PlusSignIcon
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectUploadModal } from "./ProjectUploadModal";

interface ProjectDashboardProps {
    initialProjects: Project[];
}

export default function ProjectDashboard({ initialProjects }: ProjectDashboardProps) {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const data = await projectService.getAllProjects();
            setProjects(data);
        } catch (error) {
            toast.error("Failed to refresh projects");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string, thumbnailId?: string) => {
        if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;
        
        try {
            await projectService.deleteProject(id, thumbnailId);
            toast.success("Project deleted successfully");
            fetchProjects();
        } catch (error) {
            toast.error("Failed to delete project");
        }
    };

    const filteredProjects = projects.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 tracking-tight italic uppercase">
                        Project <span className="text-[#0066FF]">Showcase</span>
                    </h1>
                    <p className="text-zinc-500 font-bold mt-1 uppercase text-xs tracking-widest">
                        Manage your elite portfolio of work
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <HugeiconsIcon icon={Search01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#0066FF] transition-colors" size={18} />
                        <input 
                            type="text"
                            placeholder="Search projects or tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 w-full md:w-80 bg-white border border-zinc-200 rounded-2xl pl-12 pr-4 font-bold text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-[#0066FF] outline-none transition-all shadow-sm"
                        />
                    </div>
                    <ProjectUploadModal onProjectCreated={fetchProjects} />
                </div>
            </div>

            {/* Content Area */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[50vh]">
                    <HugeiconsIcon icon={Loading01Icon} className="animate-spin text-[#0066FF] mb-4" size={48} />
                    <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">Synchronizing Work...</p>
                </div>
            ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.$id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="group border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[32px] overflow-hidden bg-white flex flex-col h-full">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img 
                                            src={projectService.getThumbnailUrl(project.thumbnail)} 
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <Badge className={cn(
                                                "font-black uppercase text-[9px] tracking-widest px-3 py-1 rounded-full border-none shadow-lg",
                                                project.is_public ? "bg-emerald-500 text-white" : "bg-zinc-800 text-zinc-300"
                                            )}>
                                                {project.is_public ? "Public" : "Private"}
                                            </Badge>
                                            <Badge className={cn(
                                                "font-black uppercase text-[9px] tracking-widest px-3 py-1 rounded-full border-none shadow-lg",
                                                project.status === "completed" ? "bg-blue-500 text-white" : "bg-amber-500 text-white"
                                            )}>
                                                {project.status}
                                            </Badge>
                                        </div>
                                    </div>

                                    <CardContent className="p-8 flex flex-col flex-1">
                                        <div className="mb-4">
                                            <h3 className="text-2xl font-black text-zinc-900 tracking-tight group-hover:text-[#0066FF] transition-colors mb-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-zinc-500 text-sm font-medium line-clamp-2 mb-6">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {project.tags.map((tag, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-zinc-50 text-zinc-500 text-[10px] font-bold rounded-lg border border-zinc-100 uppercase tracking-wider">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-auto flex items-center gap-3">
                                            {project.live_url && (
                                                <Button 
                                                    variant="secondary"
                                                    asChild
                                                    className="flex-1 h-12 bg-zinc-50 hover:bg-[#0066FF] hover:text-white text-zinc-600 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border-none"
                                                >
                                                    <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                                        <HugeiconsIcon icon={GlobalIcon} size={16} className="mr-2" />
                                                        Live Demo
                                                    </a>
                                                </Button>
                                            )}
                                            <Button 
                                                onClick={() => handleDelete(project.$id, project.thumbnail)}
                                                className="w-12 h-12 p-0 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border-none"
                                            >
                                                <HugeiconsIcon icon={Delete02Icon} size={20} />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[40px] border-2 border-dashed border-zinc-100 text-center">
                    <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                        <HugeiconsIcon icon={WorkHistoryIcon} size={40} className="text-zinc-300" />
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 mb-2">Portfolio is Empty</h3>
                    <p className="text-zinc-500 font-bold max-w-sm mx-auto mb-8">
                        You haven't uploaded any projects yet. Start by adding your first elite work.
                    </p>
                    <ProjectUploadModal onProjectCreated={fetchProjects} />
                </div>
            )}
        </div>
    );
}
