"use client";

import { ShopProvider } from "@/components/shop/ShopContext";
import AnnouncementBar from "@/components/shop/AnnouncementBar";
import Header from "@/components/shop/Header";
import HeroSection from "@/components/shop/HeroSection";
import FlashSale from "@/components/shop/FlashSale";
import ProductGrid from "@/components/shop/ProductGrid";
import Footer from "@/components/shop/Footer";

export default function ShopPage() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#0F1115] text-[#E7E9EC] flex flex-col font-sans">
        <AnnouncementBar />
        <Header />
        <HeroSection />
        <FlashSale />
        <ProductGrid />
        <Footer />
      </div>
    </ShopProvider>
  );
}