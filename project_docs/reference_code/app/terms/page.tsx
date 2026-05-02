import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#0066FF] selection:text-white">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4 mb-16 text-center">
            <span className="inline-block px-6 py-2 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-black uppercase tracking-[0.3em]">Legal</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-zinc-900">Terms & <span className="text-[#0066FF]">Conditions.</span></h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Last Updated: April 2024</p>
          </div>

          <div className="prose prose-zinc max-w-none space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">1. Agreement to Terms</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                By accessing or using Locallify's services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the service.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">2. Services</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                Locallify provides website design and development services. We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">3. Intellectual Property</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                The content, features, and functionality of the Locallify platform are and will remain the exclusive property of Locallify. All custom websites developed for clients are subject to individual project agreements.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">4. User Responsibilities</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">5. Limitation of Liability</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                In no event shall Locallify be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the service.
              </p>
            </section>

            <section className="space-y-6 border-t border-zinc-100 pt-12">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">Contact Us</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                If you have any questions about these Terms, please contact us at <span className="text-[#0066FF] font-bold">locallify26@gmail.com</span>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
