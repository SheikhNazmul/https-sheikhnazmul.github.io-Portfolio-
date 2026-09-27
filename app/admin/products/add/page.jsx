"use client";

import React, { useState } from "react";
import { Plus, X, ImagePlus, Percent, Banknote, Package, Check, Loader2 } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient"; // adjust path to match your folder structure

export default function AdminProductForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    commissionType: "percentage",
    commissionValue: "",
    status: "active",
  });
  const [images, setImages] = useState([]);
  const [imageInput, setImageInput] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  const categories = ["Electronics", "Fashion", "Home & Living", "Beauty", "Grocery", "Other"];

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  }

  function addImage() {
    const url = imageInput.trim();
    if (!url) return;
    setImages((imgs) => [...imgs, url]);
    setImageInput("");
  }

  function removeImage(idx) {
    setImages((imgs) => imgs.filter((_, i) => i !== idx));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.price || Number(form.price) <= 0) e.price = "Enter a valid price";
    if (form.stock === "" || Number(form.stock) < 0) e.stock = "Enter valid stock";
    if (!form.category) e.category = "Select a category";
    if (!form.commissionValue || Number(form.commissionValue) <= 0)
      e.commissionValue = "Enter a valid commission";
    if (form.commissionType === "percentage" && Number(form.commissionValue) > 100)
      e.commissionValue = "Percentage can't exceed 100";
    if (
      form.commissionType === "fixed" &&
      Number(form.commissionValue) >= Number(form.price)
    )
      e.commissionValue = "Fixed commission can't exceed price";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setServerError("");
    setSaving(true);

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category,
      images,
      commission_type: form.commissionType,
      commission_value: Number(form.commissionValue),
      status: form.status,
    };

    // This is the real Supabase insert — replaces the old console.log
    const { error } = await supabase.from("products").insert(payload);

    setSaving(false);

    if (error) {
      setServerError(error.message);
      return;
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      commissionType: "percentage",
      commissionValue: "",
      status: "active",
    });
    setImages([]);
  }

  const price = Number(form.price) || 0;
  const commissionValue = Number(form.commissionValue) || 0;
  const commissionAmount =
    form.commissionType === "percentage" ? (price * commissionValue) / 100 : commissionValue;
  const companyKeeps = price - commissionAmount;

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#E7E9EC] font-sans">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-lg bg-[#2DD4A7] flex items-center justify-center">
            <Package size={18} className="text-[#0F1115]" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Add product</h1>
            <p className="text-sm text-[#8B919C]">Sellers will see this in their catalog once published</p>
          </div>
        </div>

        {serverError && (
          <div className="mb-5 px-4 py-3 rounded-lg bg-[#FF6B5E]/10 border border-[#FF6B5E]/40 text-[#FF6B5E] text-sm">
            Couldn't save: {serverError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <Field label="Product name" error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Wireless Earbuds Pro X2"
                className={inputClass(errors.name)}
              />
            </Field>

            <Field label="Description" optional>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Short, clear description sellers can use as-is"
                rows={4}
                className={inputClass(false) + " resize-none"}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Price (BDT)" error={errors.price}>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder="0.00"
                  className={inputClass(errors.price)}
                />
              </Field>
              <Field label="Stock quantity" error={errors.stock}>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => update("stock", e.target.value)}
                  placeholder="0"
                  className={inputClass(errors.stock)}
                />
              </Field>
            </div>

            <Field label="Category" error={errors.category}>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className={inputClass(errors.category)}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="Product images" optional>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addImage()}
                  placeholder="Paste image URL and press Enter"
                  className={inputClass(false)}
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="px-3 rounded-lg bg-[#1B1E25] border border-[#2A2E37] hover:border-[#2DD4A7] transition-colors flex items-center justify-center shrink-0"
                >
                  <ImagePlus size={16} />
                </button>
              </div>
              {images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {images.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative group w-16 h-16 rounded-lg overflow-hidden border border-[#2A2E37] bg-[#1B1E25]"
                    >
                      <img
                        src={url}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.style.opacity = 0.25)}
                      />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF6B5E] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={11} className="text-[#0F1115]" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Field>

            <Field label="Visibility">
              <div className="flex gap-2">
                {[
                  { v: "active", label: "Active — visible to sellers" },
                  { v: "inactive", label: "Inactive — hidden" },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() => update("status", opt.v)}
                    className={`flex-1 px-3 py-2.5 rounded-lg border text-sm transition-colors text-left ${
                      form.status === opt.v
                        ? "border-[#2DD4A7] bg-[#2DD4A7]/10 text-[#2DD4A7]"
                        : "border-[#2A2E37] text-[#8B919C] hover:border-[#3A3F4A]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <div className="space-y-5">
            <div className="bg-[#161922] border border-[#2A2E37] rounded-xl p-5 sticky top-6">
              <h3 className="text-sm font-medium mb-4 text-[#8B919C] tracking-wide uppercase">
                Seller commission
              </h3>

              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => update("commissionType", "percentage")}
                  className={`flex-1 px-2 py-2 rounded-lg border text-xs flex items-center justify-center gap-1.5 transition-colors ${
                    form.commissionType === "percentage"
                      ? "border-[#2DD4A7] bg-[#2DD4A7]/10 text-[#2DD4A7]"
                      : "border-[#2A2E37] text-[#8B919C]"
                  }`}
                >
                  <Percent size={12} /> Percent
                </button>
                <button
                  type="button"
                  onClick={() => update("commissionType", "fixed")}
                  className={`flex-1 px-2 py-2 rounded-lg border text-xs flex items-center justify-center gap-1.5 transition-colors ${
                    form.commissionType === "fixed"
                      ? "border-[#2DD4A7] bg-[#2DD4A7]/10 text-[#2DD4A7]"
                      : "border-[#2A2E37] text-[#8B919C]"
                  }`}
                >
                  <Banknote size={12} /> Fixed
                </button>
              </div>

              <Field
                label={form.commissionType === "percentage" ? "Commission %" : "Commission (BDT)"}
                error={errors.commissionValue}
              >
                <input
                  type="number"
                  value={form.commissionValue}
                  onChange={(e) => update("commissionValue", e.target.value)}
                  placeholder={form.commissionType === "percentage" ? "e.g. 10" : "e.g. 150"}
                  className={inputClass(errors.commissionValue)}
                />
              </Field>

              <div className="mt-4 pt-4 border-t border-[#2A2E37] space-y-2 text-sm">
                <Row label="Sale price" value={fmt(price)} />
                <Row label="Seller earns" value={fmt(commissionAmount)} highlight />
                <Row label="You keep" value={fmt(companyKeeps)} />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={saving}
              className="w-full py-3 rounded-lg bg-[#2DD4A7] text-[#0F1115] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#27BD93] transition-colors disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Saving...
                </>
              ) : submitted ? (
                <>
                  <Check size={16} /> Product added
                </>
              ) : (
                <>
                  <Plus size={16} /> Add product
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, error, optional }) {
  return (
    <div>
      <label className="block text-sm text-[#8B919C] mb-1.5">
        {label}
        {optional && <span className="text-[#5A5F6A]"> (optional)</span>}
      </label>
      {children}
      {error && <p className="text-xs text-[#FF6B5E] mt-1">{error}</p>}
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[#8B919C]">{label}</span>
      <span className={highlight ? "text-[#2DD4A7] font-medium" : "text-[#E7E9EC]"}>{value}</span>
    </div>
  );
}

function inputClass(hasError) {
  return `w-full px-3 py-2.5 rounded-lg bg-[#1B1E25] border text-sm text-[#E7E9EC] placeholder:text-[#5A5F6A] outline-none transition-colors ${
    hasError ? "border-[#FF6B5E]" : "border-[#2A2E37] focus:border-[#2DD4A7]"
  }`;
}

function fmt(n) {
  return `৳${n.toFixed(2)}`;
}
