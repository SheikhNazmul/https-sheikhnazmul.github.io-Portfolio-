"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import {
  Package, Users, ShoppingBag, TrendingUp,
  Check, X, LogOut, Eye, ChevronDown
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, sellers: 0, orders: 0, revenue: 0 });
  const [orders, setOrders] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);

    const [
      { data: productsData },
      { data: sellersData },
      { data: ordersData },
    ] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").eq("role", "seller").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
    ]);

    setProducts(productsData || []);
    setSellers(sellersData || []);
    setOrders(ordersData || []);

    const revenue = (ordersData || [])
      .filter(o => o.status !== "cancelled")
      .reduce((s, o) => s + Number(o.total_amount), 0);

    setStats({
      products: productsData?.length || 0,
      sellers: sellersData?.length || 0,
      orders: ordersData?.length || 0,
      revenue,
    });

    setLoading(false);
  }

  async function updateOrderStatus(id, status) {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }

  async function updateSellerStatus(id, seller_status) {
    await supabase.from("profiles").update({ seller_status }).eq("id", id);
    setSellers(prev => prev.map(s => s.id === id ? { ...s, seller_status } : s));
  }

  async function toggleProductStatus(id, current) {
    const status = current === "active" ? "inactive" : "active";
    await supabase.from("products").update({ status }).eq("id", id);
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  }

  const statusColor = {
    pending: "#F59E0B",
    confirmed: "#3B82F6",
    shipped: "#8B5CF6",
    delivered: "#2DD4A7",
    cancelled: "#FF6B5E",
  };

  const statusLabel = {
    pending: "অপেক্ষায়",
    confirmed: "নিশ্চিত",
    shipped: "পাঠানো হয়েছে",
    delivered: "ডেলিভারি হয়েছে",
    cancelled: "বাতিল",
  };

  if (loading) return (
    <div style={{ background: "#0F1115", color: "#2DD4A7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontFamily: "sans-serif" }}>
      লোড হচ্ছে...
    </div>
  );

  return (
    <div style={{ background: "#0F1115", color: "#E7E9EC", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #2A2E37", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#0F1115", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "#2DD4A7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TrendingUp size={18} color="#0F1115" />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 16 }}>Admin Dashboard</p>
            <p style={{ fontSize: 11, color: "#8B919C" }}>সব কিছু এখান থেকে নিয়ন্ত্রণ করুন</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="/admin/products/add" style={{ padding: "8px 14px", background: "#2DD4A7", color: "#0F1115", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            <Package size={14} /> প্রোডাক্ট যোগ করুন
          </a>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#1B1E25", border: "1px solid #2A2E37", borderRadius: 8, color: "#8B919C", cursor: "pointer", fontSize: 13 }}>
            <LogOut size={14} /> লগআউট
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 16px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { icon: <Package size={18} />, label: "প্রোডাক্ট", value: stats.products, color: "#2DD4A7" },
            { icon: <Users size={18} />, label: "সেলার", value: stats.sellers, color: "#3B82F6" },
            { icon: <ShoppingBag size={18} />, label: "অর্ডার", value: stats.orders, color: "#8B5CF6" },
            { icon: <TrendingUp size={18} />, label: "মোট বিক্রি", value: `৳${stats.revenue.toFixed(0)}`, color: "#F59E0B" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#161922", border: "1px solid #2A2E37", borderRadius: 12, padding: 16 }}>
              <div style={{ color: s.color, marginBottom: 8 }}>{s.icon}</div>
              <p style={{ fontSize: 11, color: "#8B919C", marginBottom: 4 }}>{s.label}</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "#161922", padding: 4, borderRadius: 10, border: "1px solid #2A2E37" }}>
          {[
            { id: "orders", label: `অর্ডার (${orders.length})` },
            { id: "sellers", label: `সেলার (${sellers.length})` },
            { id: "products", label: `প্রোডাক্ট (${products.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", background: activeTab === tab.id ? "#2DD4A7" : "transparent", color: activeTab === tab.id ? "#0F1115" : "#8B919C", fontWeight: activeTab === tab.id ? 600 : 400, cursor: "pointer", fontSize: 13 }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {orders.length === 0 ? (
              <Empty text="কোনো অর্ডার নেই" />
            ) : orders.map((order) => (
              <div key={order.id} style={{ background: "#161922", border: "1px solid #2A2E37", borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, fontFamily: "monospace", color: "#2DD4A7" }}>{order.order_number}</p>
                    <p style={{ fontSize: 12, color: "#8B919C", marginTop: 2 }}>{order.customer_name} • {order.customer_phone}</p>
                    <p style={{ fontSize: 11, color: "#5A5F6A", marginTop: 2 }}>{order.customer_address}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#E7E9EC" }}>৳{order.total_amount}</p>
                    <p style={{ fontSize: 11, color: "#2DD4A7", marginTop: 2 }}>কমিশন: ৳{order.total_commission}</p>
                  </div>
                </div>

                {/* Status Selector */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: "#8B919C" }}>স্ট্যাটাস:</span>
                  <div style={{ position: "relative" }}>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      style={{ padding: "5px 28px 5px 10px", background: `${statusColor[order.status]}20`, border: `1px solid ${statusColor[order.status]}50`, borderRadius: 20, color: statusColor[order.status], fontSize: 12, fontWeight: 500, cursor: "pointer", appearance: "none", outline: "none" }}
                    >
                      {Object.entries(statusLabel).map(([val, label]) => (
                        <option key={val} value={val} style={{ background: "#161922", color: "#E7E9EC" }}>{label}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", color: statusColor[order.status], pointerEvents: "none" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sellers Tab */}
        {activeTab === "sellers" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sellers.length === 0 ? (
              <Empty text="কোনো সেলার নেই" />
            ) : sellers.map((seller) => (
              <div key={seller.id} style={{ background: "#161922", border: "1px solid #2A2E37", borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{seller.brand_name || seller.full_name}</p>
                    <p style={{ fontSize: 12, color: "#8B919C", marginTop: 2 }}>{seller.full_name} • {seller.phone}</p>
                    <p style={{ fontSize: 11, color: "#5A5F6A", marginTop: 2, fontFamily: "monospace" }}>ref: {seller.referral_code}</p>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{
                      padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500,
                      background: seller.seller_status === "approved" ? "#2DD4A720" : seller.seller_status === "pending" ? "#F59E0B20" : "#FF6B5E20",
                      color: seller.seller_status === "approved" ? "#2DD4A7" : seller.seller_status === "pending" ? "#F59E0B" : "#FF6B5E",
                    }}>
                      {seller.seller_status === "approved" ? "অনুমোদিত" : seller.seller_status === "pending" ? "অপেক্ষায়" : "প্রত্যাখ্যাত"}
                    </span>
                    {seller.seller_status === "pending" && (
                      <>
                        <button
                          onClick={() => updateSellerStatus(seller.id, "approved")}
                          style={{ width: 30, height: 30, borderRadius: 8, background: "#2DD4A720", border: "1px solid #2DD4A740", color: "#2DD4A7", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => updateSellerStatus(seller.id, "rejected")}
                          style={{ width: 30, height: 30, borderRadius: 8, background: "#FF6B5E20", border: "1px solid #FF6B5E40", color: "#FF6B5E", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                          <X size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {products.length === 0 ? (
              <Empty text="কোনো প্রোডাক্ট নেই" />
            ) : products.map((product) => (
              <div key={product.id} style={{ background: "#161922", border: "1px solid #2A2E37", borderRadius: 12, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: 48, height: 48, borderRadius: 8, background: "#1B1E25", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📦</div>
                  )}
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{product.name}</p>
                    <p style={{ fontSize: 12, color: "#8B919C", marginTop: 2 }}>৳{product.price} • স্টক: {product.stock}</p>
                    <p style={{ fontSize: 11, color: "#2DD4A7", marginTop: 2 }}>
                      কমিশন: {product.commission_type === "percentage" ? `${product.commission_value}%` : `৳${product.commission_value}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleProductStatus(product.id, product.status)}
                  style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${product.status === "active" ? "#2DD4A740" : "#FF6B5E40"}`, background: product.status === "active" ? "#2DD4A720" : "#FF6B5E20", color: product.status === "active" ? "#2DD4A7" : "#FF6B5E", fontSize: 12, fontWeight: 500, cursor: "pointer" }}
                >
                  {product.status === "active" ? "Active" : "Inactive"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 0", color: "#5A5F6A" }}>
      <p style={{ fontSize: 15 }}>{text}</p>
    </div>
  );
}
