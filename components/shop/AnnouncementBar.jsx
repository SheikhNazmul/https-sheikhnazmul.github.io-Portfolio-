"use client";

import { useState } from "react";
import { useShop } from "./ShopContext";
import { Sparkles, X, CheckCircle } from "lucide-react";

export default function AnnouncementBar() {
  const { seller } = useShop();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative z-50 overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-900/30 py-2 px-4 text-center">
      {/* Glow micro-animation backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,167,0.05),transparent_60%)] animate-pulse" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 text-xs md:text-sm font-medium text-emerald-300">
        <Sparkles size={14} className="text-emerald-400 shrink-0 animate-bounce" />
        
        {seller ? (
          <span className="flex items-center gap-1.5">
            You are shopping from
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-semibold text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <CheckCircle size={10} className="text-emerald-400" />
              {seller.brand_name || seller.full_name}
            </span>
            's store (Verified Partner)
          </span>
        ) : (
          <span>🎉 Special Offer: Enjoy Free Shipping on orders over ৳1,000! Cash on Delivery available.</span>
        )}

        <button 
          onClick={() => setVisible(false)} 
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded p-1 text-emerald-500/70 hover:bg-emerald-500/10 hover:text-emerald-400 transition duration-150"
          aria-label="Close Announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
