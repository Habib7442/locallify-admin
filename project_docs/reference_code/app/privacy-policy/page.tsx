import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#0066FF] selection:text-white">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4 mb-16 text-center">
            <span className="inline-block px-6 py-2 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-black uppercase tracking-[0.3em]">Legal</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-zinc-900">Privacy <span className="text-[#0066FF]">Policy.</span></h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Last Updated: April 2024</p>
          </div>

          <div className="prose prose-zinc max-w-none space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">1. Introduction</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                At Locallify, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">2. Information We Collect</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                We collect information that you provide directly to us, such as when you create an account, request a quote, or contact us through WhatsApp. This may include your name, email address, phone number, and business details.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">3. How We Use Your Information</h2>
              <ul className="list-none space-y-4">
                {[
                  "To provide, maintain, and improve our services.",
                  "To communicate with you regarding your projects and requests.",
                  "To send you technical notices, updates, and security alerts.",
                  "To analyze trends and usage of our platform."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-zinc-600 font-medium">
                    <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[#0066FF]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">4. Data Security</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-6 border-t border-zinc-100 pt-12">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">Contact Us</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                If you have any questions about this Privacy Policy, please contact us at <span className="text-[#0066FF] font-bold">locallify26@gmail.com</span>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
