'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Services", "Portfolio", "Pricing", "About"];

  const socials = [
    { icon: "/social-icons/instagram.png", href: "https://www.instagram.com/locallify.in/" },
    { icon: "/social-icons/X.png", href: "https://x.com/locallify", isX: true },
    { icon: "/social-icons/linkedin.png", href: "https://www.linkedin.com/company/locallify" },
    { icon: "/social-icons/whatsapp.png", href: "https://wa.me/919957882204" }
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? "bg-white/80 backdrop-blur-xl py-4 border-b border-zinc-100 shadow-sm" : "bg-transparent py-8"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="relative z-50 flex items-center gap-4 group">
            <div className="w-20 h-14 md:w-24 md:h-16 bg-white border border-zinc-100 rounded-2xl flex items-center justify-center p-2 md:p-3 transition-transform group-hover:scale-105 shadow-md overflow-hidden">
              <Image src="/logo2.png" alt="Locallify" width={100} height={100} className="object-contain scale-150" priority />
            </div>
            <span className={`text-xl md:text-2xl font-black tracking-tighter uppercase ${isScrolled ? "text-zinc-900" : "text-zinc-900"}`}>Locallify</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-10 font-black uppercase text-[10px] tracking-[0.2em] text-zinc-500">
              {navItems.map((item) => (
                <Link 
                  key={item} 
                  href={item === "About" ? "/about" : item === "Portfolio" ? "/portfolio" : `/#${item.toLowerCase()}`} 
                  className="hover:text-[#0066FF] transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#0066FF] transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </div>
            <a href="https://wa.me/919957882204?text=Hi%20Locallify!%20I%20want%20to%20claim%20my%20One%20Page%20or%20Custom%20Website." target="_blank" className="bg-[#0066FF] text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all">
              Claim Your Page
            </a>
          </div>

          <button className="lg:hidden z-50 bg-[#0066FF]/10 backdrop-blur-md text-[#0066FF] p-3 rounded-2xl border border-[#0066FF]/20" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }} 
            className="fixed inset-0 bg-white/95 backdrop-blur-2xl z-[100] flex flex-col p-10 items-center justify-center text-center space-y-10"
          >
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-10 right-10 bg-zinc-100 p-4 rounded-2xl">
              <X className="w-5 h-5 text-zinc-900" />
            </button>
            <div className="flex flex-col items-center gap-6">
               {navItems.map(item => (
                 <Link 
                   key={item} 
                   href={item === "About" ? "/about" : item === "Portfolio" ? "/portfolio" : `/#${item.toLowerCase()}`} 
                   onClick={() => setIsMobileMenuOpen(false)} 
                   className="text-4xl font-black text-zinc-900 uppercase tracking-tighter hover:text-[#0066FF] transition-colors"
                 >
                   {item}
                 </Link>
               ))}
               <div className="pt-6 flex flex-col gap-4 w-full items-center">
                 <a href="https://wa.me/919957882204?text=Hi%20Locallify!%20I%20want%20to%20claim%20my%20One%20Page%20or%20Custom%20Website." target="_blank" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#0066FF] text-white px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl w-full max-w-[280px] text-center">
                   Claim Your Page
                 </a>
                 <a href="https://wa.me/919957882204?text=Hi%20Locallify!%20I'd%20like%20a%20free%20consultation%20about%20building%20my%20One%20Page%20or%20Custom%20digital%20presence." target="_blank" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-500 font-black uppercase tracking-widest text-xs underline underline-offset-8 decoration-[#0066FF]">
                   WhatsApp Consultation
                 </a>
               </div>

               {/* Mobile Socials */}
               <div className="pt-6 flex justify-center gap-6 border-t border-zinc-100 w-full max-w-[200px]">
                  {socials.map((social, i) => (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`relative w-6 h-6 opacity-40 hover:opacity-100 transition-opacity ${social.isX ? 'grayscale brightness-0' : ''}`}>
                      <Image src={social.icon} alt="social" fill sizes="24px" className="object-contain" />
                    </a>
                  ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
