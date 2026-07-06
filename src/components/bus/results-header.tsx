"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown, Search } from "lucide-react";

interface ResultsHeaderProps {
  from: string;
  to: string;
  date: string;
  totalResults: number;
}

export function ResultsHeader({ from, to, date, totalResults }: ResultsHeaderProps) {
  return (
    <div className="sticky top-0 z-30 py-4" style={{ background: "linear-gradient(to bottom, #0f0f1a, rgba(15,15,26,0.95))", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Route pill */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl cursor-pointer transition-all hover:border-white/15"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="font-semibold text-white">{from}</span>
              <ArrowRight size={14} className="text-indigo-400" />
              <span className="font-semibold text-white">{to}</span>
              <span className="text-slate-500">·</span>
              <Calendar size={13} className="text-slate-400" />
              <span className="text-slate-300 text-sm">{date}</span>
              <ChevronDown size={13} className="text-slate-500 ml-1" />
            </div>
          </motion.div>

          {/* Results count and modify */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-sm text-slate-400">
              <span className="text-white font-semibold">{totalResults}</span> buses found
            </span>
            <button className="btn-ghost text-xs px-3 py-2">
              <Search size={13} />
              Modify Search
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
