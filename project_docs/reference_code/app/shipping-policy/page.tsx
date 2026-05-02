import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#0066FF] selection:text-white">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4 mb-16 text-center">
            <span className="inline-block px-6 py-2 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-black uppercase tracking-[0.3em]">Legal</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-zinc-900">Delivery <span className="text-[#0066FF]">Policy.</span></h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Last Updated: April 2024</p>
          </div>

          <div className="prose prose-zinc max-w-none space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">1. Digital Delivery</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                Locallify provides digital services including website design, development, and hosting. There are no physical goods to be shipped. All deliverables are provided digitally via email or direct access to the web platform.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">2. Delivery Timelines</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                Our standard delivery timeline for "One Page Websites" is 24-48 hours after receiving all necessary business details. For custom websites, timelines are agreed upon at the start of the project and typically range from 5-10 business days.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">3. Project Handover</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                A project is considered "delivered" once the website is live on the agreed-upon domain and the client is provided with the necessary access or documentation.
              </p>
            </section>

            <section className="space-y-6 border-t border-zinc-100 pt-12">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">Contact Us</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                If you have any questions regarding our delivery process, please contact us at <span className="text-[#0066FF] font-bold">locallify26@gmail.com</span>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
