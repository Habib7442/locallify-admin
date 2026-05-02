'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Footer() {
  const socials = [
    { icon: "/social-icons/instagram.png", href: "https://www.instagram.com/locallify.in/", label: "Instagram" },
    { icon: "/social-icons/whatsapp.png", href: "https://wa.me/919957882204", label: "WhatsApp" },
  ];

  return (
    <footer className="bg-zinc-50 text-zinc-900 py-20 md:py-32 border-t border-zinc-100 text-center">
      <div className="container mx-auto px-6 space-y-12 md:space-y-16">
        <div className="flex flex-col items-center gap-6">
          <div className="w-28 h-20 md:w-32 md:h-24 bg-white border border-zinc-100 rounded-2xl md:rounded-3xl flex items-center justify-center p-4 md:p-6 shadow-xl mb-4 overflow-hidden">
            <Image src="/logo2.png" alt="Locallify" width={180} height={180} className="object-contain scale-150" />
          </div>
          <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-900 leading-none">Locallify</h4>
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">The New Local Standard</p>
        </div>
           
        <div className="flex justify-center flex-wrap gap-4 md:gap-8">
          {socials.map((social, i) => (
            <a 
              key={i} 
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-14 h-14 md:w-16 md:h-16 bg-white border border-zinc-100 rounded-2xl flex items-center justify-center hover:bg-zinc-50 transition-all group shadow-sm"
              title={social.label}
            >
              <div className="relative w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-all duration-300">
                 <Image 
                   src={social.icon} 
                   alt={social.label} 
                   fill 
                   sizes="32px" 
                   className="object-contain opacity-50 group-hover:opacity-100 transition-all duration-300" 
                 />
              </div>
            </a>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
           <Link href="/" className="hover:text-[#0066FF] transition-colors">Home</Link>
           <Link href="/portfolio" className="hover:text-[#0066FF] transition-colors">Work</Link>
           <Link href="/about" className="hover:text-[#0066FF] transition-colors">About</Link>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[7px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
           <Link href="/privacy-policy" className="hover:text-[#0066FF] transition-colors">Privacy Policy</Link>
           <Link href="/terms" className="hover:text-[#0066FF] transition-colors">Terms & Conditions</Link>
           <Link href="/refund-policy" className="hover:text-[#0066FF] transition-colors">Refund Policy</Link>
           <Link href="/shipping-policy" className="hover:text-[#0066FF] transition-colors">Shipping Policy</Link>
        </div>

        <div className="pt-12 md:pt-16 border-t border-zinc-100 w-full flex flex-col items-center gap-8 font-black uppercase tracking-[0.2em] text-[7px] md:text-[9px] text-zinc-400">
           <div className="flex flex-wrap justify-center gap-4 md:gap-12">
             <span>© 2026 LOCALLIFY · ALL RIGHTS RESERVED</span>
             <span className="flex items-center gap-2 text-zinc-500"><MapPin className="w-3 h-3 text-[#0066FF]" /> Fakirtilla, Masimpur, Silchar, Assam 788010</span>
             <span className="text-[#0066FF]">locallify26@gmail.com</span>
           </div>
           <p className="text-zinc-300">MADE IN THE NORTH EAST</p>
        </div>
      </div>
    </footer>
  );
}
