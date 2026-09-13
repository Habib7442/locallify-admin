"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FilterTab {
    id: string;
    label: string;
    count?: number;
}

interface FilterTabsProps {
    tabs: FilterTab[];
    active: string;
    onChange: (id: string) => void;
    className?: string;
}

export function FilterTabs({ tabs, active, onChange, className }: FilterTabsProps) {
    return (
        <div className={cn("flex items-center gap-6 overflow-x-auto overflow-y-hidden", className)}>
            {tabs.map((tab) => {
                const isActive = tab.id === active;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onChange(tab.id)}
                        className={cn(
                            "relative pb-3 pt-1 text-sm font-semibold whitespace-nowrap transition-colors",
                            isActive ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
                        )}
                    >
                        {tab.label}
                        {typeof tab.count === "number" && (
                            <span className={cn("ml-1.5 text-xs", isActive ? "text-zinc-400" : "text-zinc-300")}>
                                ({tab.count})
                            </span>
                        )}
                        {isActive && (
                            <span className="absolute left-0 right-0 -bottom-px h-[2.5px] rounded-full bg-[#0066FF]" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
