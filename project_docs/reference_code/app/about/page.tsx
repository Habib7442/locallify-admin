'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, MessageCircle, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

export default function About() {
  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-[#0066FF] selection:text-white">
      <Navbar />

      {/* ─── HERO SECTION ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden bg-[#F0F7FF]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(0,102,255,0.05),transparent_70%)]"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="space-y-8"
            >
              <span className="inline-block px-6 py-2 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-black uppercase tracking-[0.3em]">
                The Locallify Manifesto
              </span>
              <h1 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tighter text-zinc-900 uppercase">
                LOCAL IS THE NEW <br /> <span className="text-[#0066FF]">GLOBAL.</span>
              </h1>

              <p className="text-lg md:text-xl font-medium text-zinc-600 max-w-2xl mx-auto leading-relaxed">
                We are building the digital infrastructure for the next generation of <span className="text-zinc-900 font-bold">India&apos;s local legends.</span> High-end design, simplified for everyone.
              </p>

              <div className="flex flex-col items-center gap-4 pt-8">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-2xl border-4 border-[#F0F7FF] bg-zinc-100 overflow-hidden shadow-lg">
                         <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="client" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-2xl border-4 border-[#F0F7FF] bg-[#0066FF] flex items-center justify-center text-white font-black text-xs shadow-lg">+50</div>
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Empowering Local Businesses Across India</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── THE MISSION GRID ───────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#FDF2F8] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,0,150,0.03),transparent_40%)]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8">

            {/* Box 1: The Problem */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white border border-zinc-100 p-10 md:p-14 rounded-[3rem] relative overflow-hidden group shadow-lg"
            >
              <div className="absolute -top-10 -right-10 p-12 text-zinc-100 group-hover:text-[#0066FF]/10 transition-colors">
                <Zap size={200} strokeWidth={3} />
              </div>
              <div className="space-y-6 relative z-10">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-zinc-900">The Digital <br /> <span className="text-[#0066FF]">Gap.</span></h2>
                <p className="text-base md:text-lg font-medium text-zinc-500 max-w-xl leading-relaxed">
                  Local businesses are the backbone of our community, but they are often invisible online. Big agencies are too slow, and DIY tools are too complex. <span className="text-zinc-900 font-bold">Locallify was born in the North East to fix this.</span>
                </p>
              </div>
            </motion.div>

            {/* Box 2: Done For You */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 bg-[#0066FF] p-10 md:p-14 rounded-[3rem] flex flex-col justify-end group hover:bg-[#0055DD] transition-all duration-700 shadow-xl"
            >
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white leading-none">DONE <br /> FOR <br /> YOU.</h3>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/50">Zero technical knowledge required. We handle everything.</p>
            </motion.div>

            {/* Box 3: The Platform */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-12 bg-white border border-zinc-100 p-10 md:p-16 rounded-[3rem] flex flex-col md:flex-row items-center gap-12 md:gap-16 relative overflow-hidden group shadow-lg"
            >
              <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Locallify Pages v2.0</span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-zinc-900">World Class <br /> Design For <br /><span className="text-[#0066FF]">Local Legends.</span></h2>
              </div>
              <div className="flex-1 space-y-8 relative z-10">
                <p className="text-base md:text-lg font-bold text-zinc-600 leading-relaxed">
                  We&apos;ve moved beyond being just an agency. Locallify is now a high-performance platform that delivers One Page &amp; Custom Websites for just ₹499.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-100">
                   <div className="space-y-1">
                     <p className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900">50+</p>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Active Pages</p>
                   </div>
                   <div className="space-y-1">
                     <p className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900">24H</p>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Setup Guarantee</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── OUR GUIDING PRINCIPLES ───────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#F0FDF4] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(37,211,102,0.03),transparent_40%)]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-[#0066FF] font-black text-xs uppercase tracking-[0.4em]">Our Philosophy</span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight uppercase text-zinc-900">The Elite <span className="text-zinc-400">Standard.</span></h2>
            </div>
            <Link href="/portfolio" className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest text-zinc-500 hover:text-[#0066FF] transition-colors">
              VIEW OUR WORK <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform text-[#0066FF]" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
             {[
               { icon: <Zap className="w-6 h-6" />, title: "Invisible Tech", desc: "You shouldn't have to learn a dashboard. We manage everything via WhatsApp so you can focus on your business." },
               { icon: <Star className="w-6 h-6" />, title: "Cinematic Aesthetics", desc: "We believe local businesses deserve the same high-end design as global brands. No generic templates." },
               { icon: <MessageCircle className="w-6 h-6" />, title: "Lead Obsessed", desc: "A website is useless if it doesn't bring customers. Every page we build is a conversion engine." }
             ].map((item, i) => (
               <div key={i} className="bg-white border border-zinc-100 p-10 md:p-12 rounded-[3rem] hover:border-[#0066FF]/20 transition-all duration-500 group shadow-lg">
                 <div className="w-14 h-14 bg-[#0066FF]/5 text-[#0066FF] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#0066FF] group-hover:text-white transition-all">
                   {item.icon}
                 </div>
                 <div className="text-[#0066FF] font-black text-3xl mb-6 tracking-tighter">0{i+1}</div>
                 <h3 className="text-xl font-black uppercase mb-4 leading-tight tracking-tighter text-zinc-900">{item.title}</h3>
                 <p className="text-sm font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
