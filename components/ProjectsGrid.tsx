"use client";

import React, { useState } from "react";
import { Project } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    WorkHistoryIcon,
    Calendar01Icon,
    GlobalIcon,
    ArrowRight01Icon,
    Tick01Icon,
    Add01Icon,
    Search01Icon,
    Delete02Icon
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import ProjectDialog from "./ProjectDialog";
import { deleteProjectAction } from "@/lib/server/actions";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { urlFor } from "@/lib/sanity";

interface ProjectsGridProps {
    initialProjects: Project[];
}

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const filteredProjects = initialProjects.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setIsDialogOpen(true);
    };

    const handleAdd = () => {
        setSelectedProject(null);
        setIsDialogOpen(true);
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this project?")) return;
        
        setIsDeleting(id);
        try {
            const result = await deleteProjectAction(id);
            if (result.success) {
                toast.success("Project deleted successfully");
            } else {
                toast.error(result.error || "Failed to delete project");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div>
                    <h1 className="text-5xl font-black text-zinc-900 tracking-tighter uppercase italic">Client <span className="text-[#0066FF]">Projects</span></h1>
                    <p className="text-zinc-500 font-bold mt-2 uppercase text-xs tracking-[0.2em]">Active development and deployment roadmap</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <HugeiconsIcon icon={Search01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#0066FF] transition-colors" size={20} />
                        <input 
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-14 w-full md:w-80 bg-white border border-zinc-100 rounded-2xl pl-12 pr-4 font-bold text-sm focus:ring-4 focus:ring-[#0066FF]/10 focus:border-[#0066FF] outline-none transition-all shadow-sm"
                        />
                    </div>
                    <button 
                        onClick={handleAdd}
                        className="h-14 px-8 bg-[#0066FF] hover:bg-[#0052CC] text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-3 group"
                    >
                        <HugeiconsIcon icon={Add01Icon} size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                        New Project
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.$id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <Card className="border-none shadow-[0_15px_40px_rgba(0,0,0,0.03)] rounded-[40px] overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 group relative">
                                <Button 
                                    variant="ghost"
                                    size="icon"
                                    disabled={isDeleting === project.$id}
                                    onClick={(e) => handleDelete(e, project.$id)}
                                    className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl"
                                >
                                    <HugeiconsIcon icon={Delete02Icon} size={18} />
                                </Button>

                                <CardContent className="p-0">
                                    <div className="p-10">
                                        <div className="flex items-start justify-between mb-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-zinc-50 rounded-[24px] flex items-center justify-center text-zinc-400 font-black group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-500 shadow-inner overflow-hidden">
                                                    {project.thumbnail && project.thumbnail !== "default" ? (
                                                         <img 
                                                             src={urlFor(project.thumbnail)} 
                                                             alt={project.title}
                                                             className="w-full h-full object-cover"
                                                         />
                                                    ) : (
                                                        <HugeiconsIcon icon={project.tags?.[0]?.toLowerCase().includes('web') || project.tags?.[0]?.toLowerCase().includes('app') ? GlobalIcon : WorkHistoryIcon} size={32} />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-black text-zinc-900 tracking-tight leading-tight">{project.title}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <HugeiconsIcon icon={Calendar01Icon} size={12} className="text-zinc-400" />
                                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest" suppressHydrationWarning>
                                                            Started {new Date(project.$createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge className={cn(
                                                "font-black uppercase text-[10px] tracking-widest px-4 py-2 rounded-full",
                                                project.status === 'completed' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                                            )}>
                                                {project.status || 'ongoing'}
                                            </Badge>
                                        </div>

                                        <p className="text-zinc-600 font-medium mb-8 leading-relaxed line-clamp-2 italic">
                                            "{project.description}"
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 mb-10">
                                            <div className="p-5 bg-zinc-50 rounded-3xl border border-zinc-100/50">
                                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Infrastructure</p>
                                                <div className="flex items-center gap-2">
                                                    <HugeiconsIcon icon={Tick01Icon} size={14} className="text-emerald-500" />
                                                    <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Verified</p>
                                                </div>
                                            </div>
                                            <div className="p-5 bg-zinc-50 rounded-3xl border border-zinc-100/50">
                                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Platform</p>
                                                <div className="flex items-center gap-2">
                                                    <HugeiconsIcon icon={GlobalIcon} size={14} className="text-blue-500" />
                                                    <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider">{project.tags?.[0] || 'Development'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex -space-x-3">
                                                {[...Array(3)].map((_, i) => (
                                                    <div key={i} className="w-10 h-10 rounded-xl border-4 border-white bg-zinc-100 flex items-center justify-center text-[10px] font-black text-zinc-400 shadow-sm">
                                                        {['JS', 'RE', 'NX'][i]}
                                                    </div>
                                                ))}
                                            </div>
                                            <button 
                                                onClick={() => handleEdit(project)}
                                                className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0066FF] transition-all duration-300 shadow-lg shadow-zinc-900/10 active:scale-95 group/btn"
                                            >
                                                Manage Details
                                                <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <ProjectDialog 
                open={isDialogOpen} 
                onOpenChange={setIsDialogOpen} 
                project={selectedProject} 
            />
        </>
    );
}
