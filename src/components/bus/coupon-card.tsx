"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Tag, Check, Copy, Building2, Wallet, Sparkles, ChevronRight } from "lucide-react";
import { Coupon } from "@/types/bus";
import { cn } from "@/lib/utils";

interface CouponCardProps {
  coupon: Coupon;
  isApplied: boolean;
  onApply: (coupon: Coupon) => void;
  onRemove: (coupon: Coupon) => void;
  totalAmount: number;
}

const categoryConfig = {
  cashback: { icon: <Sparkles size={14} />, color: "text-amber-400", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
  bank: { icon: <Building2 size={14} />, color: "text-blue-400", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
  wallet: { icon: <Wallet size={14} />, color: "text-violet-400", bg: "rgba(124,58,237,0.1)", border: "rgba(124,58,237,0.2)" },
  general: { icon: <Tag size={14} />, color: "text-emerald-400", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
};

export function CouponCard({ coupon, isApplied, onApply, onRemove, totalAmount }: CouponCardProps) {
  const config = categoryConfig[coupon.category];
  const isEligible = totalAmount >= coupon.minAmount;

  let savingsText = "";
  if (coupon.discountType === "flat") {
    savingsText = `Save ₹${coupon.discount}`;
  } else {
    const savings = Math.min((totalAmount * coupon.discount) / 100, coupon.maxDiscount ?? Infinity);
    savingsText = `Save up to ₹${Math.round(savings)}`;
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(coupon.code);
  };

  return (
    <motion.div
      layout
      className={cn(
        "rounded-3xl overflow-hidden transition-all duration-300",
        isApplied && "ring-1 ring-emerald-500/40",
        !isEligible && "opacity-60"
      )}
      style={{
        background: isApplied
          ? "linear-gradient(145deg, rgba(16,185,129,0.08), rgba(16,185,129,0.04))"
          : "linear-gradient(145deg, #16162a, #1a1a30)",
        border: isApplied ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          {/* Category icon */}
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: config.bg, border: `1px solid ${config.border}` }}
          >
            <span className={config.color}>{config.icon}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white text-sm">{coupon.title}</div>
            <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">{coupon.description}</div>

            {/* Code */}
            <div className="flex items-center gap-2 mt-3">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.12)" }}
              >
                <span className="font-mono text-sm font-bold text-white tracking-widest">{coupon.code}</span>
                <button onClick={handleCopy} className="text-slate-500 hover:text-slate-300 transition-colors">
                  <Copy size={12} />
                </button>
              </div>
              <span className={cn("text-xs font-semibold", config.color)}>{savingsText}</span>
            </div>

            {!isEligible && (
              <div className="text-xs text-rose-400/80 mt-1.5">
                Min. booking amount ₹{coupon.minAmount} required
              </div>
            )}
          </div>

          {/* Apply button */}
          <div className="flex-shrink-0">
            <AnimatePresence mode="wait">
              {isApplied ? (
                <motion.button
                  key="applied"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => onRemove(coupon)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-400 transition-all hover:text-rose-400"
                  style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}
                >
                  <Check size={12} />
                  Applied
                </motion.button>
              ) : (
                <motion.button
                  key="apply"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => isEligible && onApply(coupon)}
                  disabled={!isEligible}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-300 transition-all hover:text-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "rgba(79,70,229,0.12)", border: "1px solid rgba(79,70,229,0.25)" }}
                >
                  Apply
                  <ChevronRight size={12} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
