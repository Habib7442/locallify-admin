import React from "react";
import Sidebar from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    WorkHistoryIcon,
    Calendar01Icon,
    GlobalIcon,
    ArrowRight01Icon,
    Tick01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { serverProjectService } from "@/lib/server/services";
import { Project } from "@/lib/types";

export default async function ProjectsPage() {
    let projects: Project[] = [];
    try {
        const data = await serverProjectService.getAllProjects();
        projects = data.map((doc: any) => ({
            ...doc,
            $id: doc.$id,
            $createdAt: doc.$createdAt,
            $updatedAt: doc.$updatedAt,
        })) as unknown as Project[];
    } catch (error) {
        console.error("Failed to load projects on server:", error);
    }

    return (
        <div className="flex min-h-screen bg-zinc-50">
            <Sidebar />
            
            <main className="flex-1 overflow-y-auto px-8 py-10">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-5xl font-black text-zinc-900 tracking-tighter uppercase italic">Client <span className="text-[#0066FF]">Projects</span></h1>
                        <p className="text-zinc-500 font-bold mt-2 uppercase text-xs tracking-[0.2em]">Active development and deployment roadmap</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge className="bg-blue-50 text-blue-600 border-none font-black text-xs px-4 py-2 rounded-xl">
                            {projects.length} TOTAL PROJECTS
                        </Badge>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <Card key={project.$id} className="border-none shadow-[0_15px_40px_rgba(0,0,0,0.03)] rounded-[40px] overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 group">
                            <CardContent className="p-0">
                                <div className="p-10">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-zinc-50 rounded-[24px] flex items-center justify-center text-zinc-400 font-black group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-500 shadow-inner">
                                                <HugeiconsIcon icon={project.category?.toLowerCase().includes('web') ? GlobalIcon : WorkHistoryIcon} size={32} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-zinc-900 tracking-tight leading-tight">{project.title}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <HugeiconsIcon icon={Calendar01Icon} size={12} className="text-zinc-400" />
                                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
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
                                                <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider">{project.category || 'Development'}</p>
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
                                        <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0066FF] transition-all duration-300 shadow-lg shadow-zinc-900/10 active:scale-95 group/btn">
                                            Manage Details
                                            <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
