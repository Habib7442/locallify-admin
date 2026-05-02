"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Layout, MapPin, Star } from "lucide-react";

const PORTFOLIO_ITEMS = [
  { id: 2, img: "/portfolio/restaurant/1.png", cat: "Restaurant", title: "Spicy Fusion Kitchen", location: "Mumbai, Maharashtra" },
  { id: 3, img: "/portfolio/salon/1.png", cat: "Salon", title: "Glow & Flow Studio", location: "Bangalore, Karnataka" },
  { id: 4, img: "/portfolio/wedding%20cards/1.png", cat: "Wedding Cards", title: "Elite Invitations", location: "Delhi, NCR" },
  { id: 5, img: "/portfolio/saree/2.png", cat: "Saree & Fashion", title: "Modern Ethnic Wear", location: "Kolkata, West Bengal" },
  { id: 6, img: "/portfolio/restaurant/2.png", cat: "Restaurant", title: "The Urban Grill", location: "Guwahati, Assam" },
  { id: 7, img: "/portfolio/salon/2.png", cat: "Salon", title: "Style & Grace Nails", location: "Pune, Maharashtra" },
  { id: 8, img: "/portfolio/wedding%20cards/2.png", cat: "Wedding Cards", title: "Velvet Prints", location: "Hyderabad, Telangana" },
  { id: 9, img: "/portfolio/saree/3.png", cat: "Saree & Fashion", title: "Banarasi Heritage", location: "Silchar, Assam" },
  { id: 10, img: "/portfolio/restaurant/3.png", cat: "Restaurant", title: "Organic Plates", location: "Chennai, Tamil Nadu" },
];

const CATEGORIES = ["All", "Saree & Fashion", "Restaurant", "Salon", "Wedding Cards"];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems = activeTab === "All" 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.cat === activeTab);

  return (
    <div className="relative min-h-screen bg-white font-sans selection:bg-[#0066FF] selection:text-white overflow-x-hidden">
      
      <Navbar />

      {/* ─── HERO SECTION ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden bg-[#F0F7FF]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(0,102,255,0.05),transparent_70%)]"></div>
        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            <span className="inline-block px-6 py-2 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-black uppercase tracking-[0.3em]">
              Locallify Showreel 2026
            </span>
            <h1 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tight text-zinc-900 uppercase">
              LOCAL <br /> <span className="text-[#0066FF]">MASTERPIECES.</span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              A curated collection of India&apos;s most ambitious businesses, powered by <span className="text-zinc-900 font-bold">Locallify Pages.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── FILTERS ─────────────────────────────────────────────── */}
      <section className="py-8 sticky top-[72px] z-40 bg-white/80 backdrop-blur-xl border-y border-zinc-100 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto gap-3 md:gap-4 pb-1 no-scrollbar justify-center">
            {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`flex-shrink-0 px-6 py-3 md:px-8 md:py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border ${
                    activeTab === cat 
                    ? "bg-[#0066FF] text-white border-[#0066FF] shadow-lg shadow-[#0066FF]/20" 
                    : "bg-white text-zinc-400 border-zinc-100 hover:bg-zinc-50"
                  }`}
                >
                  {cat}
                </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#FDF2F8] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,0,150,0.03),transparent_40%)]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group relative"
                >
                    <div className="bg-white border border-zinc-100 rounded-[3rem] p-6 hover:border-[#0066FF]/20 transition-all duration-500 overflow-hidden shadow-xl">
                       <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-zinc-50 mb-8 bg-zinc-50">
                          <Image
                           src={item.img}
                           alt={item.title}
                           fill
                           className="object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                       </div>
                      
                      <div className="space-y-5 px-2">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-900 leading-none">{item.title}</h3>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#0066FF]/40">{item.cat}</span>
                        </div>
                        
                        <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                           <div className="flex -space-x-2">
                              {[1,2,3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-4 border-white bg-[#0066FF]/5 flex items-center justify-center shadow-sm">
                                   <Star className="w-3 h-3 fill-[#0066FF] text-[#0066FF]" />
                                </div>
                              ))}
                           </div>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Managed by Locallify</p>
                        </div>
                      </div>
                   </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CTA 
        title={<>READY TO BE <br /> OUR NEXT <br /> <span className="text-[#0066FF]">LEGEND?</span></>}
        subtitle="We don't just build pages. We build digital legacies. Join the elite businesses across India who are already winning the digital game."
      />
      <Footer />
    </div>
  );
}
