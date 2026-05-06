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

import ProjectsGrid from "@/components/ProjectsGrid";

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
                <ProjectsGrid initialProjects={projects} />
            </main>
        </div>
    );
}
