'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageCircle, Star, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-[#0066FF] selection:text-white">
      <Navbar />

      {/* ─── HERO SECTION ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden bg-[#F0F7FF]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(0,102,255,0.05),transparent_70%)]"></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 max-w-5xl mx-auto"
          >
            <span className="inline-block px-6 py-2 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-black uppercase tracking-[0.3em] animate-pulse">
              India's New Local Standard
            </span>
            <h1 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tighter text-zinc-900">
              CLAIM YOUR <br />
              <span className="text-[#0066FF]">DIGITAL SPOTLIGHT</span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              We build your <span className="text-[#0066FF] font-bold">One Page & Custom Websites</span>, manage your Google presence, and deliver leads to your WhatsApp. <span className="font-bold text-zinc-900 underline decoration-[#0066FF]/30">Starter plan (for single page) at ₹499, thereafter ₹999/month to remain active.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <a href="https://wa.me/919957882204?text=Hi%20Locallify!%20I%20want%20to%20claim%20my%20digital%20spotlight%20and%20get%20started%20with%20a%20One%20Page%20or%20Custom%20Website." target="_blank" className="w-full sm:w-auto bg-[#0066FF] text-white px-8 py-4 md:px-10 md:py-5 rounded-full text-lg font-black shadow-[0_20px_40px_rgba(0,102,255,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                GET STARTED NOW <ArrowRight className="w-5 h-5" />
              </a>
              <a href="https://wa.me/919957882204?text=Hi%20Locallify!%20I'd%20like%20to%20talk%20to%20an%20expert%20about%20my%20business%20presence." target="_blank" className="w-full sm:w-auto bg-white border-2 border-zinc-100 text-zinc-900 px-8 py-4 md:px-10 md:py-5 rounded-full text-lg font-black hover:bg-zinc-50 transition-all flex items-center justify-center gap-4 group shadow-sm">
                <div className="relative w-6 h-6 group-hover:scale-110 transition-transform">
                  <Image src="/social-icons/whatsapp.png" alt="WhatsApp" fill sizes="24px" className="object-contain" />
                </div> 
                TALK TO US
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── WHY LOCALLIFY ────────────────────────────────────────── */}
      <section id="services" className="py-20 md:py-32 relative bg-[#FDF2F8]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,0,150,0.03),transparent_40%)]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-[#0066FF] font-black text-xs uppercase tracking-[0.4em]">The Locallify Advantage</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-zinc-900 uppercase">
                  Stop Being <br />
                  <span className="text-zinc-400">Invisible.</span>
                </h2>
              </div>
              <p className="text-lg text-zinc-600 font-medium leading-relaxed">
                Small local businesses across India are struggling to be seen. Websites are expensive, and Google Business Profiles are hard to manage. We solve it all with a single WhatsApp message.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: <Zap className="text-[#0066FF]" />, title: "Live Status Engine", desc: "Show your customers exactly when you're open with our cloud-powered live status badges." },
                  { icon: <MessageCircle className="text-[#0066FF]" />, title: "WhatsApp Lead Flow", desc: "No complex dashboards. Every inquiry from your page leads directly to your WhatsApp." },
                  { icon: <Star className="text-[#0066FF]" />, title: "Premium Experience", desc: "Stunning mobile-first One Page & Custom Websites designed to make your local brand feel like a global leader." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 bg-white border border-zinc-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-[#0066FF] group-hover:text-white transition-all">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-tight text-zinc-900">{feature.title}</h4>
                      <p className="text-zinc-500 font-medium">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white border border-zinc-100 p-12 rounded-[3rem] shadow-2xl space-y-8 relative z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066FF]/5 rounded-bl-[100px]"></div>
                <h3 className="text-3xl font-black tracking-tighter text-zinc-900 leading-none uppercase">Flexible Plans, <br />Full Digital Presence.</h3>
                <ul className="space-y-6">
                  {[
                    "Professional One Page & Custom Websites",
                    "Live Open/Closed Status Badge",
                    "Branded Portfolio Design/Gallery",
                    "Prime-Ready Visiting Card PDF",
                    "WhatsApp Inquiry Integration",
                    "AI Social Media Post Monthly"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-zinc-600 font-bold uppercase text-xs tracking-widest">
                      <CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> {item}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/919957882204?text=Hi%20Locallify!%20I%20want%20to%20claim%20my%20page%20now%20and%20get%20the%20full%20digital%20presence%20subscription." target="_blank" className="block w-full bg-[#0066FF] text-white text-center py-6 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl">
                   Claim Your Page Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 md:py-32 bg-[#F0FDF4] relative border-y border-zinc-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(37,211,102,0.03),transparent_40%)]"></div>
        <div className="container mx-auto px-6 text-center space-y-16">
          <div className="space-y-4">
            <span className="text-[#0066FF] font-black text-xs uppercase tracking-[0.4em]">Simple & Transparent</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-zinc-900 uppercase">Pick Your <span className="text-zinc-400 italic">Scale</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white border border-zinc-100 p-12 rounded-[3rem] space-y-8 hover:scale-105 transition-all shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-[#0066FF] text-white text-[8px] font-black uppercase px-6 py-2 rotate-45 translate-x-8 translate-y-4">Best For Basics</div>
              <div>
                <h4 className="text-xl font-black uppercase text-zinc-900 tracking-tighter">Starter</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">One Time Page Setup</p>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-bold text-zinc-300 line-through">₹999</span>
                <div className="text-6xl font-black text-zinc-900 tracking-tighter">₹499</div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#0066FF] pt-2">First Month Only</p>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 leading-relaxed">
                Thereafter ₹999/month <br /> to keep page active
              </p>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-left">
                 <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0066FF]" /> 1 Page (locallify.in/businessname)</li>
                 <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0066FF]" /> Locallify Branding Included</li>
                 <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0066FF]" /> 1 Business QR Card</li>
                 <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0066FF]" /> WhatsApp Inquiry Button</li>
              </ul>
              <a href="https://wa.me/919957882204?text=Hi%20Locallify!%20I'm%20interested%20in%20the%20Starter%20Plan%20(%E2%82%B9499%20first%20month).%20Please%20help%20me%20set%20up%20my%20One%20Page%20or%20Custom%20Website." target="_blank" className="block w-full py-5 rounded-2xl border-2 border-zinc-100 text-zinc-900 font-black uppercase tracking-widest hover:bg-zinc-50 transition-all">Get Started</a>
            </div>

            {/* Growth Plan */}
            <div className="bg-[#0066FF] p-12 rounded-[3rem] space-y-8 scale-110 shadow-2xl relative z-10 overflow-hidden text-white">
              <div className="absolute top-0 left-0 w-full h-2 bg-white/20"></div>
              <div>
                <h4 className="text-xl font-black uppercase tracking-tighter">Growth</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/60">The Full Subscription</p>
              </div>
              <div className="text-6xl font-black tracking-tighter">₹9,999</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Active Presence Plan</p>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-white/70 text-left">
                 <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Professional Website</li>
                 <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Your Own Custom Domain</li>
                 <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> Managed Google Presence</li>
                 <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-white" /> 24/7 Priority Support</li>
              </ul>
              <a href="https://wa.me/919957882204?text=Hi%20Locallify!%20I'm%20interested%20in%20the%20Growth%20Plan%20(%E2%82%B99,999).%20Please%20help%20me%20set%20up%20my%20full%20digital%20presence." target="_blank" className="block w-full py-5 rounded-2xl bg-black text-white font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Start Growth</a>
            </div>

            {/* Pro Plan */}
            <div className="bg-white border border-zinc-100 p-12 rounded-[3rem] space-y-8 hover:scale-105 transition-all shadow-lg relative overflow-hidden group">
              <div>
                <h4 className="text-xl font-black uppercase text-zinc-900 tracking-tighter">Pro</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Custom Automation</p>
              </div>
              <div className="text-6xl font-black text-zinc-900 tracking-tighter">₹19,999</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">Full Digital Suite</p>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-left">
                 <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0066FF]" /> High-Converting Sales Flow</li>
                 <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0066FF]" /> Custom Domain Included</li>
                 <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0066FF]" /> Competitor Business Analysis</li>
                 <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0066FF]" /> 12 Social Media Posts</li>
                 <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-[#0066FF]" /> Performance Reports</li>
              </ul>
              <a href="https://wa.me/919957882204?text=Hi%20Locallify!%20I'm%20interested%20in%20the%20Pro%20Plan%20(%E2%82%B919,999).%20Please%20help%20me%20set%20up%20my%20custom%20automation%20suite." target="_blank" className="block w-full py-5 rounded-2xl border-2 border-zinc-100 text-zinc-900 font-black uppercase tracking-widest hover:bg-zinc-50 transition-all">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
