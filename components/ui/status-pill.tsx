import React from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
    Tick01Icon,
    Cancel01Icon,
    Clock01Icon,
    AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export type PillTone = "success" | "warning" | "danger" | "info" | "neutral";

const toneStyles: Record<PillTone, string> = {
    success: "bg-emerald-50 text-emerald-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-red-50 text-red-500",
    info: "bg-blue-50 text-[#0066FF]",
    neutral: "bg-zinc-100 text-zinc-500",
};

const toneIcons: Record<PillTone, IconSvgElement> = {
    success: Tick01Icon,
    warning: Clock01Icon,
    danger: Cancel01Icon,
    info: AlertCircleIcon,
    neutral: AlertCircleIcon,
};

interface StatusPillProps {
    label: string;
    tone: PillTone;
    icon?: IconSvgElement;
    className?: string;
}

export function StatusPill({ label, tone, icon, className }: StatusPillProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
                toneStyles[tone],
                className
            )}
        >
            <HugeiconsIcon icon={icon || toneIcons[tone]} size={13} />
            {label}
        </span>
    );
}
