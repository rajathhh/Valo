"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Tag, Zap } from "lucide-react";
import { FareSummary } from "@/types/bus";
import { formatCurrency } from "@/lib/utils";

interface PaymentSummaryProps {
  fare: FareSummary;
  route: { from: string; to: string; departureTime: string; operator: { name: string } };
  passengerCount: number;
  appliedCoupon: string | null;
  onPay: () => void;
  isLoading: boolean;
}

export function PaymentSummary({ fare, route, passengerCount, appliedCoupon, onPay, isLoading }: PaymentSummaryProps) {
  return (
    <div
      className="rounded-3xl overflow-hidden sticky top-24"
      style={{ background: "linear-gradient(145deg, #16162a, #1a1a30)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Header */}
      <div className="p-5 border-b border-white/[0.06]">
        <h3 className="font-semibold text-white">Order Summary</h3>
        <div className="text-xs text-slate-500 mt-1">
          {route.from} → {route.to} · {passengerCount} passenger{passengerCount > 1 ? "s" : ""}
        </div>
      </div>

      {/* Breakdown */}
      <div className="p-5 space-y-3">
        <SummaryRow label="Base Fare" value={formatCurrency(fare.baseFare)} />
        <SummaryRow label="GST (5%)" value={formatCurrency(fare.gst)} />
        <SummaryRow label="Convenience Fee" value={formatCurrency(fare.convenienceFee)} />

        {fare.discount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-1.5">
              <Tag size={12} className="text-emerald-400" />
              <span className="text-emerald-400 text-sm">
                Coupon {appliedCoupon ? `(${appliedCoupon})` : "Discount"}
              </span>
            </div>
            <span className="text-emerald-400 text-sm font-medium">−{formatCurrency(fare.discount)}</span>
          </motion.div>
        )}

        <div className="border-t border-white/[0.06] pt-4 mt-2">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold">Total</span>
            <span className="text-2xl font-bold text-white">{formatCurrency(fare.total)}</span>
          </div>
          {fare.discount > 0 && (
            <div className="text-xs text-emerald-400 mt-1 text-right">
              You are saving {formatCurrency(fare.discount)}
            </div>
          )}
        </div>

        {/* Pay button */}
        <motion.button
          onClick={onPay}
          disabled={isLoading}
          className="btn-primary w-full mt-4 h-14 text-base"
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Zap size={16} />
              Pay {formatCurrency(fare.total)}
            </span>
          )}
        </motion.button>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-white/[0.05]">
          <div className="flex items-center gap-1.5 text-slate-600 text-xs">
            <Shield size={11} />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 text-xs">
            <Lock size={11} />
            <span>PCI DSS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className="text-slate-300 text-sm">{value}</span>
    </div>
  );
}
