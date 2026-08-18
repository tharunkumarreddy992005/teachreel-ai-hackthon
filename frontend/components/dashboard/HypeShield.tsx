"use client";

import React from "react";
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";
import { HypeAnalysisItem } from "@/types";

interface HypeShieldWidgetProps {
  items?: HypeAnalysisItem[];
}

export const HypeShieldWidget: React.FC<HypeShieldWidgetProps> = ({ items }) => {
  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-5 border border-emerald-500/20 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Hype Shield <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Active</span>
            </h3>
            <p className="text-xs text-slate-400">Filters clickbait, $200k guarantees, and low-substance spam</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Flagged Item */}
        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-rose-400 flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5" /> Blocked Clickbait
            </span>
            <span className="text-xs font-bold text-rose-400">Hype: 96%</span>
          </div>
          <h4 className="text-xs font-bold text-slate-200">
            &ldquo;10 AI Tools that GUARANTEE a $200k Tech Job in 30 Days&rdquo;
          </h4>
          <p className="text-[11px] text-rose-300/80 leading-relaxed">
            Exaggerated outcome claim, zero engineering rigor, and clickbait keyword density.
          </p>
        </div>

        {/* Accepted Item */}
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified Pedagogical
            </span>
            <span className="text-xs font-bold text-emerald-400">Edu Value: 91%</span>
          </div>
          <h4 className="text-xs font-bold text-slate-200">
            &ldquo;How Backend Engineers Think About System Design&rdquo;
          </h4>
          <p className="text-[11px] text-emerald-300/80 leading-relaxed">
            High credibility architectural principles (caching, load balancing, sharding).
          </p>
        </div>
      </div>
    </div>
  );
};
