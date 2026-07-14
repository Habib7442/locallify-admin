"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/sanity-service";
import { signupAction } from "@/lib/server/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
    UserIcon,
    LockPasswordIcon, 
    Mail01Icon, 
    Loading01Icon,
    ArrowRight01Icon,
    SecurityCheckIcon
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (user) {
                    router.push("/");
                }
            } catch (error) {
                // Not logged in
            } finally {
                setIsCheckingSession(false);
            }
        };
        checkSession();
    }, [router]);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData(e.currentTarget);
        
        try {
            const result = await signupAction(formData);
            
            if (result.success) {
                toast.success("Account created! Welcome to Locallify Elite.");
                router.push("/");
                router.refresh();
            } else {
                toast.error(result.error || "Signup failed");
            }
        } catch (error: any) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    if (isCheckingSession) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <HugeiconsIcon icon={Loading01Icon} className="animate-spin text-[#0066FF]" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
            
            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-[#0066FF] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/20 -rotate-3">
                        <span className="text-white font-black text-3xl italic">L</span>
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic mb-2">
                        Create <span className="text-[#0066FF]">Account</span>
                    </h1>
                    <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em]">
                        Join the Locallify Elite Network
                    </p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-[40px] p-10 shadow-2xl">
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-zinc-400 font-black uppercase text-[10px] tracking-widest ml-1">Full Name</Label>
                            <div className="relative group">
                                <HugeiconsIcon icon={UserIcon} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#0066FF] transition-colors" size={20} />
                                <Input 
                                    name="name"
                                    type="text" 
                                    placeholder="John Doe"
                                    className="h-14 bg-white/5 border-white/5 rounded-2xl pl-12 pr-4 text-white font-bold placeholder:text-zinc-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-400 font-black uppercase text-[10px] tracking-widest ml-1">Email Address</Label>
                            <div className="relative group">
                                <HugeiconsIcon icon={Mail01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#0066FF] transition-colors" size={20} />
                                <Input 
                                    name="email"
                                    type="email" 
                                    placeholder="admin@locallify.com"
                                    className="h-14 bg-white/5 border-white/5 rounded-2xl pl-12 pr-4 text-white font-bold placeholder:text-zinc-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-400 font-black uppercase text-[10px] tracking-widest ml-1">Secure Password</Label>
                            <div className="relative group">
                                <HugeiconsIcon icon={LockPasswordIcon} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-[#0066FF] transition-colors" size={20} />
                                <Input 
                                    name="password"
                                    type="password" 
                                    placeholder="••••••••"
                                    minLength={8}
                                    className="h-14 bg-white/5 border-white/5 rounded-2xl pl-12 pr-4 text-white font-bold placeholder:text-zinc-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full h-14 bg-[#0066FF] hover:bg-[#0052CC] text-white font-black rounded-2xl text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all active:scale-95 group"
                        >
                            {isLoading ? (
                                <HugeiconsIcon icon={Loading01Icon} className="animate-spin" size={20} />
                            ) : (
                                <div className="flex items-center gap-2">
                                    Initialize Access
                                    <HugeiconsIcon icon={ArrowRight01Icon} className="group-hover:translate-x-1 transition-transform" size={18} />
                                </div>
                            )}
                        </Button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                            Already registered? <Link href="/login" className="text-[#0066FF] hover:underline">Login Securely</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-zinc-600 font-bold uppercase text-[9px] tracking-widest">
                    <HugeiconsIcon icon={SecurityCheckIcon} size={14} className="text-zinc-700" />
                    SSR Secure Registration Protocol Active
                </div>
            </div>
        </div>
    );
}
