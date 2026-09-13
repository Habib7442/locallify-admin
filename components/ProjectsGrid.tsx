"use client";

import React, { useMemo, useState } from "react";
import { Project } from "@/lib/types";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    WorkHistoryIcon,
    GlobalIcon,
    ArrowUpRight01Icon,
    Add01Icon,
    Search01Icon,
    Delete02Icon,
    PencilEdit02Icon,
} from "@hugeicons/core-free-icons";
import ProjectDialog from "./ProjectDialog";
import { deleteProjectAction } from "@/lib/server/actions";
import { toast } from "sonner";
import { urlFor } from "@/lib/sanity";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { StatusPill } from "@/components/ui/status-pill";

interface ProjectsGridProps {
    initialProjects: Project[];
}

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [tab, setTab] = useState("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const tabs = [
        { id: "all", label: "All Projects", count: initialProjects.length },
        { id: "ongoing", label: "Ongoing", count: initialProjects.filter(p => p.status === "ongoing").length },
        { id: "completed", label: "Completed", count: initialProjects.filter(p => p.status === "completed").length },
        { id: "featured", label: "Featured", count: initialProjects.filter(p => p.featured).length },
    ];

    const filteredProjects = useMemo(() => {
        return initialProjects.filter(p => {
            const matchesSearch =
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.clientName || "").toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTab =
                tab === "all" ? true :
                tab === "featured" ? !!p.featured :
                p.status === tab;

            return matchesSearch && matchesTab;
        });
    }, [initialProjects, searchQuery, tab]);

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
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Client Projects</h1>
                    <p className="text-sm font-medium text-zinc-400 mt-1">Active development and deployment roadmap</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <HugeiconsIcon icon={Search01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search projects..."
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
                        New Project
                    </button>
                </div>
            </div>

            <div className="rounded-[32px] bg-white ring-1 ring-zinc-100 p-2">
                <div className="px-6 pt-4">
                    <FilterTabs tabs={tabs} active={tab} onChange={setTab} />
                </div>

                {filteredProjects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50">
                            <HugeiconsIcon icon={WorkHistoryIcon} className="text-zinc-300" size={28} />
                        </div>
                        <p className="text-sm font-semibold text-zinc-400">No projects match this view</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[820px] border-collapse">
                            <thead>
                                <tr className="text-left text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    <th className="px-6 py-3 font-bold">Project</th>
                                    <th className="px-6 py-3 font-bold">Client</th>
                                    <th className="px-6 py-3 font-bold">Created</th>
                                    <th className="px-6 py-3 font-bold">Status</th>
                                    <th className="px-6 py-3 font-bold">Visibility</th>
                                    <th className="px-6 py-3 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((project) => (
                                    <tr
                                        key={project.$id}
                                        onClick={() => handleEdit(project)}
                                        className="border-t border-zinc-50 hover:bg-zinc-50/60 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                                                    {project.thumbnail && project.thumbnail !== "default" ? (
                                                        <img src={urlFor(project.thumbnail)} alt={project.title} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <HugeiconsIcon icon={GlobalIcon} size={18} />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-zinc-900 truncate max-w-[220px]">{project.title}</p>
                                                    <p className="text-xs font-medium text-zinc-400 truncate max-w-[220px]">{project.category || project.tags?.[0] || "Development"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-zinc-500">{project.clientName || "—"}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-zinc-500" suppressHydrationWarning>
                                            {new Date(project.$createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusPill
                                                label={project.status === "completed" ? "Completed" : "Ongoing"}
                                                tone={project.status === "completed" ? "success" : "info"}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusPill
                                                label={project.is_public ? "Public" : "Private"}
                                                tone={project.is_public ? "success" : "neutral"}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {project.live_url && (
                                                    <a
                                                        href={project.live_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 hover:bg-blue-50 hover:text-[#0066FF] transition-colors"
                                                        title="Visit live site"
                                                    >
                                                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleEdit(project); }}
                                                    className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                                                    title="Edit"
                                                >
                                                    <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
                                                </button>
                                                <button
                                                    disabled={isDeleting === project.$id}
                                                    onClick={(e) => handleDelete(e, project.$id)}
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

            <ProjectDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                project={selectedProject}
            />
        </>
    );
}
