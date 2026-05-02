'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CTAProps {
  title?: React.ReactNode;
  subtitle?: string;
  primaryBtnText?: string;
  primaryBtnHref?: string;
  secondaryBtnText?: string;
  secondaryBtnHref?: string;
}

export default function CTA({ 
  title = <>JOIN THE <br /> <span className="text-[#0066FF]">REVOLUTION.</span></>,
  subtitle = "We don't just build pages. We build digital legacies. Join the elite businesses across India who are already winning the digital game.",
  primaryBtnText = "CLAIM YOUR PAGE →",
  primaryBtnHref = "/onboarding",
  secondaryBtnText = "WHATSAPP US",
  secondaryBtnHref = "https://wa.me/919957882204"
}: CTAProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-[#F5F3FF]">
      {/* Colorful Background Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(0,102,255,0.05),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,0,150,0.03),transparent_40%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
         <motion.div
           initial={{ scale: 0.95, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           viewport={{ once: true }}
           className="max-w-6xl mx-auto space-y-12 md:space-y-16 text-center"
         >
           <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tighter uppercase text-zinc-900 select-none">
             {title}
           </h2>
           <p className="text-lg md:text-xl font-bold text-zinc-500 max-w-3xl mx-auto leading-relaxed">
             {subtitle}
           </p>
           <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center">
             <a href="https://wa.me/919957882204?text=Hi%20Locallify!%20I'm%20ready%20to%20join%20the%20revolution%20and%20claim%20my%20One%20Page%20or%20Custom%20Website%20now." target="_blank" className="w-full sm:w-auto bg-[#0066FF] text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl text-base font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl text-center">
               {primaryBtnText}
             </a>
             <a href={secondaryBtnHref} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-white border-2 border-zinc-100 text-zinc-900 px-8 py-4 md:px-10 md:py-5 rounded-2xl text-base font-black uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center justify-center gap-4 group text-center shadow-sm">
               <div className="relative w-6 h-6 group-hover:scale-110 transition-transform">
                 <Image src="/social-icons/whatsapp.png" alt="WhatsApp" fill sizes="32px" className="object-contain" />
               </div>
               {secondaryBtnText}
             </a>
           </div>
         </motion.div>
      </div>
    </section>
  );
}
