"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { Check, Loader2, Store, Eye, EyeOff, ArrowRight, ShoppingBag, TrendingUp, Users, Star } from "lucide-react";

export default function RetailerRegisterPage() {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const [generatedCode, setGeneratedCode] = useState("");

  const [form, setForm] = useState({
    full_name: "", phone: "", email: "", password: "",
    brand_name: "", brand_logo_url: "", business_type: "individual", trade_license: "",
  });

  const BENEFITS = [
    { icon: <TrendingUp size={18} color="#2563EB" />, title: "Higher Commission", desc: "Earn up to 25% commission on every sale" },
    { icon: <ShoppingBag size={18} color="#059669" />, title: "Exclusive Products", desc: "Access to premium & exclusive product catalog" },
    { icon: <Users size={18} color="#7C3AED" />, title: "Priority Support", desc: "Dedicated account manager & 24/7 support" },
    { icon: <Star size={18} color="#D97706" />, title: "Verified Badge", desc: "Get a verified retailer badge on your store" },
  ];

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: null }));
  }

  function generateReferralCode(name) {
    const base = name.replace(/\s+/g, "").toUpperCase().slice(0, 6);
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `RTL-${base}${rand}`;
  }

  function validateStep1() {
    const e = {};
    if (!form.full_name.trim()) e.full_name = "Full name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email is required";
    if (!form.password || form.password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e = {};
    if (!form.brand_name.trim()) e.brand_name = "Brand/Business name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function nextStep() { if (validateStep1()) setStep(2); }

  async function handleSubmit() {
    if (!validateStep2()) return;
    setLoading(true);
    setServerError("");

    const { data: authData, error: authError } = await supabase.auth.signUp({ email: form.email, password: form.password });
    if (authError) { setServerError(authError.message); setLoading(false); return; }

    const userId = authData.user?.id;
    if (!userId) { setServerError("Signup failed. Please try again."); setLoading(false); return; }

    const referral_code = generateReferralCode(form.brand_name);
    setGeneratedCode(referral_code);

    const { error: profileError } = await supabase.from("profiles").insert({
      id: userId, full_name: form.full_name, phone: form.phone,
      role: "seller", brand_name: form.brand_name,
      brand_logo_url: form.brand_logo_url || null,
      referral_code, seller_status: "pending",
    });

    if (profileError) { setServerError(profileError.message); setLoading(false); return; }
    await supabase.from("wallets").insert({ seller_id: userId, balance: 0 });
    setLoading(false);
    setDone(true);
  }

  const inputStyle = (hasError) => ({
    width: "100%", padding: "11px 14px",
    border: `1.5px solid ${hasError ? "#EF4444" : "#E5E7EB"}`,
    borderRadius: 8, fontSize: 14, outline: "none",
    boxSizing: "border-box", color: "#111827", fontFamily: "inherit",
  });

  if (done) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", background: "#F9FAFB", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#ECFDF5", border: "2px solid #6EE7B7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Check size={32} color="#059669" />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 10 }}>Application Submitted! 🎉</h2>
          <p style={{ color: "#6B7280", fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
            Your retailer account is under review. We will notify you at <strong>{form.email}</strong> within 24-48 hours.
          </p>
          <div style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <p style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 6, fontWeight: 600 }}>YOUR RETAILER CODE</p>
            <p style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 800, color: "#2563EB", letterSpacing: 2, marginBottom: 6 }}>{generatedCode}</p>
            <p style={{ fontSize: 12, color: "#9CA3AF" }}>Share this with customers to track your sales and earn commission</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a href="/auth/login" style={{ flex: 1, padding: "12px 0", background: "white", border: "1px solid #E5E7EB", borderRadius: 10, fontWeight: 600, fontSize: 14, color: "#374151", textDecoration: "none", textAlign: "center" }}>Sign In</a>
            <a href="/shop" style={{ flex: 1, padding: "12px 0", background: "#2563EB", borderRadius: 10, fontWeight: 700, fontSize: 14, color: "white", textDecoration: "none", textAlign: "center" }}>Browse Products</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#F9FAFB", minHeight: "100vh", color: "#111827" }}>
      {/* Header */}
      <header style={{ background: "white", borderBottom: "1px solid #E5E7EB", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShoppingBag size={16} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#111827" }}>ShopBD</span>
          <span style={{ fontSize: 11, background: "#EFF6FF", color: "#2563EB", padding: "2px 8px", borderRadius: 20, fontWeight: 700, marginLeft: 4, letterSpacing: 0.5 }}>RETAILER PROGRAM</span>
        </div>
        <a href="/auth/login" style={{ fontSize: 13, color: "#6B7280", textDecoration: "none" }}>
          Already registered? <span style={{ color: "#2563EB", fontWeight: 600 }}>Sign in</span>
        </a>
      </header>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>

        {/* LEFT — Benefits */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", background: "#EFF6FF", padding: "4px 12px", borderRadius: 20, letterSpacing: 1 }}>JOIN OUR NETWORK</span>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: "#111827", margin: "14px 0 10px", lineHeight: 1.15, letterSpacing: "-0.5px" }}>
            Become a Retailer<br />& Grow Faster
          </h1>
          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, marginBottom: 28 }}>
            Join thousands of retailers earning commissions by selling our premium products under their own brand. No inventory, no hassle — we handle fulfilment.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {BENEFITS.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: 16, background: "white", border: "1px solid #E5E7EB", borderRadius: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "#F9FAFB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{b.icon}</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 2 }}>{b.title}</p>
                  <p style={{ fontSize: 13, color: "#6B7280" }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[{ value: "5,000+", label: "Active Retailers" }, { value: "25%", label: "Max Commission" }, { value: "48hr", label: "Approval Time" }].map((s, i) => (
              <div key={i} style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 10, padding: "14px 10px", textAlign: "center" }}>
                <p style={{ fontSize: 22, fontWeight: 800, color: "#2563EB", marginBottom: 2 }}>{s.value}</p>
                <p style={{ fontSize: 11, color: "#9CA3AF" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Form */}
        <div>
          {/* Step Bar */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
            {[1, 2].map((n, i) => (
              <div key={n} style={{ display: "flex", alignItems: "center", flex: i === 0 ? 1 : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, background: step > n ? "#2563EB" : step === n ? "#EFF6FF" : "#F9FAFB", border: `2px solid ${step >= n ? "#2563EB" : "#E5E7EB"}`, color: step > n ? "white" : step === n ? "#2563EB" : "#9CA3AF" }}>
                    {step > n ? <Check size={13} /> : n}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: step === n ? 700 : 400, color: step === n ? "#2563EB" : "#9CA3AF" }}>
                    {n === 1 ? "Account" : "Business"}
                  </span>
                </div>
                {i === 0 && <div style={{ flex: 1, height: 1, background: step > 1 ? "#2563EB" : "#E5E7EB", margin: "0 10px" }} />}
              </div>
            ))}
          </div>

          <div style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: 16, padding: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 4 }}>
              {step === 1 ? "Create your account" : "Business details"}
            </h2>
            <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 22 }}>Step {step} of 2</p>

            {serverError && (
              <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "12px 14px", color: "#991B1B", fontSize: 13, marginBottom: 18 }}>
                {serverError}
              </div>
            )}

            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { field: "full_name", label: "Full Name", placeholder: "Your full name", type: "text" },
                  { field: "phone", label: "Phone Number", placeholder: "01XXXXXXXXX", type: "tel" },
                  { field: "email", label: "Email Address", placeholder: "you@example.com", type: "email" },
                ].map(({ field, label, placeholder, type }) => (
                  <div key={field}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label}</label>
                    <input type={type} value={form[field]} onChange={e => update(field, e.target.value)} placeholder={placeholder} style={inputStyle(errors[field])} />
                    {errors[field] && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 3 }}>{errors[field]}</p>}
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPass ? "text" : "password"} value={form.password} onChange={e => update("password", e.target.value)} placeholder="Min. 6 characters" style={{ ...inputStyle(errors.password), paddingRight: 44 }} />
                    <button onClick={() => setShowPass(!showPass)} type="button" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF" }}>
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 3 }}>{errors.password}</p>}
                </div>
                <button onClick={nextStep} style={{ width: "100%", padding: "13px 0", background: "#2563EB", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Business Type</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[{ v: "individual", l: "Individual" }, { v: "company", l: "Company" }].map(opt => (
                      <button key={opt.v} type="button" onClick={() => update("business_type", opt.v)}
                        style={{ flex: 1, padding: "10px 0", border: `1.5px solid ${form.business_type === opt.v ? "#2563EB" : "#E5E7EB"}`, borderRadius: 8, background: form.business_type === opt.v ? "#EFF6FF" : "white", color: form.business_type === opt.v ? "#2563EB" : "#6B7280", fontWeight: form.business_type === opt.v ? 700 : 400, fontSize: 14, cursor: "pointer" }}>
                        {opt.l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Brand / Business Name *</label>
                  <input type="text" value={form.brand_name} onChange={e => update("brand_name", e.target.value)} placeholder="e.g. NiR Enterprise" style={inputStyle(errors.brand_name)} />
                  {errors.brand_name && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 3 }}>{errors.brand_name}</p>}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Brand Logo URL <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span></label>
                  <input type="text" value={form.brand_logo_url} onChange={e => update("brand_logo_url", e.target.value)} placeholder="https://your-logo.com/logo.png" style={inputStyle(false)} />
                </div>
                {form.business_type === "company" && (
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 5 }}>Trade License <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span></label>
                    <input type="text" value={form.trade_license} onChange={e => update("trade_license", e.target.value)} placeholder="Trade license number" style={inputStyle(false)} />
                  </div>
                )}
                {form.brand_name && (
                  <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 10, padding: "12px 16px" }}>
                    <p style={{ fontSize: 11, color: "#3B82F6", marginBottom: 4, fontWeight: 700 }}>YOUR RETAILER CODE PREVIEW</p>
                    <p style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 800, color: "#1D4ED8" }}>{generateReferralCode(form.brand_name)}</p>
                  </div>
                )}
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: "13px 0", background: "white", border: "1px solid #E5E7EB", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer", color: "#374151" }}>← Back</button>
                  <button onClick={handleSubmit} disabled={loading} style={{ flex: 2, padding: "13px 0", background: loading ? "#9CA3AF" : "#2563EB", color: "white", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    {loading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Submitting...</> : <><Check size={16} /> Submit Application</>}
                  </button>
                </div>
              </div>
            )}
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF", marginTop: 14 }}>
            By registering, you agree to our <a href="#" style={{ color: "#2563EB" }}>Terms & Conditions</a>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
