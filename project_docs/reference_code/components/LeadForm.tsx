'use client';

import { useState } from 'react';
import { MessageCircle, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface LeadFormProps {
  businessName: string;
  whatsappNumber: string;
  slug: string;
}

export default function LeadForm({ businessName, whatsappNumber, slug }: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean phone number (remove spaces, dashes, and handle 91 prefix)
      let cleanNumber = whatsappNumber.replace(/\D/g, '');
      if (cleanNumber.length === 10) cleanNumber = `91${cleanNumber}`;
      if (cleanNumber.length === 12 && !cleanNumber.startsWith('91')) {
         // Fallback if it's already 12 digits but not 91, we assume it's wrong and keep as is or alert
      }

      const waMessage = `🚀 *NEW ENQUIRY — ${businessName.toUpperCase()}*\n━━━━━━━━━━━━━━━━\n👤 *Customer:* ${formData.name}\n📞 *Phone:* ${formData.phone}\n💬 *Message:* ${formData.message}\n\n🔗 *Via Your Page:* locallify.in/${slug}\n🕐 *Received:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}\n━━━━━━━━━━━━━━━━\n_Powered by Locallify.in_`;

      const waLink = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(waMessage)}`;
      
      // Open WhatsApp
      window.open(waLink, '_blank');
      
      toast.success('Opening WhatsApp…');
      // Reset form
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[40px] shadow-2xl space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#0066FF] text-[10px] font-black uppercase tracking-widest">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse"></div>
          Direct WhatsApp
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-none">
          Send Enquiry
        </h3>
        <p className="text-zinc-400 text-sm font-medium leading-relaxed">
          The owner of <span className="text-white font-bold">{businessName}</span> will receive your message instantly on WhatsApp.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="lead-name" className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Full Name</Label>
          <Input 
            id="lead-name"
            required
            placeholder="e.g. Rahul Sharma"
            className="bg-white/5 border-white/10 text-white rounded-2xl h-14 focus:ring-[#0066FF] focus:border-[#0066FF] transition-all placeholder:text-zinc-600"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-phone" className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Phone Number</Label>
          <Input 
            id="lead-phone"
            required
            type="tel"
            placeholder="9876543210"
            className="bg-white/5 border-white/10 text-white rounded-2xl h-14 focus:ring-[#0066FF] focus:border-[#0066FF] transition-all placeholder:text-zinc-600"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-message" className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">How can they help you?</Label>
          <Textarea 
            id="lead-message"
            required
            placeholder="I'm interested in your services..."
            className="bg-white/5 border-white/10 text-white rounded-2xl min-h-[120px] focus:ring-[#0066FF] focus:border-[#0066FF] transition-all placeholder:text-zinc-600 resize-none"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-black py-8 rounded-[2rem] transition-all flex items-center justify-center gap-3 text-lg shadow-[0_10px_30px_rgba(0,102,255,0.3)]"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              CONNECT VIA WHATSAPP
              <Send className="w-5 h-5" />
            </>
          )}
        </Button>
      </form>
      <p className="text-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
        Secure · Instant · No Spam
      </p>
    </div>
  );
}
