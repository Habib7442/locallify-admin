import React from "react";
import Sidebar from "@/components/Sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar01Icon, Search01Icon, Notification03Icon } from "@hugeicons/core-free-icons";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const today = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />

            <main className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center justify-between gap-4 border-b border-zinc-100 px-8 py-6">
                    <div className="hidden items-center gap-2 text-zinc-900 md:flex">
                        <HugeiconsIcon icon={Calendar01Icon} size={18} className="text-[#0066FF]" />
                        <span className="text-sm font-bold" suppressHydrationWarning>{today}</span>
                    </div>

                    <div className="relative max-w-md flex-1">
                        <HugeiconsIcon icon={Search01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, project or status..."
                            className="h-11 w-full rounded-2xl border border-zinc-100 bg-zinc-50 pl-11 pr-4 text-sm font-medium outline-none transition-all focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-100 text-zinc-400 transition-colors hover:text-zinc-900">
                            <HugeiconsIcon icon={Notification03Icon} size={18} />
                        </button>
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black">
                            A
                            <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-8 py-8">{children}</div>
            </main>
        </div>
    );
}
