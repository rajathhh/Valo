"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Tag, CheckCircle } from "lucide-react";
import { Coupon } from "@/types/bus";
import { CouponCard } from "./coupon-card";

interface CouponListProps {
  coupons: Coupon[];
  appliedCouponId: string | null;
  totalAmount: number;
  onApply: (coupon: Coupon) => void;
  onRemove: (coupon: Coupon) => void;
}

const CATEGORIES = ["All", "Cashback", "Bank", "Wallet", "General"] as const;

export function CouponList({ coupons, appliedCouponId, totalAmount, onApply, onRemove }: CouponListProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = coupons.filter((c) => {
    const matchSearch = c.code.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || c.category.toLowerCase() === activeCategory.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search coupons or enter promo code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            style={
              activeCategory === cat
                ? { background: "linear-gradient(135deg, rgba(79,70,229,0.3), rgba(124,58,237,0.3))", border: "1px solid rgba(79,70,229,0.4)", color: "#a5b4fc" }
                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748b" }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Applied banner */}
      <AnimatePresence>
        {appliedCouponId && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 rounded-2xl"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
          >
            <CheckCircle size={15} className="text-emerald-400" />
            <span className="text-sm text-emerald-300 font-medium">Coupon applied successfully! Your discount has been calculated.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coupon grid */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              isApplied={coupon.id === appliedCouponId}
              onApply={onApply}
              onRemove={onRemove}
              totalAmount={totalAmount}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Tag size={32} className="text-slate-700 mx-auto mb-3" />
          <div className="text-slate-400 font-medium">No coupons found</div>
          <div className="text-slate-600 text-sm mt-1">Try a different search or category</div>
        </div>
      )}
    </div>
  );
}
