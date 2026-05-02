import React from "react";
import Sidebar from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Search01Icon, 
  UserGroupIcon, 
  GlobalIcon, 
  Message01Icon, 
  ArrowUpRight01Icon,
  Notification03Icon,
  WorkHistoryIcon
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { serverProjectService, serverProfilesService } from "@/lib/server/services";
import { getLoggedInUser } from "@/lib/server/appwrite";

export default async function Home() {
  // Fetch data on the server
  let stats = {
    clients: 0,
    websites: 0,
    leads: 0,
    projects: 0
  };

  try {
    const [projects, clientsCount, user] = await Promise.all([
      serverProjectService.getAllProjects(),
      serverProfilesService.getProfilesCount(),
      getLoggedInUser()
    ]);
    
    stats = {
      clients: clientsCount,
      websites: clientsCount,
      leads: 0,
      projects: projects.length
    };
  } catch (error) {
    console.error("Error fetching stats on server:", error);
  }

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="relative group flex-1 max-w-xl">
            <HugeiconsIcon icon={Search01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#0066FF] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search clients, websites..." 
              className="h-12 w-full bg-white border border-zinc-100 rounded-2xl pl-12 pr-4 font-bold text-sm focus:ring-4 focus:ring-[#0066FF]/10 focus:border-[#0066FF] outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white border border-zinc-100 rounded-xl text-zinc-400 hover:text-zinc-900 transition-all shadow-sm">
              <HugeiconsIcon icon={Notification03Icon} size={20} />
            </button>
            <div className="flex items-center gap-3 bg-white p-1.5 pr-4 border border-zinc-100 rounded-2xl shadow-sm">
              <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-zinc-900 leading-tight">Admin User</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Master Access</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-5xl font-black text-zinc-900 tracking-tighter uppercase italic">
            Dashboard <span className="text-[#0066FF]">Overview</span>
          </h1>
          <p className="text-zinc-500 font-bold mt-2 uppercase text-xs tracking-[0.2em]">
            Welcome back! Here's what's happening with Locallify today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Clients", value: stats.clients, icon: UserGroupIcon, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Active Websites", value: stats.websites, icon: GlobalIcon, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "New Leads", value: stats.leads, icon: Message01Icon, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Real Projects", value: stats.projects, icon: WorkHistoryIcon, color: "text-orange-600", bg: "bg-orange-50" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-[0_10px_30px_rgba(0,0,0,0.02)] rounded-[32px] overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={cn("p-4 rounded-2xl transition-colors", stat.bg)}>
                    <HugeiconsIcon icon={stat.icon} className={stat.color} size={24} />
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] tracking-wider px-3 py-1 rounded-full">
                    +0%
                  </Badge>
                </div>
                <div>
                  <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-4xl font-black text-zinc-900 tracking-tight">
                    {stat.value}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-zinc-900 tracking-tight uppercase">Recent <span className="text-[#0066FF]">Leads</span></h2>
              <button className="text-[10px] font-black text-[#0066FF] uppercase tracking-widest hover:underline">View All</button>
            </div>
            <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
              <CardContent className="p-0">
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HugeiconsIcon icon={Message01Icon} className="text-zinc-200" size={32} />
                  </div>
                  <p className="text-zinc-400 font-bold uppercase text-xs tracking-widest">No recent leads found</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight uppercase mb-6 text-center lg:text-left">System <span className="text-[#0066FF]">Status</span></h2>
            <Card className="border-none bg-[#0066FF] shadow-[0_20px_40px_rgba(0,102,255,0.3)] rounded-[40px] text-white p-8">
              <CardContent className="p-0">
                <p className="text-blue-100 font-bold uppercase text-[10px] tracking-widest mb-8">Performance metrics for active websites</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-blue-500/30 backdrop-blur-md rounded-3xl p-5 border border-blue-400/30">
                    <p className="text-[10px] font-black uppercase text-blue-100/70 mb-1">Uptime</p>
                    <p className="text-2xl font-black">99.98%</p>
                  </div>
                  <div className="bg-blue-500/30 backdrop-blur-md rounded-3xl p-5 border border-blue-400/30">
                    <p className="text-[10px] font-black uppercase text-blue-100/70 mb-1">Response</p>
                    <p className="text-2xl font-black">240ms</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-blue-100/70">Live Traffic</p>
                  <div className="h-24 flex items-end gap-1.5">
                    {[40, 70, 45, 90, 65, 80, 55, 75, 50, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/20 rounded-full group relative hover:bg-white/40 transition-all" style={{ height: `${h}%` }}>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
