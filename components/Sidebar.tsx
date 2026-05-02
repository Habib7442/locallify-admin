'use client';

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  DashboardCircleIcon, 
  UserGroupIcon, 
  Settings02Icon, 
  GlobalIcon, 
  WorkHistoryIcon,
  Message01Icon,
  Logout01Icon,
  HelpCircleIcon,
  StarIcon,
  UserIcon
} from "@hugeicons/core-free-icons";

const menuItems = [
  { icon: DashboardCircleIcon, label: "Dashboard", href: "/" },
  { icon: UserGroupIcon, label: "Clients", href: "/clients" },
  { icon: GlobalIcon, label: "Websites", href: "/websites" },
  { icon: Message01Icon, label: "Leads", href: "/leads" },
  { icon: StarIcon, label: "Reviews", href: "/reviews" },
  { icon: WorkHistoryIcon, label: "Projects", href: "/projects" },
  { icon: Settings02Icon, label: "Settings", href: "/settings" },
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
    <aside className="w-80 bg-white border-r border-zinc-100 flex flex-col h-screen sticky top-0">
      {/* Brand Section */}
      <div className="p-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0066FF] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 rotate-3">
            <span className="text-white font-black text-2xl italic">L</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-zinc-900 tracking-tighter uppercase italic">Locallify</h1>
            <p className="text-zinc-400 font-bold uppercase text-[9px] tracking-widest">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group",
                isActive 
                  ? "bg-[#0066FF] text-white shadow-lg shadow-blue-500/20 translate-x-2" 
                  : "text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50"
              )}
            >
              <HugeiconsIcon 
                icon={item.icon} 
                className={cn(
                  "transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-white" : "text-zinc-400 group-hover:text-[#0066FF]"
                )} 
                size={22} 
              />
              <span className="font-black text-sm uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout / User Section */}
      <div className="p-8 mt-auto">
        <div className="bg-zinc-50 rounded-[32px] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-zinc-400 shadow-sm border border-zinc-100">
              <HugeiconsIcon icon={UserIcon} size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Logged in as</p>
              <p className="text-xs font-black text-zinc-900 truncate max-w-[120px]">Administrator</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full h-12 bg-white border border-zinc-100 hover:bg-red-50 hover:border-red-100 text-zinc-400 hover:text-red-500 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group"
          >
            <HugeiconsIcon icon={Logout01Icon} size={16} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
