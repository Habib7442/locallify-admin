'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { profileService } from '@/lib/appwrite-service';
import { useBusinessStore } from '@/lib/store';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { CheckCircle2, AlertCircle, Loader2, Sparkles, Image as ImageIcon, Globe, Phone, Clock, MapPin, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// ─── Schema ──────────────────────────────────────────────────────────────────
const formSchema = z.object({
  business_name:     z.string().min(2, 'Business name must be at least 2 characters.'),
  business_category: z.string().min(1, 'Please select a category.'),
  customCategory:    z.string().optional(),
  owner_name:        z.string().min(2, 'Owner name is required.'),
  email_address:     z.string().email('Please enter a valid email address.'),
  bio:               z.string().max(150, 'Bio must be under 150 characters.'),
  slug:              z
    .string()
    .min(3, 'Username must be at least 3 characters.')
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens allowed.'),
  whatsapp_number:   z.string().min(10, 'WhatsApp number must be at least 10 digits.'),
  phone_number:      z.string().min(10, 'Phone number must be at least 10 digits.'),
  full_address:      z.string().min(5, 'Full address is required.'),
  business_hours:    z.string().min(1, 'Please specify business hours.'),
  instagram_handle:  z.string().optional(),
  facebook_page_link: z.string().url('Invalid URL').or(z.literal('')).optional(),
  google_review_link: z.string().url('Invalid URL').or(z.literal('')).optional(),
});

type FormValues = z.infer<typeof formSchema>;

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = ['Fashion', 'Education', 'Health', 'Fitness', 'Restaurant', 'Salon', 'Other'];

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isSlugChecking, setIsSlugChecking] = useState(false);
  const [slugStatus, setSlugStatus] = useState<'idle' | 'available' | 'taken' | 'error'>('idle');

  const { addProfileToState } = useBusinessStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name:      '',
      business_category:  '',
      owner_name:         '',
      email_address:      '',
      bio:                '',
      slug:               '',
      whatsapp_number:    '',
      phone_number:       '',
      full_address:       '',
      business_hours:     '',
      instagram_handle:   '',
      facebook_page_link: '',
      google_review_link: '',
    },
  });

  const watchSlug = watch('slug');

  const checkSlug = async (slug: string) => {
    if (!slug || slug.length < 3) { setSlugStatus('idle'); return; }
    setIsSlugChecking(true);
    const status = await profileService.checkSlugAvailability(slug);
    setSlugStatus(status as 'idle' | 'available' | 'taken' | 'error');
    setIsSlugChecking(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (slugStatus === 'taken') {
      toast.error('This username is already taken.');
      return;
    }

    if (!logoFile || !coverFile) {
      toast.error('Logo and Cover photo are mandatory.');
      return;
    }

    try {
      setLoading(true);
      const finalCategory = values.business_category === 'Other' ? values.customCategory || 'Others' : values.business_category;

      const profileData = {
        ...values,
        business_category: finalCategory,
        slug: values.slug.toLowerCase(),
      };

      const newProfile = await profileService.createProfile(profileData as any, logoFile, coverFile);
      if (newProfile.is_public) addProfileToState(newProfile);

      toast.success('Registration Complete! Setting up your cinematic profile...');
      setTimeout(() => router.push(`/${newProfile.slug}`), 2000);
    } catch (err: any) {
      toast.error(err.message || 'Failed to register business.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#0066FF]/30">
      <Toaster position="top-center" richColors />
      
      <div className="max-w-3xl mx-auto space-y-12">
        {/* ─── HEADER ─── */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#0066FF] text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3 h-3" /> Locallify v2.0
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            Claim Your <span className="text-[#0066FF]">Digital Spotlight</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto font-medium">
            Join the elite businesses across India with a cinematic digital presence. Professional setup in 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* ─── BASIC IDENTITY ─── */}
          <div className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-[40px] shadow-2xl space-y-8">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#0066FF]" />
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500">Business Identity</h3>
            </div>

            <div className="grid gap-8">
              <div className="grid gap-3">
                <Label htmlFor="business_name" className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">Business Name</Label>
                <Input 
                  id="business_name" 
                  placeholder="e.g. The Trendy Salon" 
                  className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-[#0066FF] placeholder:text-zinc-700" 
                  {...register('business_name')} 
                />
                {errors.business_name && <p className="text-xs text-red-500 ml-1">{errors.business_name.message}</p>}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="slug" className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">Your Locallify URL</Label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-zinc-600 font-bold select-none">locallify.in/</span>
                  <Input
                    id="slug"
                    className="pl-[105px] bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-[#0066FF] placeholder:text-zinc-700"
                    placeholder="your-business"
                    {...register('slug')}
                    onBlur={(e) => checkSlug(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center px-1">
                  {isSlugChecking && <span className="text-[10px] text-zinc-500 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Checking availability...</span>}
                  {slugStatus === 'available' && <span className="text-[10px] text-[#0066FF] font-black uppercase tracking-widest flex items-center gap-1">Available!</span>}
                  {slugStatus === 'taken' && <span className="text-[10px] text-red-500 font-black uppercase tracking-widest flex items-center gap-1">Taken</span>}
                  <p className="text-[10px] text-zinc-600 font-medium">Use lowercase, numbers & hyphens only.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="grid gap-3">
                  <Label className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">Category</Label>
                  <Select onValueChange={(v) => { setValue('business_category', v); setShowCustomCategory(v === 'Other'); }}>
                    <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-[#0066FF]"><SelectValue placeholder="Select Industry" /></SelectTrigger>
                    <SelectContent className="bg-[#0c0c0c] border-white/10 text-white">
                      {CATEGORIES.map(c => <SelectItem key={c} value={c} className="focus:bg-[#0066FF] focus:text-white">{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {showCustomCategory && (
                    <Input placeholder="Specify Industry" className="bg-white/5 border-white/10 h-14 rounded-2xl mt-2" {...register('customCategory')} />
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="bio" className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">One Line Bio (Max 150)</Label>
                  <Input id="bio" placeholder="e.g. Best coffee shop in India since 2015" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-[#0066FF] placeholder:text-zinc-700" {...register('bio')} />
                </div>
              </div>
            </div>
          </div>

          {/* ─── OWNER & CONTACT ─── */}
          <div className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-[40px] shadow-2xl space-y-8">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#0066FF]" />
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500">Owner & Contact</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="grid gap-3">
                <Label htmlFor="owner_name" className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">Owner Name</Label>
                <Input id="owner_name" placeholder="Full Name" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-[#0066FF] placeholder:text-zinc-700" {...register('owner_name')} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email_address" className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">Email Address</Label>
                <Input id="email_address" type="email" placeholder="owner@email.com" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-[#0066FF] placeholder:text-zinc-700" {...register('email_address')} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="whatsapp_number" className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">WhatsApp Number</Label>
                <Input id="whatsapp_number" placeholder="9876543210" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-[#0066FF] placeholder:text-zinc-700" {...register('whatsapp_number')} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone_number" className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">Direct Call Number</Label>
                <Input id="phone_number" placeholder="9876543210" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-[#0066FF] placeholder:text-zinc-700" {...register('phone_number')} />
              </div>
            </div>
          </div>

          {/* ─── LOCATION & HOURS ─── */}
          <div className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-[40px] shadow-2xl space-y-8">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#0066FF]" />
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500">Location & Timing</h3>
            </div>

            <div className="grid gap-8">
              <div className="grid gap-3">
                <Label htmlFor="full_address" className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">Shop Address</Label>
                <Input id="full_address" placeholder="e.g. MG Road, Bengaluru, India" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-[#0066FF] placeholder:text-zinc-700" {...register('full_address')} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="business_hours" className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">Business Hours (Today)</Label>
                <Input id="business_hours" placeholder="e.g. 9:00 AM - 9:00 PM" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-[#0066FF] placeholder:text-zinc-700" {...register('business_hours')} />
                <p className="text-[10px] text-zinc-600 font-medium ml-1">Format: HH:MM AM - HH:MM PM (e.g. 10:00 AM - 8:30 PM)</p>
              </div>
            </div>
          </div>

          {/* ─── SOCIALS & REVIEWS ─── */}
          <div className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-[40px] shadow-2xl space-y-8">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-[#0066FF]" />
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500">Growth Links (Optional)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="grid gap-3">
                <Label htmlFor="instagram_handle" className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">Instagram Handle</Label>
                <Input id="instagram_handle" placeholder="@username" className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-[#0066FF] placeholder:text-zinc-700" {...register('instagram_handle')} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="google_review_link" className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">Google Review Link</Label>
                <Input id="google_review_link" placeholder="https://g.page/r/..." className="bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-[#0066FF] placeholder:text-zinc-700" {...register('google_review_link')} />
              </div>
            </div>
          </div>

          {/* ─── MEDIA ─── */}
          <div className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-[40px] shadow-2xl space-y-8">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-[#0066FF]" />
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500">Brand Assets</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">Business Logo</Label>
                <div className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all ${logoFile ? 'border-[#0066FF]/50 bg-[#0066FF]/5' : 'border-white/10 hover:border-white/20'}`}>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
                  <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${logoFile ? 'text-[#0066FF]' : 'text-zinc-700'}`} />
                  <p className="text-xs font-bold text-zinc-500">{logoFile ? logoFile.name : 'Click to upload logo'}</p>
                  <p className="text-[10px] text-zinc-600 mt-1">Transparent PNG works best.</p>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-xs font-black uppercase tracking-widest ml-1 text-zinc-400">Cover Image</Label>
                <div className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all ${coverFile ? 'border-[#0066FF]/50 bg-[#0066FF]/5' : 'border-white/10 hover:border-white/20'}`}>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} />
                  <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${coverFile ? 'text-[#0066FF]' : 'text-zinc-700'}`} />
                  <p className="text-xs font-bold text-zinc-500">{coverFile ? coverFile.name : 'Click to upload cover'}</p>
                  <p className="text-[10px] text-zinc-600 mt-1">High-res landscape image.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Button 
              type="submit" 
              className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-black py-10 rounded-[2.5rem] transition-all flex items-center justify-center gap-3 text-xl shadow-[0_20px_40px_rgba(0,102,255,0.2)] group" 
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                <>
                  START MY DIGITAL TRANSFORMATION
                  <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </>
              )}
            </Button>
            <p className="text-center text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-6">
              ₹499 Setup Fee · thereafter ₹999/month subscription to remain active · 24h Delivery
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
