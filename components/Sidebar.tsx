'use client';

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardCircleIcon,
  WorkHistoryIcon,
  Logout01Icon,
  StarIcon,
  UserIcon,
  QuillWrite01Icon
} from "@hugeicons/core-free-icons";

const menuItems = [
  { icon: DashboardCircleIcon, label: "Dashboard", href: "/" },
  { icon: StarIcon, label: "Reviews", href: "/reviews" },
  { icon: WorkHistoryIcon, label: "Projects", href: "/projects" },
  { icon: QuillWrite01Icon, label: "Blogs", href: "/blogs" },
];

import { logoutAction } from "@/lib/server/actions";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutAction();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-zinc-100 bg-white">
      {/* Brand Section */}
      <div className="px-7 py-8">
        <div className="flex items-center gap-3">
          <img src="/logo/avatar-white-1080.png" alt="Locallify" className="h-9 w-9 rounded-2xl object-cover" />
          <span className="text-lg font-extrabold tracking-tight text-zinc-900">Locallify</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-[#0066FF] text-white shadow-lg shadow-blue-500/20"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              <HugeiconsIcon icon={item.icon} size={19} className={isActive ? "text-white" : "text-zinc-400"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout / User Section */}
      <div className="p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-zinc-400 shadow-sm">
            <HugeiconsIcon icon={UserIcon} size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-zinc-900">Administrator</p>
            <p className="text-xs font-medium text-zinc-400">Master Access</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <HugeiconsIcon icon={Logout01Icon} size={17} />
          </button>
        </div>
      </div>
    </aside>
  );
}
