import React from "react";
import DashboardShell from "@/components/DashboardShell";
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
        <DashboardShell>
            <ProjectsGrid initialProjects={projects} />
        </DashboardShell>
    );
}
