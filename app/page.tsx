import React from "react";
import DashboardShell from "@/components/DashboardShell";
import { StatCard } from "@/components/ui/stat-card";
import RecentProjectsTable from "@/components/RecentProjectsTable";
import {
  WorkHistoryIcon,
  Loading03Icon,
  Tick01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { serverProjectService } from "@/lib/server/services";
import { Project } from "@/lib/types";

export default async function Home() {
  let projects: Project[] = [];

  try {
    projects = await serverProjectService.getAllProjects();
  } catch (error) {
    console.error("Error fetching projects on server:", error);
  }

  const stats = {
    total: projects.length,
    ongoing: projects.filter(p => p.status === "ongoing").length,
    completed: projects.filter(p => p.status === "completed").length,
    featured: projects.filter(p => p.featured).length,
  };

  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm font-medium text-zinc-400 mt-1">
          Welcome back! Here's what's happening with Locallify today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard label="Total Projects" value={stats.total} sublabel="In portfolio" icon={WorkHistoryIcon} tone="blue" />
        <StatCard label="Ongoing" value={stats.ongoing} sublabel="In progress" icon={Loading03Icon} tone="indigo" />
        <StatCard label="Completed" value={stats.completed} sublabel="Shipped" icon={Tick01Icon} tone="emerald" />
        <StatCard label="Featured" value={stats.featured} sublabel="Highlighted" icon={StarIcon} tone="amber" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-zinc-900">Recent Projects</h2>
        </div>
        <RecentProjectsTable projects={projects} />
      </div>
    </DashboardShell>
  );
}
