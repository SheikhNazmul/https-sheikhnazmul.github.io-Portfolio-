"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { LogIn, Eye, EyeOff, Loader2, Mail, Lock, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      setError("ইমেইল এবং পাসওয়ার্ড দিন");
      return;
    }
    setLoading(true);
    setError("");

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("ইমেইল বা পাসওয়ার্ড ভুল");
      setLoading(false);
      return;
    }

    // Check role and redirect
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profile?.role === "admin") {
      window.location.href = "/admin/dashboard";
    } else if (profile?.role === "seller") {
      window.location.href = "/seller/dashboard";
    } else {
      window.location.href = "/shop";
    }

    setLoading(false);
  }

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* Background radial ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/5 blur-[120px] -z-10" />
      <div className="absolute top-1/3 left-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px] -z-10" />
      
      {/* Subtle grid mesh overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)]" />

      {/* Floating Home Back Button */}
      <Link 
        href="/shop" 
        className="absolute top-6 left-6 inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition duration-150 backdrop-blur-md"
      >
        <ArrowLeft size={13} />
        ফিরে যান
      </Link>

      <div className="relative w-full max-w-md bg-slate-900/30 border border-slate-800/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl shadow-emerald-500/5 z-10">
        
        {/* Logo and Greeting Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 mb-4 animate-pulse">
            <LogIn size={22} className="text-black" />
          </div>
          
          <h2 className="text-2xl font-black text-white tracking-tight">সাইন ইন করুন</h2>
          <p className="text-sm text-slate-400 mt-2">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-xs text-red-400 animate-in fade-in slide-in-from-top-1 duration-150">
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Controls */}
        <div className="space-y-5">
          {/* Email input field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ইমেইল ঠিকানা</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Mail size={16} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full rounded-xl bg-slate-950 border border-slate-800/80 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">পাসওয়ার্ড</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Lock size={16} />
              </span>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full rounded-xl bg-slate-950 border border-slate-800/80 pl-11 pr-12 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition duration-150"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Trigger */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-black shadow-lg shadow-emerald-500/10 hover:bg-emerald-400 hover:shadow-emerald-500/20 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                লগইন হচ্ছে...
              </>
            ) : (
              <>
                <LogIn size={16} />
                সাইন ইন করুন
              </>
            )}
          </button>
        </div>

        {/* Footer actions / Register links */}
        <div className="mt-8 border-t border-slate-800/60 pt-5 text-center text-xs text-slate-500">
          <span>অ্যাকাউন্ট নেই? </span>
          <Link href="/seller/register" className="text-emerald-400 font-semibold hover:text-emerald-300 transition duration-150">
            সেলার হিসেবে যোগ দিন
          </Link>
        </div>

      </div>
    </div>
  );
}
