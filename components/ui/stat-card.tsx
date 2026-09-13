import React from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    label: string;
    value: string | number;
    sublabel?: string;
    icon: IconSvgElement;
    tone: "blue" | "indigo" | "amber" | "emerald";
}

const toneStyles: Record<StatCardProps["tone"], { bg: string; text: string; iconBg: string }> = {
    blue: { bg: "bg-blue-50", text: "text-[#0066FF]", iconBg: "bg-white/70" },
    indigo: { bg: "bg-indigo-50", text: "text-indigo-600", iconBg: "bg-white/70" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", iconBg: "bg-white/70" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", iconBg: "bg-white/70" },
};

export function StatCard({ label, value, sublabel, icon, tone }: StatCardProps) {
    const styles = toneStyles[tone];
    return (
        <div className={cn("rounded-[28px] p-6", styles.bg)}>
            <div className="flex items-start justify-between mb-6">
                <p className="text-sm font-bold text-zinc-900">{label}</p>
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", styles.iconBg, styles.text)}>
                    <HugeiconsIcon icon={icon} size={16} />
                </div>
            </div>
            <div className="flex items-end gap-2">
                <h3 className={cn("text-4xl font-black tracking-tight", styles.text)}>{value}</h3>
                {sublabel && <p className="text-xs font-semibold text-zinc-400 mb-1">{sublabel}</p>}
            </div>
        </div>
    );
}
