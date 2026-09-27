"use client";

import { useEffect, useState } from "react";
import { useShop } from "./ShopContext";
import { ShoppingCart, Star, Heart } from "lucide-react";

export default function FlashSale() {
  const { products, addToCart, wishlist, toggleWishlist } = useShop();
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 12 });

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown to simulate ongoing sale
          return { hours: 4, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => String(num).padStart(2, "0");

  // Get the first 4 products to display in the Flash Sale
  const flashProducts = products.filter(p => p.stock > 0).slice(0, 4);

  if (flashProducts.length === 0) return null;

  return (
    <section className="bg-slate-950 py-12 border-b border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Flash Sale Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-pulse">⚡</span>
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Flash Sale</h2>
              <p className="text-xs text-slate-400">Limited time deals on premium items</p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider mr-2">Ends In:</span>
            <div className="flex items-center gap-1.5 font-mono">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold text-lg">
                {formatTime(timeLeft.hours)}
              </span>
              <span className="text-emerald-400 font-bold">:</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold text-lg">
                {formatTime(timeLeft.minutes)}
              </span>
              <span className="text-emerald-400 font-bold">:</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold text-lg">
                {formatTime(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Shelf Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            // Calculate a fake original price (20% higher) for visuals
            const originalPrice = Math.round(product.price * 1.25);
            const discountPct = 20;

            return (
              <div 
                key={product.id} 
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-4 transition duration-200 hover:border-emerald-500/40 hover:bg-slate-900/60"
              >
                
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  <span className="rounded-lg bg-red-500/15 border border-red-500/35 px-2.5 py-1 text-xs font-bold text-red-400">
                    -{discountPct}% OFF
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-slate-950/70 backdrop-blur-sm transition duration-200 ${
                    isWishlisted 
                      ? "border-red-500/40 text-red-400" 
                      : "border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} />
                </button>

                {/* Product Image */}
                <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center">
                  {product.images?.[0] ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
                      }}
                    />
                  ) : (
                    <span className="text-4xl">📦</span>
                  )}
                </div>

                {/* Product Info */}
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                    {product.category}
                  </span>

                  <h3 className="mt-2.5 text-sm font-semibold text-white line-clamp-1 group-hover:text-emerald-400 transition">
                    {product.name}
                  </h3>

                  {/* Rating Stars Mockup */}
                  <div className="mt-1.5 flex items-center gap-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} fill="currentColor" className="mr-0.5" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">(42 reviews)</span>
                  </div>

                  {/* Pricing and Add to Cart */}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-lg font-black text-white">৳{product.price}</span>
                      <span className="ml-2 text-xs font-semibold text-slate-500 line-through">৳{originalPrice}</span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 transition"
                      title="Add to Cart"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
