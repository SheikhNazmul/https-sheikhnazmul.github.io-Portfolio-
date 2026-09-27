"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import {
  Wallet, ShoppingBag, TrendingUp, Copy, Check,
  Clock, Truck, CheckCircle, XCircle, LogOut, ArrowUpRight
} from "lucide-react";

export default function SellerDashboard() {
  const [seller, setSeller] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("bkash");
  const [withdrawNumber, setWithdrawNumber] = useState("");
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawDone, setWithdrawDone] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }

    // Get seller profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    setSeller(profile);

    // Get wallet
    const { data: walletData } = await supabase
      .from("wallets")
      .select("*")
      .eq("seller_id", user.id)
      .single();
    setWallet(walletData);

    // Get orders for this seller
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*, order_items(*, products(name))")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });
    setOrders(ordersData || []);

    // Get wallet transactions
    if (walletData) {
      const { data: txData } = await supabase
        .from("wallet_transactions")
        .select("*")
        .eq("wallet_id", walletData.id)
        .order("created_at", { ascending: false });
      setTransactions(txData || []);
    }

    setLoading(false);
  }

  function copyReferralLink() {
    const link = `${window.location.origin}/shop?ref=${seller?.referral_code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleWithdraw() {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) return;
    if (Number(withdrawAmount) > wallet?.balance) {
      alert("ব্যালেন্স যথেষ্ট নেই");
      return;
    }
    if (!withdrawNumber) {
      alert("পেমেন্ট নম্বর দিন");
      return;
    }
    setWithdrawing(true);

    await supabase.from("withdraw_requests").insert({
      seller_id: seller.id,
      amount: Number(withdrawAmount),
      payment_method: withdrawMethod,
      payment_number: withdrawNumber,
      status: "pending",
    });

    setWithdrawing(false);
    setWithdrawDone(true);
    setWithdrawAmount("");
    setWithdrawNumber("");
    setTimeout(() => setWithdrawDone(false), 3000);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  }

  function statusBadge(status) {
    const map = {
      pending: { label: "অপেক্ষায়", color: "#F59E0B", icon: <Clock size={12} /> },
      confirmed: { label: "নিশ্চিত", color: "#3B82F6", icon: <CheckCircle size={12} /> },
      shipped: { label: "পাঠানো হয়েছে", color: "#8B5CF6", icon: <Truck size={12} /> },
      delivered: { label: "ডেলিভারি হয়েছে", color: "#2DD4A7", icon: <CheckCircle size={12} /> },
      cancelled: { label: "বাতিল", color: "#FF6B5E", icon: <XCircle size={12} /> },
    };
    const s = map[status] || map.pending;
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 20, background: `${s.color}20`, color: s.color, fontSize: 11, fontWeight: 500 }}>
        {s.icon} {s.label}
      </span>
    );
  }

  if (loading) return (
    <div style={{ background: "#0F1115", color: "#2DD4A7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
      লোড হচ্ছে...
    </div>
  );

  if (!seller) return (
    <div style={{ background: "#0F1115", color: "#FF6B5E", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      প্রোফাইল পাওয়া যায়নি
    </div>
  );

  const totalEarned = transactions.filter(t => t.type === "commission_credit").reduce((s, t) => s + t.amount, 0);

  return (
    <div style={{ background: "#0F1115", color: "#E7E9EC", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #2A2E37", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#0F1115", zIndex: 10 }}>
        <div>
          <p style={{ fontSize: 16, fontWeight: 600 }}>{seller.brand_name || seller.full_name}</p>
          <p style={{ fontSize: 12, color: seller.seller_status === "approved" ? "#2DD4A7" : "#F59E0B", marginTop: 2 }}>
            {seller.seller_status === "approved" ? "✅ অনুমোদিত" : seller.seller_status === "pending" ? "⏳ অনুমোদন অপেক্ষায়" : "❌ প্রত্যাখ্যাত"}
          </p>
        </div>
        <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#1B1E25", border: "1px solid #2A2E37", borderRadius: 8, color: "#8B919C", cursor: "pointer", fontSize: 13 }}>
          <LogOut size={14} /> লগআউট
        </button>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
          <StatCard icon={<Wallet size={18} />} label="ব্যালেন্স" value={`৳${wallet?.balance?.toFixed(2) || "0.00"}`} color="#2DD4A7" />
          <StatCard icon={<TrendingUp size={18} />} label="মোট আয়" value={`৳${totalEarned.toFixed(2)}`} color="#3B82F6" />
          <StatCard icon={<ShoppingBag size={18} />} label="মোট অর্ডার" value={orders.length} color="#8B5CF6" />
        </div>

        {/* Referral Link */}
        <div style={{ background: "#161922", border: "1px solid #2A2E37", borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: "#8B919C", marginBottom: 8 }}>আপনার রেফারেল লিংক</p>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ flex: 1, padding: "10px 12px", background: "#1B1E25", borderRadius: 8, fontSize: 13, color: "#2DD4A7", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {typeof window !== "undefined" ? `${window.location.origin}/shop?ref=${seller.referral_code}` : `/shop?ref=${seller.referral_code}`}
            </div>
            <button
              onClick={copyReferralLink}
              style={{ padding: "10px 16px", background: copied ? "#2DD4A7" : "#1B1E25", border: "1px solid #2A2E37", borderRadius: 8, color: copied ? "#0F1115" : "#E7E9EC", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, whiteSpace: "nowrap" }}
            >
              {copied ? <><Check size={14} /> কপি হয়েছে</> : <><Copy size={14} /> কপি করুন</>}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "#161922", padding: 4, borderRadius: 10, border: "1px solid #2A2E37" }}>
          {[
            { id: "orders", label: "অর্ডার" },
            { id: "transactions", label: "লেনদেন" },
            { id: "withdraw", label: "উত্তোলন" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", background: activeTab === tab.id ? "#2DD4A7" : "transparent", color: activeTab === tab.id ? "#0F1115" : "#8B919C", fontWeight: activeTab === tab.id ? 600 : 400, cursor: "pointer", fontSize: 13, transition: "all 0.2s" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {orders.length === 0 ? (
              <Empty text="এখনো কোনো অর্ডার নেই" sub="আপনার রেফারেল লিংক শেয়ার করুন" />
            ) : orders.map((order) => (
              <div key={order.id} style={{ background: "#161922", border: "1px solid #2A2E37", borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, fontFamily: "monospace", color: "#2DD4A7" }}>{order.order_number}</p>
                    <p style={{ fontSize: 12, color: "#8B919C", marginTop: 2 }}>{order.customer_name} • {order.customer_phone}</p>
                  </div>
                  {statusBadge(order.status)}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "#8B919C" }}>মোট: <span style={{ color: "#E7E9EC" }}>৳{order.total_amount}</span></span>
                  <span style={{ color: "#8B919C" }}>কমিশন: <span style={{ color: "#2DD4A7", fontWeight: 600 }}>৳{order.total_commission}</span></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {transactions.length === 0 ? (
              <Empty text="কোনো লেনদেন নেই" sub="অর্ডার হলে এখানে দেখা যাবে" />
            ) : transactions.map((tx) => (
              <div key={tx.id} style={{ background: "#161922", border: "1px solid #2A2E37", borderRadius: 12, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500 }}>{tx.type === "commission_credit" ? "কমিশন ক্রেডিট" : "উত্তোলন"}</p>
                  <p style={{ fontSize: 11, color: "#5A5F6A", marginTop: 2 }}>{new Date(tx.created_at).toLocaleDateString("bn-BD")}</p>
                  {tx.note && <p style={{ fontSize: 11, color: "#8B919C", marginTop: 2 }}>{tx.note}</p>}
                </div>
                <span style={{ fontWeight: 600, color: tx.type === "commission_credit" ? "#2DD4A7" : "#FF6B5E", fontSize: 15 }}>
                  {tx.type === "commission_credit" ? "+" : "-"}৳{tx.amount}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Withdraw Tab */}
        {activeTab === "withdraw" && (
          <div style={{ background: "#161922", border: "1px solid #2A2E37", borderRadius: 12, padding: 20 }}>
            <p style={{ fontSize: 13, color: "#8B919C", marginBottom: 4 }}>বর্তমান ব্যালেন্স</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: "#2DD4A7", marginBottom: 20 }}>৳{wallet?.balance?.toFixed(2) || "0.00"}</p>

            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 13, color: "#8B919C", marginBottom: 6 }}>পেমেন্ট মাধ্যম</p>
              <div style={{ display: "flex", gap: 8 }}>
                {["bkash", "nagad", "bank"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setWithdrawMethod(m)}
                    style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: `1px solid ${withdrawMethod === m ? "#2DD4A7" : "#2A2E37"}`, background: withdrawMethod === m ? "#2DD4A7/10" : "#1B1E25", color: withdrawMethod === m ? "#2DD4A7" : "#8B919C", cursor: "pointer", fontSize: 13, fontWeight: withdrawMethod === m ? 600 : 400 }}
                  >
                    {m === "bkash" ? "বিকাশ" : m === "nagad" ? "নগদ" : "ব্যাংক"}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 13, color: "#8B919C", marginBottom: 6 }}>নম্বর</p>
              <input
                value={withdrawNumber}
                onChange={(e) => setWithdrawNumber(e.target.value)}
                placeholder={withdrawMethod === "bank" ? "অ্যাকাউন্ট নম্বর" : "01XXXXXXXXX"}
                style={{ width: "100%", padding: "10px 12px", background: "#1B1E25", border: "1px solid #2A2E37", borderRadius: 8, color: "#E7E9EC", fontSize: 14, boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: "#8B919C", marginBottom: 6 }}>পরিমাণ (BDT)</p>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0"
                style={{ width: "100%", padding: "10px 12px", background: "#1B1E25", border: "1px solid #2A2E37", borderRadius: 8, color: "#E7E9EC", fontSize: 14, boxSizing: "border-box" }}
              />
            </div>

            <button
              onClick={handleWithdraw}
              disabled={withdrawing || withdrawDone}
              style={{ width: "100%", padding: "12px 0", background: withdrawDone ? "#1B1E25" : "#2DD4A7", color: withdrawDone ? "#2DD4A7" : "#0F1115", border: withdrawDone ? "1px solid #2DD4A7" : "none", borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              {withdrawDone ? <><Check size={16} /> রিকোয়েস্ট পাঠানো হয়েছে</> : withdrawing ? "পাঠানো হচ্ছে..." : <><ArrowUpRight size={16} /> উত্তোলনের রিকোয়েস্ট করুন</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{ background: "#161922", border: "1px solid #2A2E37", borderRadius: 12, padding: 16 }}>
      <div style={{ color, marginBottom: 8 }}>{icon}</div>
      <p style={{ fontSize: 11, color: "#8B919C", marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 18, fontWeight: 700, color }}>{value}</p>
    </div>
  );
}

function Empty({ text, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 0", color: "#5A5F6A" }}>
      <p style={{ fontSize: 15, marginBottom: 4 }}>{text}</p>
      <p style={{ fontSize: 13 }}>{sub}</p>
    </div>
  );
}
