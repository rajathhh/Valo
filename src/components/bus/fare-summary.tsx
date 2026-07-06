"use client";

import { motion } from "framer-motion";
import { Tag, Shield, ChevronRight } from "lucide-react";
import { FareSummary as FareSummaryType } from "@/types/bus";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface FareSummaryProps {
  fare: FareSummaryType;
  selectedSeats: string[];
  nextPath?: string;
  nextLabel?: string;
  appliedCoupon?: string | null;
  showCouponLink?: boolean;
  onContinue?: () => void;
}

export function FareSummary({
  fare,
  selectedSeats,
  nextPath,
  nextLabel = "Continue",
  appliedCoupon,
  showCouponLink = false,
  onContinue,
}: FareSummaryProps) {
  const router = useRouter();

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else if (nextPath) {
      router.push(nextPath);
    }
  };

  return (
    <div
      className="rounded-3xl overflow-hidden sticky top-24"
      style={{ background: "linear-gradient(145deg, #16162a, #1a1a30)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="p-5 border-b border-white/[0.06]">
        <h3 className="font-semibold text-white">Fare Summary</h3>
        {selectedSeats.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {selectedSeats.map((s) => (
              <span key={s} className="px-2 py-0.5 rounded-lg text-xs text-indigo-300" style={{ background: "rgba(79,70,229,0.12)", border: "1px solid rgba(79,70,229,0.2)" }}>
                Seat {s}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <FareRow label="Base Fare" value={formatCurrency(fare.baseFare)} />
        <FareRow label="GST (5%)" value={formatCurrency(fare.gst)} />
        <FareRow label="Convenience Fee" value={formatCurrency(fare.convenienceFee)} />

        {fare.discount > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
            <FareRow
              label={appliedCoupon ? `Coupon (${appliedCoupon})` : "Discount"}
              value={`−${formatCurrency(fare.discount)}`}
              highlight
            />
          </motion.div>
        )}

        <div className="border-t border-white/[0.06] pt-3 mt-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">Total Amount</span>
            <span className="text-xl font-bold text-white">{formatCurrency(fare.total)}</span>
          </div>
          {fare.discount > 0 && (
            <div className="text-xs text-emerald-400 mt-1 text-right">
              You save {formatCurrency(fare.discount)}
            </div>
          )}
        </div>

        {showCouponLink && (
          <button
            onClick={() => router.push("/bus/offers")}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm mt-2 transition-all hover:border-indigo-500/30"
            style={{ background: "rgba(79,70,229,0.08)", border: "1px solid rgba(79,70,229,0.15)" }}
          >
            <div className="flex items-center gap-2 text-indigo-400">
              <Tag size={14} />
              <span className="font-medium">Apply Coupon</span>
            </div>
            <ChevronRight size={14} className="text-slate-500" />
          </button>
        )}

        <motion.button
          onClick={handleContinue}
          disabled={selectedSeats.length === 0}
          className="btn-primary w-full mt-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          whileHover={selectedSeats.length > 0 ? { scale: 1.02 } : {}}
          whileTap={selectedSeats.length > 0 ? { scale: 0.98 } : {}}
        >
          {nextLabel}
        </motion.button>

        <div className="flex items-center justify-center gap-1.5 mt-1">
          <Shield size={11} className="text-slate-500" />
          <span className="text-xs text-slate-500">Secure & Encrypted Payment</span>
        </div>
      </div>
    </div>
  );
}

function FareRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={highlight ? "text-emerald-400 text-sm" : "text-slate-400 text-sm"}>{label}</span>
      <span className={highlight ? "text-emerald-400 text-sm font-medium" : "text-slate-300 text-sm"}>{value}</span>
    </div>
  );
}
