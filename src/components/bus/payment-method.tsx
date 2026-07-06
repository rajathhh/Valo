"use client";

import { motion } from "framer-motion";
import { CreditCard, Wallet, Building2, Smartphone, Calculator, Check, Flame } from "lucide-react";
import { PaymentMethod as PaymentMethodType } from "@/types/bus";
import { cn } from "@/lib/utils";

const methodIcons: Record<string, React.ReactNode> = {
  upi: <Smartphone size={20} />,
  card: <CreditCard size={20} />,
  wallet: <Wallet size={20} />,
  netbanking: <Building2 size={20} />,
  emi: <Calculator size={20} />,
  bank: <Building2 size={20} />,
};

const methodColors: Record<string, { bg: string; border: string; text: string }> = {
  upi: { bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)", text: "#34d399" },
  card: { bg: "rgba(79,70,229,0.1)", border: "rgba(79,70,229,0.25)", text: "#818cf8" },
  wallet: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", text: "#fbbf24" },
  netbanking: { bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)", text: "#60a5fa" },
  emi: { bg: "rgba(236,72,153,0.1)", border: "rgba(236,72,153,0.25)", text: "#f472b6" },
};

interface PaymentMethodProps {
  method: PaymentMethodType;
  isSelected: boolean;
  onSelect: (method: PaymentMethodType) => void;
  index?: number;
}

export function PaymentMethodCard({ method, isSelected, onSelect, index = 0 }: PaymentMethodProps) {
  const colors = methodColors[method.type] || methodColors.card;

  return (
    <motion.button
      onClick={() => onSelect(method)}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left",
        isSelected && "ring-1 ring-indigo-500/40"
      )}
      style={{
        background: isSelected ? "linear-gradient(145deg, rgba(79,70,229,0.1), rgba(124,58,237,0.08))" : "rgba(255,255,255,0.03)",
        border: isSelected ? "1px solid rgba(79,70,229,0.3)" : "1px solid rgba(255,255,255,0.06)",
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
      >
        {methodIcons[method.type]}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white text-sm">{method.name}</span>
          {method.isPopular && (
            <span className="badge bg-amber-500/15 text-amber-400 border border-amber-500/25 text-[10px]">
              <Flame size={8} />
              Popular
            </span>
          )}
        </div>
        {method.description && (
          <div className="text-xs text-slate-500 mt-0.5">{method.description}</div>
        )}
      </div>

      {/* Radio */}
      <div
        className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
          isSelected ? "border-indigo-500 bg-indigo-500" : "border-white/20"
        )}
      >
        {isSelected && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Check size={10} className="text-white" strokeWidth={3} />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
