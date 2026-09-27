"use client";

import React, { useMemo, useState } from "react";
import { Lead, LeadStatus } from "@/lib/types";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, Search01Icon, InboxIcon, Mail01Icon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { updateLeadStatusAction, deleteLeadAction } from "@/lib/server/actions";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { StatusPill, type PillTone } from "@/components/ui/status-pill";

const STATUS_TONE: Record<LeadStatus, PillTone> = {
    new: "info",
    contacted: "success",
    archived: "neutral",
};

const STATUS_LABEL: Record<LeadStatus, string> = {
    new: "New",
    contacted: "Contacted",
    archived: "Archived",
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

export default function LeadsGrid({ initialLeads }: { initialLeads: Lead[] }) {
    const [leads, setLeads] = useState(initialLeads);
    const [searchQuery, setSearchQuery] = useState("");
    const [tab, setTab] = useState<"all" | LeadStatus>("new");
    const [expanded, setExpanded] = useState<string | null>(null);
    const [busy, setBusy] = useState<string | null>(null);

    const tabs = [
        { id: "new", label: "New", count: leads.filter(l => l.status === "new").length },
        { id: "contacted", label: "Contacted", count: leads.filter(l => l.status === "contacted").length },
        { id: "archived", label: "Archived", count: leads.filter(l => l.status === "archived").length },
        { id: "all", label: "All", count: leads.length },
    ];

    const filtered = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return leads.filter(l => {
            const matchesTab = tab === "all" || l.status === tab;
            const matchesSearch = !q || [l.name, l.email, l.company, l.description, l.source]
                .some(v => v?.toLowerCase().includes(q));
            return matchesTab && matchesSearch;
        });
    }, [leads, searchQuery, tab]);

    const setStatus = async (id: string, status: LeadStatus) => {
        setBusy(id);
        const result = await updateLeadStatusAction(id, status);
        setBusy(null);
        if (result.success) {
            setLeads(prev => prev.map(l => (l.$id === id ? { ...l, status } : l)));
            toast.success(`Marked as ${STATUS_LABEL[status].toLowerCase()}`);
        } else {
            toast.error(result.error || "Failed to update lead");
        }
    };

    const remove = async (id: string) => {
        if (!confirm("Permanently delete this lead? Do this when someone asks for their data to be deleted.")) return;
        setBusy(id);
        const result = await deleteLeadAction(id);
        setBusy(null);
        if (result.success) {
            setLeads(prev => prev.filter(l => l.$id !== id));
            toast.success("Lead deleted");
        } else {
            toast.error(result.error || "Failed to delete lead");
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Leads</h1>
                    <p className="text-sm font-medium text-zinc-400 mt-1">Project enquiries from the website contact form</p>
                </div>
                <div className="relative">
                    <HugeiconsIcon icon={Search01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-11 w-full md:w-72 bg-zinc-50 border border-zinc-100 rounded-2xl pl-11 pr-4 font-medium text-sm focus:ring-4 focus:ring-[#0066FF]/10 focus:border-[#0066FF] outline-none transition-all"
                    />
                </div>
            </div>

            <div className="rounded-[32px] bg-white ring-1 ring-zinc-100 p-2">
                <div className="px-6 pt-4">
                    <FilterTabs tabs={tabs} active={tab} onChange={(id) => setTab(id as "all" | LeadStatus)} />
                </div>

                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50">
                            <HugeiconsIcon icon={InboxIcon} className="text-zinc-300" size={28} />
                        </div>
                        <p className="text-sm font-semibold text-zinc-400">No leads in this view</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-zinc-50">
                        {filtered.map(lead => (
                            <li key={lead.$id} className="px-6 py-5">
                                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setExpanded(expanded === lead.$id ? null : lead.$id)}
                                        className="flex-1 min-w-0 text-left"
                                        aria-expanded={expanded === lead.$id}
                                    >
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-bold text-zinc-900">{lead.name}</span>
                                            {lead.company && <span className="text-sm text-zinc-400">· {lead.company}</span>}
                                            <StatusPill label={STATUS_LABEL[lead.status]} tone={STATUS_TONE[lead.status]} />
                                            {lead.source && (
                                                <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold text-violet-600">{lead.source}</span>
                                            )}
                                        </div>
                                        <p className="mt-1 text-xs font-medium text-zinc-400">
                                            {formatDate(lead.$createdAt)}
                                            {lead.projectType && ` · ${lead.projectType}`}
                                            {lead.budget && ` · ${lead.budget}`}
                                        </p>
                                        {lead.description && (
                                            <p className={expanded === lead.$id ? "mt-3 text-sm text-zinc-600 whitespace-pre-line" : "mt-3 text-sm text-zinc-600 line-clamp-2"}>
                                                {lead.description}
                                            </p>
                                        )}
                                        {expanded === lead.$id && lead.extra && (
                                            <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-zinc-50 p-3 text-xs text-zinc-500">{lead.extra}</pre>
                                        )}
                                    </button>

                                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                                        <a
                                            href={`mailto:${lead.email}?subject=${encodeURIComponent("Your project enquiry — Locallify")}`}
                                            className="flex items-center gap-1.5 px-3 h-9 rounded-xl text-xs font-bold bg-[#0066FF] text-white hover:bg-[#0052cc] transition-colors"
                                        >
                                            <HugeiconsIcon icon={Mail01Icon} size={13} />
                                            {lead.email}
                                        </a>
                                        <select
                                            value={lead.status}
                                            disabled={busy === lead.$id}
                                            onChange={(e) => setStatus(lead.$id, e.target.value as LeadStatus)}
                                            aria-label={`Status for ${lead.name}`}
                                            className="h-9 rounded-xl border border-zinc-100 bg-zinc-50 px-3 text-xs font-bold text-zinc-600 outline-none disabled:opacity-50"
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                        <button
                                            type="button"
                                            disabled={busy === lead.$id}
                                            onClick={() => remove(lead.$id)}
                                            className="flex h-9 w-9 items-center justify-center rounded-xl text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50"
                                            title="Delete lead"
                                            aria-label={`Delete lead from ${lead.name}`}
                                        >
                                            <HugeiconsIcon icon={Delete02Icon} size={16} />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
