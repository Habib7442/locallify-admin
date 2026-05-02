import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  MessageCircle, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle2, 
  ArrowLeft,
  Globe,
  Star,
  Globe2,
  GlobeIcon,
  Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profileService } from '@/lib/appwrite-service';
import LeadForm from '@/components/LeadForm';
import { Toaster } from 'sonner';
import { getBusinessStatus } from '@/lib/business-utils';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ─── DYNAMIC METADATA ────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = await profileService.getProfileBySlug(slug);

  if (!business) return { title: 'Business Not Found | Locallify' };

  const coverUrl = profileService.getFileUrl(business.cover_id);

  return {
    title: `${business.business_name} | Locallify Profile`,
    description: business.bio,
    openGraph: {
      title: business.business_name,
      description: business.bio,
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: business.business_name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: business.business_name,
      description: business.bio,
      images: [coverUrl],
    },
  };
}

export default async function BusinessProfilePage({ params }: PageProps) {
  const { slug } = await params;
  
  if (!slug) {
    notFound();
  }

  const business = await profileService.getProfileBySlug(slug);

  if (!business) {
    notFound();
  }

  // Handle Inactive/Private State
  if (!business.is_active || !business.is_public) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-[#0066FF]/20 rounded-full blur-2xl animate-pulse"></div>
          <CheckCircle2 className="w-full h-full text-[#0066FF] relative z-10" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight uppercase">
          {business.business_name}
        </h1>
        <p className="text-zinc-400 max-w-md text-lg mb-8 leading-relaxed">
          {!business.is_active 
            ? "This business is currently inactive. Contact them directly or visit locallify.in"
            : "This business profile is currently undergoing verification by the Locallify team."}
        </p>
        <Link href="/">
          <Button className="bg-white text-black hover:bg-zinc-200 px-8 rounded-full font-bold transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
        </Link>
        <div className="mt-16 pt-8 border-t border-zinc-900 w-full max-w-xs text-xs text-zinc-600">
          POWERED BY LOCALLIFY.IN
        </div>
      </div>
    );
  }

  const logoUrl = profileService.getFileUrl(business.logo_id);
  const coverUrl = profileService.getFileUrl(business.cover_id);
  const status = getBusinessStatus(business.business_hours);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#0066FF]/30 overflow-x-hidden font-sans italic-font-none">
      <Toaster position="top-center" richColors />
      
      {/* ─── HERO SECTION ────────────────────────────────────────── */}
      <section className="relative h-[50vh] md:h-[65vh] w-full">
        <div className="absolute inset-0">
          <Image 
            src={coverUrl} 
            alt={business.business_name} 
            fill 
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]"></div>
          <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#050505] to-transparent"></div>
        </div>
        
        <div className="relative z-30 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="bg-black/40 backdrop-blur-xl border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition-all group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="flex gap-2">
            <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg ${status.isOpen ? 'bg-[#0066FF] text-white shadow-[#0066FF]/20' : 'bg-zinc-800 text-zinc-400'}`}>
              <Clock className={`w-4 h-4 ${status.isOpen ? 'animate-pulse' : ''}`} />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                {status.message}
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-md text-white border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Verified</span>
            </div>
          </div>
        </div>

        <div className="relative z-40 h-full max-w-7xl mx-auto px-6 pb-12 flex flex-col justify-end items-center text-center">
          <div className="relative shrink-0 mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0066FF] to-cyan-500 rounded-full blur opacity-30"></div>
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-black">
              <Image 
                src={logoUrl} 
                alt={business.business_name} 
                fill 
                className="object-cover" 
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              {business.business_name}
            </h1>
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
              <span className="text-[#0066FF] text-sm font-bold uppercase tracking-wider">{business.business_category}</span>
              <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
              <span className="text-zinc-400 text-sm font-medium">{business.full_address.split(',')[0]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ────────────────────────────────────────── */}
      <main className="relative z-30 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pb-32">
        
        {/* Left Column: About & Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-[40px] shadow-2xl space-y-8">
            <div className="space-y-4">
              <div className="h-1.5 w-16 bg-[#0066FF] rounded-full"></div>
              <h2 className="text-2xl font-black uppercase tracking-tight">About Us</h2>
              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-light">
                {business.bio}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/[0.03] border border-white/10 p-6 rounded-[30px] flex items-center gap-4">
                <div className="p-3 bg-[#0066FF]/10 rounded-xl">
                  <Clock className={`w-6 h-6 ${status.isOpen ? 'text-[#0066FF]' : 'text-zinc-500'}`} />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Timing Today</p>
                  <p className="text-zinc-200 font-bold">{business.business_hours}</p>
                </div>
              </div>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.full_address)}`}
                target="_blank"
                className="bg-white/[0.03] border border-white/10 p-6 rounded-[30px] flex items-center gap-4 group hover:bg-white/[0.06] transition-all"
              >
                <div className="p-3 bg-[#0066FF]/10 rounded-xl group-hover:bg-[#0066FF]/20 transition-all">
                  <MapPin className="w-6 h-6 text-[#0066FF]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Location</p>
                    <Navigation className="w-3 h-3 text-[#0066FF] opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                  <p className="text-zinc-200 font-bold truncate">{business.full_address}</p>
                </div>
              </a>
            </div>
          </div>

          <LeadForm 
            businessName={business.business_name} 
            whatsappNumber={business.whatsapp_number} 
            slug={business.slug}
          />
        </div>

        {/* Right Column: Actions & Socials */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 md:p-10 rounded-[40px] text-black space-y-8">
            <div>
              <h3 className="text-3xl font-black tracking-tighter leading-none mb-4 uppercase">
                Connect <br /> Directly
              </h3>
              <p className="text-zinc-500 font-medium leading-tight">
                Instantly reach out via call or WhatsApp for bookings and enquiries.
              </p>
            </div>
            
            <div className="space-y-3">
              <a 
                href={`https://wa.me/91${business.whatsapp_number}`} 
                target="_blank" 
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white p-5 rounded-2xl font-black hover:scale-[1.02] transition-all group"
              >
                <div className="relative w-6 h-6">
                  <Image src="/social-icons/whatsapp.png" alt="WhatsApp" fill sizes="24px" className="object-contain" />
                </div>
                WHATSAPP US
              </a>
              
              <a 
                href={`tel:${business.phone_number}`} 
                className="flex items-center justify-center gap-3 w-full bg-black text-white p-5 rounded-2xl font-black hover:scale-[1.02] transition-all"
              >
                <Phone className="w-6 h-6 fill-current" />
                VOICE CALL
              </a>
            </div>

            {(business.instagram_handle || business.facebook_page_link || business.google_review_link) && (
              <div className="pt-6 border-t border-zinc-100">
                <p className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.2em] mb-4 text-center">Follow & Review</p>
                <div className="flex justify-center gap-4">
                  {business.instagram_handle && (
                    <a href={`https://instagram.com/${business.instagram_handle}`} target="_blank" className="p-4 bg-zinc-50 rounded-2xl hover:bg-zinc-100 transition-all flex items-center justify-center">
                      <div className="relative w-6 h-6">
                        <Image src="/social-icons/instagram.png" alt="Instagram" fill sizes="24px" className="object-contain grayscale hover:grayscale-0 transition-all" />
                      </div>
                    </a>
                  )}
                  {business.facebook_page_link && (
                    <a href={business.facebook_page_link} target="_blank" className="p-4 bg-zinc-50 rounded-2xl hover:bg-zinc-100 transition-all">
                      <GlobeIcon className="w-6 h-6" />
                    </a>
                  )}
                  {business.google_review_link && (
                    <a href={business.google_review_link} target="_blank" className="p-4 bg-[#0066FF]/10 rounded-2xl hover:bg-[#0066FF]/20 transition-all text-[#0066FF]">
                      <Star className="w-6 h-6 fill-current" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-[40px] flex items-center gap-5">
            <div className="w-12 h-12 bg-[#0066FF]/10 rounded-full flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6 text-[#0066FF]" />
            </div>
            <p className="text-xs text-zinc-400 font-medium leading-relaxed uppercase tracking-tight">
              Official Digital Presence <br />
              <span className="text-white font-black tracking-widest">Powered by Locallify</span>
            </p>
          </div>
        </div>
      </main>

      {/* ─── FOOTER ────────────────────────────────────────────── */}
      <footer className="py-20 text-center border-t border-white/5 opacity-30 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black uppercase tracking-[0.6em]">
          Locallify · Digital Map for Local Business
        </p>
      </footer>
    </div>
  );
}
