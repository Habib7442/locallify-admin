import React from "react";
import DashboardShell from "@/components/DashboardShell";
import { serverLeadService } from "@/lib/server/services";
import { Lead } from "@/lib/types";
import LeadsGrid from "@/components/LeadsGrid";

export default async function LeadsPage() {
    let leads: Lead[] = [];
    try {
        leads = await serverLeadService.getAllLeads();
    } catch (error) {
        console.error("Failed to load leads on server:", error);
    }

    return (
        <DashboardShell>
            <LeadsGrid initialLeads={leads} />
        </DashboardShell>
    );
}
