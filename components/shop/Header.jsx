"use client";

import Link from "next/link";
import { useState } from "react";
import { useShop } from "./ShopContext";
import CartDrawer from "./CartDrawer";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingCart,
  User,
  Store,
} from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { 
    cart, 
    wishlist, 
    setIsCartOpen, 
    searchQuery, 
    setSearchQuery,
    seller 
  } = useShop();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/shop" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-xl font-bold text-black shadow-md shadow-emerald-500/10">
            NC
          </div>

          <div>
            <h1 className="text-xl font-bold text-white leading-tight">
              Nexcart
            </h1>

            <p className="text-xs text-slate-400">
              {seller ? `${seller.brand_name || seller.full_name}'s Store` : "Premium Marketplace"}
            </p>
          </div>
        </Link>

        {/* Search */}
        <div className="mx-8 hidden flex-1 lg:block">
          <div className="flex overflow-hidden rounded-xl border border-slate-700 bg-slate-900 focus-within:border-emerald-500 transition duration-150">

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent px-5 py-3 text-white outline-none placeholder:text-slate-500 text-sm"
            />

            <button className="bg-emerald-500 px-6 transition hover:bg-emerald-400">
              <Search size={18} className="text-black" />
            </button>

          </div>
        </div>

        {/* Desktop Icons */}
        <div className="hidden items-center gap-5 lg:flex">

          <Link
            href="/seller"
            title="Seller Center"
            className="rounded-xl border border-slate-700 p-3 transition hover:border-emerald-500 bg-slate-900/40 hover:bg-slate-900"
          >
            <Store className="text-white" size={18} />
          </Link>

          <button 
            className="relative rounded-xl border border-slate-700 p-3 transition hover:border-red-500 bg-slate-900/40 hover:bg-slate-900"
            title="Wishlist"
          >
            <Heart className="text-white" size={18} />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-pulse">
                {wishlist.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative rounded-xl border border-slate-700 p-3 transition hover:border-emerald-500 bg-slate-900/40 hover:bg-slate-900"
            title="Shopping Cart"
          >
            <ShoppingCart className="text-white" size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                {cartCount}
              </span>
            )}
          </button>

          <Link 
            href="/auth/login"
            className="rounded-xl border border-slate-700 p-3 transition hover:border-cyan-500 bg-slate-900/40 hover:bg-slate-900"
            title="Account"
          >
            <User className="text-white" size={18} />
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl border border-slate-700 p-2 lg:hidden bg-slate-900/40 hover:bg-slate-900"
        >
          {mobileOpen ? (
            <X className="text-white" size={20} />
          ) : (
            <Menu className="text-white" size={20} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-5 py-5 lg:hidden space-y-4">

          <div className="flex overflow-hidden rounded-xl border border-slate-700 bg-slate-900 focus-within:border-emerald-500">

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent px-4 py-3 text-white outline-none text-sm"
            />

            <button className="bg-emerald-500 px-5">
              <Search className="text-black" size={16} />
            </button>

          </div>

          <div className="space-y-3">

            <button
              onClick={() => {
                setMobileOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-white text-sm"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart size={16} className="text-emerald-400" />
                Cart
              </span>
              {cartCount > 0 && (
                <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-white text-sm"
            >
              <span className="flex items-center gap-2">
                <Heart size={16} className="text-red-400" />
                Wishlist
              </span>
              {wishlist.length > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            <Link
              href="/seller"
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-white text-sm"
            >
              <Store size={16} className="text-emerald-400" />
              Seller Center
            </Link>

            <Link
              href="/auth/login"
              className="block rounded-xl bg-emerald-500 py-3 text-center text-sm font-bold text-black hover:bg-emerald-400 transition"
            >
              Login / Register
            </Link>

          </div>

        </div>
      )}

      {/* Globally Mount Cart Drawer */}
      <CartDrawer />
    </header>
  );
}