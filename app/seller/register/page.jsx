"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { Check, Loader2, Store, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function SellerRegisterPage() {
  const [step, setStep] = useState(1); // 1 = account info, 2 = brand info
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    password: "",
    brand_name: "",
    brand_logo_url: "",
  });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  }

  function generateReferralCode(name) {
    const base = name.replace(/\s+/g, "").toUpperCase().slice(0, 6);
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `${base}${rand}`;
  }

  function validateStep1() {
    const e = {};
    if (!form.full_name.trim()) e.full_name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email is required";
    if (!form.password || form.password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e = {};
    if (!form.brand_name.trim()) e.brand_name = "Brand name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function nextStep() {
    if (validateStep1()) setStep(2);
  }

  async function handleSubmit() {
    if (!validateStep2()) return;
    setLoading(true);
    setServerError("");

    // 1. Supabase Auth signup
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (authError) {
      setServerError(authError.message);
      setLoading(false);
      return;
    }

    const userId = authData.user?.id;
    if (!userId) {
      setServerError("Signup failed. Please try again.");
      setLoading(false);
      return;
    }

    // 2. Insert into profiles table
    const referral_code = generateReferralCode(form.brand_name);

    const { error: profileError } = await supabase.from("profiles").insert({
      id: userId,
      full_name: form.full_name,
      phone: form.phone,
      role: "seller",
      brand_name: form.brand_name,
      brand_logo_url: form.brand_logo_url || null,
      referral_code,
      seller_status: "pending",
    });

    if (profileError) {
      setServerError(profileError.message);
      setLoading(false);
      return;
    }

    // 3. Create wallet for seller
    await supabase.from("wallets").insert({ seller_id: userId, balance: 0 });

    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#0F1115] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-[#2DD4A7]/15 border border-[#2DD4A7]/30 flex items-center justify-center mx-auto mb-5">
            <Check size={28} className="text-[#2DD4A7]" />
          </div>
          <h2 className="text-xl font-semibold text-[#E7E9EC] mb-2">Application submitted!</h2>
          <p className="text-[#8B919C] text-sm leading-relaxed">
            Your seller account is under review. We'll notify you at{" "}
            <span className="text-[#E7E9EC]">{form.email}</span> once approved.
          </p>
          <div className="mt-6 px-4 py-3 bg-[#161922] border border-[#2A2E37] rounded-lg text-left">
            <p className="text-xs text-[#5A5F6A] mb-1">Your referral code</p>
            <p className="text-[#2DD4A7] font-mono font-medium tracking-widest text-lg">
              {generateReferralCode(form.brand_name)}
            </p>
            <p className="text-xs text-[#5A5F6A] mt-1">Share this with customers to track your sales</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#E7E9EC] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-lg bg-[#2DD4A7] flex items-center justify-center shrink-0">
            <Store size={18} className="text-[#0F1115]" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Become a seller</h1>
            <p className="text-sm text-[#8B919C]">Start earning commissions on every sale</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          <StepDot num={1} active={step === 1} done={step > 1} label="Account" />
          <div className="flex-1 h-px bg-[#2A2E37]" />
          <StepDot num={2} active={step === 2} done={false} label="Brand" />
        </div>

        {serverError && (
          <div className="mb-5 px-4 py-3 rounded-lg bg-[#FF6B5E]/10 border border-[#FF6B5E]/40 text-[#FF6B5E] text-sm">
            {serverError}
          </div>
        )}

        {/* Step 1 — Account Info */}
        {step === 1 && (
          <div className="space-y-4">
            <Field label="Full name" error={errors.full_name}>
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => update("full_name", e.target.value)}
                placeholder="Sheikh Nazmul"
                className={inputClass(errors.full_name)}
              />
            </Field>

            <Field label="Phone number" error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="01XXXXXXXXX"
                className={inputClass(errors.phone)}
              />
            </Field>

            <Field label="Email address" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                className={inputClass(errors.email)}
              />
            </Field>

            <Field label="Password" error={errors.password}>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Min. 6 characters"
                  className={inputClass(errors.password) + " pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A5F6A] hover:text-[#8B919C]"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            <button
              onClick={nextStep}
              className="w-full mt-2 py-3 rounded-lg bg-[#2DD4A7] text-[#0F1115] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#27BD93] transition-colors"
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2 — Brand Info */}
        {step === 2 && (
          <div className="space-y-4">
            <Field label="Brand name" error={errors.brand_name}>
              <input
                type="text"
                value={form.brand_name}
                onChange={(e) => update("brand_name", e.target.value)}
                placeholder="e.g. NiR Shop"
                className={inputClass(errors.brand_name)}
              />
            </Field>

            <Field label="Brand logo URL" optional>
              <input
                type="text"
                value={form.brand_logo_url}
                onChange={(e) => update("brand_logo_url", e.target.value)}
                placeholder="https://your-logo-url.com/logo.png"
                className={inputClass(false)}
              />
            </Field>

            {/* Preview */}
            {form.brand_name && (
              <div className="px-4 py-3 bg-[#161922] border border-[#2A2E37] rounded-lg">
                <p className="text-xs text-[#5A5F6A] mb-2">Your referral code will be</p>
                <p className="text-[#2DD4A7] font-mono font-medium tracking-widest">
                  {generateReferralCode(form.brand_name)}
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-lg border border-[#2A2E37] text-[#8B919C] text-sm hover:border-[#3A3F4A] transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-[#2DD4A7] text-[#0F1115] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#27BD93] transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                ) : (
                  <><Check size={16} /> Submit application</>
                )}
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-[#5A5F6A] mt-6">
          Already a seller?{" "}
          <a href="/auth/login" className="text-[#2DD4A7] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

function StepDot({ num, active, done, label }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
          done
            ? "bg-[#2DD4A7] text-[#0F1115]"
            : active
            ? "bg-[#2DD4A7]/20 border border-[#2DD4A7] text-[#2DD4A7]"
            : "bg-[#1B1E25] border border-[#2A2E37] text-[#5A5F6A]"
        }`}
      >
        {done ? <Check size={13} /> : num}
      </div>
      <span className={`text-xs ${active ? "text-[#E7E9EC]" : "text-[#5A5F6A]"}`}>{label}</span>
    </div>
  );
}

function Field({ label, children, error, optional }) {
  return (
    <div>
      <label className="block text-sm text-[#8B919C] mb-1.5">
        {label}
        {optional && <span className="text-[#5A5F6A]"> (optional)</span>}
      </label>
      {children}
      {error && <p className="text-xs text-[#FF6B5E] mt-1">{error}</p>}
    </div>
  );
}

function inputClass(hasError) {
  return `w-full px-3 py-2.5 rounded-lg bg-[#1B1E25] border text-sm text-[#E7E9EC] placeholder:text-[#5A5F6A] outline-none transition-colors ${
    hasError ? "border-[#FF6B5E]" : "border-[#2A2E37] focus:border-[#2DD4A7]"
  }`;
}
