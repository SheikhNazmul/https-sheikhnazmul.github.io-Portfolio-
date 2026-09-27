"use client";

import { ArrowRight, ShoppingBag, Truck, ShieldCheck, HelpCircle } from "lucide-react";

export default function HeroSection() {
  const scrollToProducts = () => {
    const el = document.getElementById("product-grid-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28">
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.1),transparent_60%)]" />
      <div className="absolute top-1/4 left-1/10 h-72 w-72 rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/10 h-72 w-72 rounded-full bg-cyan-500/5 blur-[120px]" />
      
      {/* Subtle grid mesh overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column Text */}
          <div className="space-y-6 lg:col-span-7 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-semibold text-emerald-400">
              <ShoppingBag size={12} className="animate-pulse" />
              <span>Nexcart Premium Marketplace</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Discover Premium Products, <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                Delivered with Care
              </span>
            </h1>

            <p className="mx-auto max-w-2xl lg:mx-0 text-base sm:text-lg text-slate-400 leading-relaxed">
              Shop high-quality tech gadgets, fashion accessories, home essentials, and more. 
              Enjoy unmatched discounts, fast delivery across Bangladesh, and hassle-free return support.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={scrollToProducts}
                className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-bold text-black shadow-lg shadow-emerald-500/25 transition duration-200 hover:bg-emerald-400 hover:shadow-emerald-500/30"
              >
                Start Shopping
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              
              <a
                href="/seller/register"
                className="flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-8 py-4 font-semibold text-white backdrop-blur-md transition duration-200 hover:border-slate-500 hover:bg-slate-900"
              >
                Become a Seller
              </a>
            </div>

          </div>

          {/* Right Column Visual (Premium Mockup SVG) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-2xl shadow-emerald-500/5 group">
              {/* Outer neon glow on hover */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-10 blur-xl transition group-hover:opacity-20" />
              
              {/* Mockup Graphic */}
              <svg viewBox="0 0 400 400" className="w-full h-full text-slate-800" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Floating Spheres */}
                <circle cx="100" cy="120" r="30" fill="url(#sphereGlow1)" className="animate-bounce" style={{ animationDuration: '6s' }} />
                <circle cx="310" cy="270" r="45" fill="url(#sphereGlow2)" className="animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }} />
                
                {/* Geometric lines */}
                <path d="M 50,200 Q 200,50 350,200" stroke="url(#lineGlow)" strokeWidth="2" strokeDasharray="5,5" />
                
                {/* Card representation */}
                <rect x="80" y="140" width="240" height="150" rx="16" fill="#1E293B" stroke="#334155" strokeWidth="2" fillOpacity="0.8" className="backdrop-blur" />
                <rect x="100" y="165" width="48" height="32" rx="6" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="1" />
                
                {/* SVG Shopping Cart icon */}
                <path d="M 108,181 H 116 L 122,171 H 138 L 142,181" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="120" cy="189" r="2.5" fill="#3B82F6" />
                <circle cx="134" cy="189" r="2.5" fill="#3B82F6" />
                
                <rect x="164" y="165" width="120" height="10" rx="3" fill="#475569" />
                <rect x="164" y="181" width="80" height="8" rx="3" fill="#64748B" />
                
                {/* Ratings block */}
                <rect x="100" y="220" width="200" height="1" rx="0.5" fill="#334155" />
                <circle cx="112" cy="245" r="12" fill="#10B981" />
                {/* Check */}
                <path d="M 107,245 L 110,248 L 117,242" stroke="#0F1115" strokeWidth="2" strokeLinecap="round" />
                <rect x="136" y="235" width="100" height="8" rx="3" fill="#10B981" fillOpacity="0.15" />
                <rect x="136" y="247" width="60" height="6" rx="2" fill="#475569" />

                {/* Defs for gradients */}
                <defs>
                  <linearGradient id="sphereGlow1" x1="100" y1="90" x2="100" y2="150" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#10B981" />
                    <stop offset="1" stopColor="#047857" />
                  </linearGradient>
                  <linearGradient id="sphereGlow2" x1="310" y1="225" x2="310" y2="315" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#06B6D4" />
                    <stop offset="1" stopColor="#0891B2" />
                  </linearGradient>
                  <linearGradient id="lineGlow" x1="50" y1="125" x2="350" y2="125" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#10B981" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#10B981" />
                    <stop offset="1" stopColor="#06B6D4" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

        </div>

        {/* Feature Tags Grid */}
        <div className="mt-16 sm:mt-24 border-t border-slate-900 pt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            
            <div className="flex items-start gap-4 rounded-2xl border border-slate-900 bg-slate-950 p-5 transition hover:border-slate-800">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Super Fast Delivery</h3>
                <p className="mt-1 text-sm text-slate-400">Doorstep delivery across Bangladesh in 48-72 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-900 bg-slate-950 p-5 transition hover:border-slate-800">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Secure Cash on Delivery</h3>
                <p className="mt-1 text-sm text-slate-400">Pay only when you receive and check the item.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-900 bg-slate-950 p-5 transition hover:border-slate-800">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <HelpCircle size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">24/7 Dedicated Support</h3>
                <p className="mt-1 text-sm text-slate-400">Always here to help with returns, refunds, or support.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
