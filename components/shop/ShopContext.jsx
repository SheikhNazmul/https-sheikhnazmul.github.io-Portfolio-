"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [seller, setSeller] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize referral seller and localStorage values
  useEffect(() => {
    // 1. Handle referral tracking
    async function handleReferral() {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const refCode = params.get("ref");

      if (refCode) {
        // Query profile from Supabase
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("id, full_name, brand_name, referral_code, seller_status")
          .eq("referral_code", refCode)
          .eq("seller_status", "approved")
          .single();

        if (profile && !error) {
          setSeller(profile);
          localStorage.setItem("bw_referral_seller", JSON.stringify(profile));
        }
      } else {
        // Check local storage for persistent seller referral
        const stored = localStorage.getItem("bw_referral_seller");
        if (stored) {
          try {
            setSeller(JSON.parse(stored));
          } catch (e) {
            console.error("Failed parsing stored referral:", e);
          }
        }
      }
    }

    // 2. Load Cart
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("bw_cart");
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart));
        } catch (e) {
          console.error("Failed parsing stored cart:", e);
        }
      }

      // 3. Load Wishlist
      const storedWishlist = localStorage.getItem("bw_wishlist");
      if (storedWishlist) {
        try {
          setWishlist(JSON.parse(storedWishlist));
        } catch (e) {
          console.error("Failed parsing stored wishlist:", e);
        }
      }
    }

    handleReferral();
    fetchProducts();
  }, []);

  // Fetch active products from Supabase
  async function fetchProducts() {
    setLoadingProducts(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoadingProducts(false);
  }

  // Cart operations
  function addToCart(product, quantity = 1) {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.product.id === product.id);
      let newCart;

      if (existingIdx > -1) {
        newCart = prevCart.map((item, idx) =>
          idx === existingIdx
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      } else {
        newCart = [...prevCart, { product, quantity: Math.min(product.stock, quantity) }];
      }

      localStorage.setItem("bw_cart", JSON.stringify(newCart));
      return newCart;
    });
    setIsCartOpen(true);
  }

  // Remove from cart
  function removeFromCart(productId) {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.product.id !== productId);
      localStorage.setItem("bw_cart", JSON.stringify(newCart));
      return newCart;
    });
  }

  // Update quantity
  function updateQuantity(productId, quantity) {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity: Math.max(1, Math.min(item.product.stock, quantity)) };
        }
        return item;
      });
      localStorage.setItem("bw_cart", JSON.stringify(newCart));
      return newCart;
    });
  }

  // Clear cart
  function clearCart() {
    setCart([]);
    localStorage.removeItem("bw_cart");
  }

  // Wishlist operations
  function toggleWishlist(productId) {
    setWishlist((prevWishlist) => {
      let newWishlist;
      if (prevWishlist.includes(productId)) {
        newWishlist = prevWishlist.filter((id) => id !== productId);
      } else {
        newWishlist = [...prevWishlist, productId];
      }
      localStorage.setItem("bw_wishlist", JSON.stringify(newWishlist));
      return newWishlist;
    });
  }

  // Calculate product commission
  function getProductCommission(product) {
    const price = Number(product.price);
    const val = Number(product.commission_value);
    if (product.commission_type === "percentage") {
      return (price * val) / 100;
    }
    return val;
  }

  // Checkout process
  async function checkout(customerInfo) {
    try {
      if (cart.length === 0) throw new Error("Cart is empty");

      const total_amount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const total_commission = cart.reduce(
        (sum, item) => sum + getProductCommission(item.product) * item.quantity,
        0
      );

      // Generate order number
      const dateStr = Date.now().toString().slice(-6);
      const randStr = Math.floor(1000 + Math.random() * 9000);
      const order_number = `NC-${dateStr}-${randStr}`;

      const orderPayload = {
        order_number,
        seller_id: seller?.id || null,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_address: customerInfo.address,
        total_amount,
        total_commission,
        status: "pending",
      };

      // 1. Insert order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert(orderPayload)
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Insert order items
      const orderItemsPayload = cart.map((item) => ({
        order_id: orderData.id,
        product_id: item.product.id,
        quantity: item.quantity,
        unit_price: item.product.price,
        commission_earned: getProductCommission(item.product) * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsPayload);

      if (itemsError) throw itemsError;

      // 3. Update stock levels for each product
      for (const item of cart) {
        const newStock = Math.max(0, item.product.stock - item.quantity);
        await supabase
          .from("products")
          .update({ stock: newStock })
          .eq("id", item.product.id);
      }

      // Success
      clearCart();
      fetchProducts(); // Refresh list to update local stock states
      return { success: true, order: orderData };
    } catch (err) {
      console.error("Checkout error details:", err);
      return { success: false, error: err.message };
    }
  }

  return (
    <ShopContext.Provider
      value={{
        products,
        loadingProducts,
        cart,
        wishlist,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        seller,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        checkout,
        getProductCommission,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
