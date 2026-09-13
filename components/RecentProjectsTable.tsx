"use client";

import React, { useMemo, useState } from "react";
import { Project } from "@/lib/types";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { StatusPill } from "@/components/ui/status-pill";
import { HugeiconsIcon } from "@hugeicons/react";
import { WorkHistoryIcon, GlobalIcon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { urlFor } from "@/lib/sanity";

export default function RecentProjectsTable({ projects }: { projects: Project[] }) {
    const [tab, setTab] = useState("all");

    const tabs = [
        { id: "all", label: "All Projects", count: projects.length },
        { id: "ongoing", label: "Ongoing", count: projects.filter(p => p.status === "ongoing").length },
        { id: "completed", label: "Completed", count: projects.filter(p => p.status === "completed").length },
    ];

    const filtered = useMemo(() => {
        const byTab = tab === "all" ? projects : projects.filter(p => p.status === tab);
        return byTab.slice(0, 6);
    }, [projects, tab]);

    return (
        <div className="rounded-[32px] bg-white ring-1 ring-zinc-100 p-2">
            <div className="flex items-center justify-between px-6 pt-4">
                <FilterTabs tabs={tabs} active={tab} onChange={setTab} />
            </div>

            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-50">
                        <HugeiconsIcon icon={WorkHistoryIcon} className="text-zinc-300" size={26} />
                    </div>
                    <p className="text-sm font-semibold text-zinc-400">No projects yet</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] border-collapse">
                        <thead>
                            <tr className="text-left text-xs font-bold uppercase tracking-wider text-zinc-400">
                                <th className="px-6 py-3 font-bold">Project</th>
                                <th className="px-6 py-3 font-bold">Client</th>
                                <th className="px-6 py-3 font-bold">Created</th>
                                <th className="px-6 py-3 font-bold">Status</th>
                                <th className="px-6 py-3 font-bold text-right">Live</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((project) => (
                                <tr key={project.$id} className="border-t border-zinc-50 hover:bg-zinc-50/60 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                                                {project.thumbnail && project.thumbnail !== "default" ? (
                                                    <img src={urlFor(project.thumbnail)} alt={project.title} className="h-full w-full object-cover" />
                                                ) : (
                                                    <HugeiconsIcon icon={WorkHistoryIcon} size={16} />
                                                )}
                                            </div>
                                            <span className="text-sm font-bold text-zinc-900 truncate max-w-[180px]">{project.title}</span>
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
                                    <td className="px-6 py-4 text-right">
                                        {project.live_url ? (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:underline"
                                            >
                                                <HugeiconsIcon icon={GlobalIcon} size={13} />
                                                Visit
                                                <HugeiconsIcon icon={ArrowUpRight01Icon} size={12} />
                                            </a>
                                        ) : (
                                            <span className="text-xs font-semibold text-zinc-300">—</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
