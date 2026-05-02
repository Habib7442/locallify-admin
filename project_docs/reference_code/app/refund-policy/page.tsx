import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#0066FF] selection:text-white">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4 mb-16 text-center">
            <span className="inline-block px-6 py-2 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-black uppercase tracking-[0.3em]">Legal</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-zinc-900">Refund <span className="text-[#0066FF]">Policy.</span></h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Last Updated: April 2024</p>
          </div>

          <div className="prose prose-zinc max-w-none space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">1. Service Quality</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                At Locallify, we take pride in our work and strive to deliver the highest quality digital products. Our refund policy is designed to be fair to both our clients and our creative team.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">2. Refund Eligibility</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                Due to the digital nature of our services, refunds are generally not provided once the project work has commenced. However, if a project is canceled before any design or development work begins, a full or partial refund may be issued at our discretion.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">3. Project Milestones</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                For larger projects, payments are often tied to specific milestones. Once a milestone is approved by the client, the corresponding payment is non-refundable.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">4. Processing Refunds</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                If a refund is approved, it will be processed through the original payment method within 7-10 business days.
              </p>
            </section>

            <section className="space-y-6 border-t border-zinc-100 pt-12">
              <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">Contact Us</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                If you have any questions or would like to request a refund, please contact our support team at <span className="text-[#0066FF] font-bold">locallify26@gmail.com</span>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
