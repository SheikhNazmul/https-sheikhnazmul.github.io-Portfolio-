"use client";

import { useState } from "react";
import { useShop } from "./ShopContext";
import { Star, ShoppingCart, Heart, Eye, X, ShieldCheck, Check, AlertCircle } from "lucide-react";

export default function ProductGrid() {
  const { 
    products, 
    loadingProducts, 
    searchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    addToCart, 
    wishlist, 
    toggleWishlist 
  } = useShop();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const categories = ["All", "Electronics", "Fashion", "Home & Living", "Beauty", "Grocery", "Other"];

  // Filter products based on search input and selected category tab
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalQty(1);
    setActiveImgIdx(0);
  };

  const handleModalAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, modalQty);
      setSelectedProduct(null);
    }
  };

  return (
    <section id="product-grid-section" className="bg-slate-950 py-16 text-white min-h-[400px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Category Navigation Tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 border-b border-slate-900 pb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">All Products</h2>
            <p className="text-xs text-slate-400 mt-1">Browse our complete collection of verified items</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4.5 py-1.5 text-xs font-semibold tracking-wide transition duration-150 ${
                  selectedCategory === cat
                    ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/10"
                    : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Spinner */}
        {loadingProducts ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-950">
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="text-lg font-semibold text-white">No products found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-xs">
              We couldn't find any products matching your current filters. Try searching for something else.
            </p>
          </div>
        ) : (
          /* Main Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const outOfStock = product.stock <= 0;

              return (
                <div 
                  key={product.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/20 p-4 transition duration-200 hover:border-emerald-500/30 hover:bg-slate-900/40"
                >
                  
                  {/* Heart / Wishlist icon */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-slate-950/70 backdrop-blur-sm transition duration-200 ${
                      isWishlisted 
                        ? "border-red-500/40 text-red-400" 
                        : "border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>

                  {/* Image and Quick View container */}
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

                    {/* Quick View Hover Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button 
                        onClick={() => openProductModal(product)}
                        className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-black shadow-lg hover:bg-slate-100 transition transform translate-y-2 group-hover:translate-y-0 duration-200"
                      >
                        <Eye size={13} />
                        Quick View
                      </button>
                    </div>

                    {/* Out of Stock banner */}
                    {outOfStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-red-500/10 border border-red-500/35 px-3 py-1 text-xs font-bold text-red-400">
                          <AlertCircle size={12} /> Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info details */}
                  <div>
                    <span className="text-[9px] uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                      {product.category}
                    </span>

                    <h3 
                      onClick={() => openProductModal(product)}
                      className="mt-2.5 text-sm font-bold text-white truncate cursor-pointer hover:text-emerald-400 transition"
                    >
                      {product.name}
                    </h3>

                    {/* Stars ratings */}
                    <div className="mt-1.5 flex items-center gap-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} fill="currentColor" className="mr-0.5" />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium">(28 reviews)</span>
                    </div>

                    {/* Price and Cart Add button */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-base font-extrabold text-white">৳{product.price}</span>

                      <button
                        onClick={() => addToCart(product, 1)}
                        disabled={outOfStock}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 transition"
                        title={outOfStock ? "Out of Stock" : "Add to Cart"}
                      >
                        <ShoppingCart size={14} />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <div 
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Modal Panel */}
          <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl text-white animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute right-5 top-5 rounded-xl border border-slate-800 bg-slate-950/70 p-2 text-slate-400 hover:text-white transition hover:bg-slate-800"
            >
              <X size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              
              {/* Product Gallery Section */}
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <img 
                    src={selectedProduct.images?.[activeImgIdx] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
                    }}
                  />
                </div>

                {/* Thumbnails list */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1">
                    {selectedProduct.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImgIdx(idx)}
                        className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-950 border transition duration-150 ${
                          activeImgIdx === idx ? "border-emerald-500" : "border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <img src={img} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details Section */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/10">
                    {selectedProduct.category}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-white mt-3.5 leading-tight">
                    {selectedProduct.name}
                  </h3>

                  {/* Rating Stars Mockup */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" className="mr-0.5" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">(28 Verified Reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="mt-5">
                    <span className="text-2xl font-black text-emerald-400">৳{selectedProduct.price}</span>
                  </div>

                  {/* Description */}
                  <div className="mt-4 border-t border-slate-800 pt-4 max-h-[160px] overflow-y-auto">
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {selectedProduct.description || "No detailed description is available for this product yet. Rest assured, all Nexcart products are premium quality items and verified for performance."}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-800 pt-5 space-y-4">
                  {/* Stock details */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-semibold uppercase tracking-wider">Availability</span>
                    {selectedProduct.stock > 0 ? (
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <Check size={12} /> {selectedProduct.stock} items left in stock
                      </span>
                    ) : (
                      <span className="font-semibold text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Actions */}
                  {selectedProduct.stock > 0 && (
                    <div className="flex items-center gap-4">
                      {/* Quantity select */}
                      <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950 overflow-hidden h-12">
                        <button 
                          onClick={() => setModalQty(q => Math.max(1, q - 1))}
                          className="px-3.5 text-slate-400 hover:bg-slate-900 transition flex items-center justify-center h-full"
                        >
                          -
                        </button>
                        <span className="w-12 text-center text-sm font-bold text-white">{modalQty}</span>
                        <button 
                          onClick={() => setModalQty(q => Math.min(selectedProduct.stock, q + 1))}
                          className="px-3.5 text-slate-400 hover:bg-slate-900 transition flex items-center justify-center h-full"
                        >
                          +
                        </button>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={handleModalAddToCart}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 font-bold text-black hover:bg-emerald-400 transition"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  )}

                  {/* Safety icons */}
                  <div className="grid grid-cols-2 gap-3 pt-2 text-[10px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      Cash on Delivery
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      Safe Returns Support
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
