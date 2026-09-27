"use client";

import { useState } from "react";
import { useShop } from "./ShopContext";
import { X, Trash2, Plus, Minus, Truck, ShieldCheck, ShoppingBag, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    checkout 
  } = useShop();

  const [checkoutMode, setCheckoutMode] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [shippingArea, setShippingArea] = useState("inside"); // inside | outside
  const [submitting, setSubmitting] = useState(false);
  
  // Checkout form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  if (!isCartOpen) return null;

  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const itemsSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCharge = shippingArea === "inside" ? 80 : 150;
  const grandTotal = itemsSubtotal + shippingCharge;

  // Validation
  const validateForm = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Full name is required";
    
    // Bangladesh mobile number regex
    const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
      errs.phone = "Provide a valid Bangladeshi phone number (e.g. 01XXXXXXXXX)";
    }

    if (!address.trim()) errs.address = "Detailed delivery address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    setSubmitting(true);
    
    const res = await checkout({
      name,
      phone: phone.replace(/\s+/g, ""),
      address: `${address} (Shipping: ${shippingArea === "inside" ? "Inside Dhaka" : "Outside Dhaka"})`
    });

    setSubmitting(false);
    if (res.success) {
      setSuccessOrder(res.order);
      setCheckoutMode(false);
      // Reset form
      setName("");
      setPhone("");
      setAddress("");
    } else {
      alert(`Could not place order: ${res.error}`);
    }
  };

  const handleClose = () => {
    setIsCartOpen(false);
    // If order was successful, close success state after drawer closes
    setTimeout(() => {
      setSuccessOrder(null);
      setCheckoutMode(false);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-slate-900 border-l border-slate-800 text-white shadow-2xl transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-emerald-400" />
            <h2 className="text-lg font-bold text-white">
              {successOrder ? "Order Confirmed!" : checkoutMode ? "Checkout Information" : "Your Shopping Cart"}
            </h2>
          </div>
          <button 
            onClick={handleClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dynamic Body Content */}
        {successOrder ? (
          /* Success Screen */
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 animate-bounce">
              <CheckCircle size={44} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Thank you for your order!</h3>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Your order has been placed successfully and is currently under verification.
            </p>

            <div className="w-full rounded-xl border border-slate-800 bg-slate-950 p-5 text-left mb-8">
              <div className="flex justify-between border-b border-slate-900 pb-2 mb-2 text-xs">
                <span className="text-slate-500">Order Number</span>
                <span className="font-mono font-semibold text-emerald-400">{successOrder.order_number}</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-2 mb-2 text-xs">
                <span className="text-slate-500">Customer Name</span>
                <span className="font-semibold">{successOrder.customer_name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-2 mb-2 text-xs">
                <span className="text-slate-500">Phone Number</span>
                <span className="font-semibold">{successOrder.customer_phone}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Total Charged</span>
                <span className="font-bold text-emerald-400">৳{successOrder.total_amount + (shippingArea === "inside" ? 80 : 150)}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full rounded-xl bg-emerald-500 py-3.5 font-bold text-black hover:bg-emerald-400 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : checkoutMode ? (
          /* Checkout Info Form Screen */
          <div className="flex flex-1 flex-col justify-between overflow-y-auto p-5">
            <div className="space-y-5">
              <button 
                onClick={() => setCheckoutMode(false)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition mb-2"
              >
                <ArrowLeft size={12} /> Back to Cart
              </button>

              {/* Customer Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sheikh Nazmul"
                  className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-emerald-500 ${
                    errors.name ? "border-red-500" : "border-slate-800"
                  }`}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-emerald-500 ${
                    errors.phone ? "border-red-500" : "border-slate-800"
                  }`}
                />
                {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Delivery Address</label>
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House number, Flat, Area, District"
                  rows={4}
                  className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition resize-none focus:border-emerald-500 ${
                    errors.address ? "border-red-500" : "border-slate-800"
                  }`}
                />
                {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
              </div>

              {/* Payment Method Details */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex items-start gap-3">
                <ShieldCheck size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cash on Delivery (COD)</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Verify and check your product at delivery before paying. Fully secure and safe purchase.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom summary and place order */}
            <div className="border-t border-slate-800 pt-5 mt-6 space-y-4">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal ({itemsCount} items)</span>
                <span>৳{itemsSubtotal}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Shipping ({shippingArea === "inside" ? "Inside Dhaka" : "Outside Dhaka"})</span>
                <span>৳{shippingCharge}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-3 text-sm font-bold text-white">
                <span>Grand Total</span>
                <span className="text-emerald-400">৳{grandTotal}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-bold text-black hover:bg-emerald-400 transition"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order (৳${grandTotal})`
                )}
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Cart Screen */
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 text-slate-600">
              <ShoppingBag size={64} className="stroke-[1]" />
            </div>
            <h3 className="text-base font-bold text-white">Your cart is empty</h3>
            <p className="text-xs text-slate-500 mt-2 max-w-[240px]">
              Looks like you haven't added any products to your cart yet.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 rounded-xl border border-slate-700 bg-slate-800 px-6 py-2.5 text-xs font-semibold text-white hover:bg-slate-750 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          /* Cart items list Screen */
          <div className="flex flex-1 flex-col justify-between overflow-y-auto p-5">
            
            {/* Scrollable list */}
            <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-1">
              {cart.map((item) => (
                <div 
                  key={item.product.id} 
                  className="flex items-center gap-3.5 rounded-xl border border-slate-800/80 bg-slate-950/40 p-3 hover:border-slate-800"
                >
                  {/* Image */}
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {item.product.images?.[0] ? (
                      <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xl">📦</span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{item.product.category}</h4>
                    <h3 className="text-sm font-semibold text-white truncate mt-0.5">{item.product.name}</h3>
                    <p className="text-sm font-black text-emerald-400 mt-1">৳{item.product.price}</p>
                  </div>

                  {/* Quantity Actions & Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-500 hover:text-red-400 transition p-1"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 overflow-hidden h-7">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 text-slate-400 hover:bg-slate-900 transition flex items-center justify-center h-full"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="px-2 text-slate-400 hover:bg-slate-900 disabled:opacity-30 transition flex items-center justify-center h-full"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout settings and totals */}
            <div className="border-t border-slate-800 pt-5 mt-4 space-y-4">
              
              {/* Shipping Area Selector */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                    <Truck size={14} className="text-emerald-400" /> Shipping Destination
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShippingArea("inside")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                      shippingArea === "inside"
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    Inside Dhaka (৳80)
                  </button>
                  <button
                    onClick={() => setShippingArea("outside")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                      shippingArea === "outside"
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    Outside Dhaka (৳150)
                  </button>
                </div>
              </div>

              {/* Totals Block */}
              <div className="space-y-2 text-xs pt-1">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal ({itemsCount} items)</span>
                  <span>৳{itemsSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping charge</span>
                  <span>৳{shippingCharge}</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-3.5 text-sm font-bold text-white">
                  <span>Grand Total</span>
                  <span className="text-emerald-400 text-base font-black">৳{grandTotal}</span>
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={() => setCheckoutMode(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-bold text-black hover:bg-emerald-400 transition"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
