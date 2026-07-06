"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Wifi, Zap, Wind, Droplets, Usb, MapPin, ChevronDown,
  Star, Users, Crosshair, Shield, Clock, ArrowRight, Sparkles, Gauge
} from "lucide-react";
import { BusRoute } from "@/types/bus";
import { bookingStore } from "@/lib/booking-store";
import { BusLogo } from "./bus-logo";
import { RatingBadge } from "./rating-badge";
import { TripTimeline } from "./trip-timeline";
import { formatCurrency, getAmenityLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi size={13} />,
  charging: <Zap size={13} />,
  blanket: <Wind size={13} />,
  water: <Droplets size={13} />,
  usb: <Usb size={13} />,
  "live-tracking": <Crosshair size={13} />,
};

const badgeConfig = {
  "best-price": {
    label: "Best Price",
    icon: <Sparkles size={10} />,
    className: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  },
  fastest: {
    label: "Fastest",
    icon: <Gauge size={10} />,
    className: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
  },
  premium: {
    label: "Premium",
    icon: <Star size={10} fill="currentColor" />,
    className: "bg-violet-500/15 text-violet-400 border border-violet-500/25",
  },
};

interface BusCardProps {
  route: BusRoute;
  index?: number;
}

export function BusCard({ route, index = 0 }: BusCardProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const handleViewSeats = () => {
    bookingStore.setSelectedRoute(route);
    router.push("/bus/seat");
  };

  const urgencyColor = route.seatsAvailable <= 5 ? "text-rose-400" : route.seatsAvailable <= 10 ? "text-amber-400" : "text-emerald-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="card overflow-hidden transition-all duration-300 hover:border-white/15 group"
      style={{ background: "linear-gradient(145deg, #16162a, #1a1a30)" }}
    >
      {/* Badge row */}
      {route.badges.length > 0 && (
        <div className="flex items-center gap-2 px-6 pt-4">
          {route.badges.map((badge) => (
            <span key={badge} className={cn("badge", badgeConfig[badge].className)}>
              {badgeConfig[badge].icon}
              {badgeConfig[badge].label}
            </span>
          ))}
        </div>
      )}

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <BusLogo initials={route.operator.logo} />
            <div>
              <div className="font-semibold text-white">{route.operator.name}</div>
              <div className="text-xs text-slate-500 mt-0.5 capitalize">
                {route.operator.type} · {route.operator.layout} Seater
              </div>
            </div>
          </div>
          <RatingBadge rating={route.operator.rating} reviewCount={route.operator.reviewCount} />
        </div>

        {/* Timeline */}
        <TripTimeline
          departureTime={route.departureTime}
          arrivalTime={route.arrivalTime}
          duration={route.duration}
          from={route.from}
          to={route.to}
          compact
        />

        {/* Boarding / Dropping */}
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin size={11} className="text-indigo-400" />
            <span>{route.boardingPoint}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin size={11} className="text-violet-400" />
            <span>{route.droppingPoint}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {route.operator.amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-slate-400"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              title={getAmenityLabel(amenity)}
            >
              {amenityIcons[amenity]}
              <span>{getAmenityLabel(amenity)}</span>
            </div>
          ))}
          {route.liveTracking && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-emerald-400"
              style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live</span>
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between mt-5 pt-5 border-t border-white/[0.06]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{formatCurrency(route.price)}</span>
              {route.originalPrice > route.price && (
                <span className="text-sm text-slate-600 line-through">{formatCurrency(route.originalPrice)}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Users size={11} className={urgencyColor} />
              <span className={cn("text-xs font-medium", urgencyColor)}>
                {route.seatsAvailable} seats left
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className={cn(
                "btn-ghost text-xs px-3 py-2",
                expanded && "text-indigo-400 border-indigo-500/30"
              )}
            >
              Details
              <ChevronDown
                size={14}
                className={cn("transition-transform duration-300", expanded && "rotate-180")}
              />
            </button>
            <motion.button
              onClick={handleViewSeats}
              className="btn-primary text-sm px-5 py-2.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Seats
              <ArrowRight size={14} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/[0.06]">
              <div className="pt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Bus Number</div>
                  <div className="text-sm text-white font-mono">{route.busNumber}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Total Seats</div>
                  <div className="text-sm text-white">{route.totalSeats} seats</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Cancellation</div>
                  <div className="text-sm text-white">{route.operator.cancellationPolicy}</div>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-xl flex items-start gap-2" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.15)" }}>
                <Shield size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-emerald-300/80">Booking is 100% secure and protected. Instant confirmation on your email & SMS.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
