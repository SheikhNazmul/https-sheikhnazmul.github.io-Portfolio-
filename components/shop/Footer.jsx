"use client";

import Link from "next/link";
import { Store, ShieldCheck, Mail, PhoneCall, HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-slate-400 text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1 - Brand Info */}
          <div className="space-y-4">
            <Link href="/shop" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-lg font-bold text-black shadow-md shadow-emerald-500/10">
                NC
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">Nexcart</h2>
            </Link>
            
            <p className="text-xs leading-relaxed text-slate-500 mt-2">
              Nexcart is Bangladesh's leading reseller platform connecting independent resellers with top-grade wholesalers. Shop high-quality, verified products at unmatched prices.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>100% Secure Checkout</span>
            </div>
          </div>

          {/* Column 2 - Quick links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/shop" className="hover:text-emerald-400 transition">Shop Catalog</Link>
              </li>
              <li>
                <Link href="/seller/register" className="hover:text-emerald-400 transition">Become a Seller</Link>
              </li>
              <li>
                <Link href="/seller/dashboard" className="hover:text-emerald-400 transition">Seller Center</Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-emerald-400 transition">Login / Register</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Product Categories */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="cursor-pointer hover:text-emerald-400 transition">Electronics</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-emerald-400 transition">Fashion & Accessories</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-emerald-400 transition">Home & Living</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-emerald-400 transition">Beauty & Cosmetics</span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact / Support */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Help & Support</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <PhoneCall size={14} className="text-emerald-400 shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-emerald-400 shrink-0" />
                <span>support@nexcart.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HelpCircle size={14} className="text-emerald-400 shrink-0" />
                <span>24/7 Live Agent Support</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower footer section */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Nexcart. All rights reserved. Built with pride in Bangladesh.
          </p>

          {/* Payment icons representation in clean, styled text tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-slate-900 px-2.5 py-1 text-[10px] font-bold text-slate-400 border border-slate-800">
              bKash
            </span>
            <span className="rounded bg-slate-900 px-2.5 py-1 text-[10px] font-bold text-slate-400 border border-slate-800">
              Nagad
            </span>
            <span className="rounded bg-slate-900 px-2.5 py-1 text-[10px] font-bold text-slate-400 border border-slate-800">
              COD
            </span>
            <span className="rounded bg-slate-900 px-2.5 py-1 text-[10px] font-bold text-slate-400 border border-slate-800">
              Visa
            </span>
            <span className="rounded bg-slate-900 px-2.5 py-1 text-[10px] font-bold text-slate-400 border border-slate-800">
              MasterCard
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
