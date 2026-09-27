"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import { toast } from "sonner";
import { changePasswordAction } from "@/lib/server/actions";

const inputClass =
    "h-12 w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-4 font-medium text-sm focus:ring-4 focus:ring-[#0066FF]/10 focus:border-[#0066FF] outline-none transition-all";

export default function AccountPage() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setIsSaving(true);
        const result = await changePasswordAction(new FormData(form));
        setIsSaving(false);
        if (result.success) {
            toast.success("Password changed");
            form.reset();
        } else {
            toast.error(result.error || "Failed to change password");
        }
    };

    return (
        <DashboardShell>
            <div className="mb-8">
                <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Account</h1>
                <p className="text-sm font-medium text-zinc-400 mt-1">Change your admin password</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md space-y-5 rounded-[32px] bg-white ring-1 ring-zinc-100 p-8">
                <div className="space-y-2">
                    <label htmlFor="currentPassword" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Current password</label>
                    <input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" required className={inputClass} />
                </div>
                <div className="space-y-2">
                    <label htmlFor="newPassword" className="text-xs font-bold uppercase tracking-wider text-zinc-400">New password</label>
                    <input id="newPassword" name="newPassword" type="password" autoComplete="new-password" minLength={12} required className={inputClass} />
                    <p className="text-xs text-zinc-400">At least 12 characters. A passphrase of a few random words works well.</p>
                </div>
                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-zinc-400">Confirm new password</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" minLength={12} required className={inputClass} />
                </div>
                <button
                    type="submit"
                    disabled={isSaving}
                    className="h-12 w-full rounded-2xl bg-[#0066FF] text-sm font-bold text-white hover:bg-[#0052cc] transition-colors disabled:opacity-50"
                >
                    {isSaving ? "Saving…" : "Change password"}
                </button>
            </form>
        </DashboardShell>
    );
}
