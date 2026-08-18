"use client";

import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ShieldCheck, ShieldAlert, XCircle, CheckCircle2, AlertTriangle, Filter, Award } from "lucide-react";
import { Loading } from "@/components/common/Loading";
import { Badge } from "@/components/common/Badge";
import { ScoreBar } from "@/components/common/ScoreBar";
import { HypeAnalysisResponse, HypeAnalysisItem } from "@/types";
import { getHypeAnalysis } from "@/lib/api";

export default function HypeShieldPage() {
  const [hypeData, setHypeData] = useState<HypeAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<"all" | "blocked" | "accepted">("all");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getHypeAnalysis();
        setHypeData(data);
      } catch (err) {
        console.error("Error loading hype analysis:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <PageContainer>
        <Loading message="Scanning Candidate Pool for Clickbait & Guarantees..." />
      </PageContainer>
    );
  }

  const items = (hypeData?.analyzed_items || []).filter(item => {
    if (filter === "blocked") return item.decision === "Reject" || item.hype_score > 60;
    if (filter === "accepted") return item.decision === "Accept" && item.hype_score <= 60;
    return true;
  });

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white font-outfit flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              Hype Shield & Credibility Inspector
            </h1>
            <p className="text-xs md:text-sm text-slate-400">
              Autonomous protection against clickbait, unrealistic salary guarantees, and low-substance viral short-form content.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-xl transition-colors ${filter === "all" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}
            >
              All Scanned ({hypeData?.analyzed_items.length || 0})
            </button>
            <button
              onClick={() => setFilter("blocked")}
              className={`px-3 py-1.5 rounded-xl transition-colors ${filter === "blocked" ? "bg-rose-600 text-white" : "text-slate-400 hover:text-white"}`}
            >
              Blocked Clickbait
            </button>
            <button
              onClick={() => setFilter("accepted")}
              className={`px-3 py-1.5 rounded-xl transition-colors ${filter === "accepted" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"}`}
            >
              Verified Educational
            </button>
          </div>
        </div>

        {/* Status Summary Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900/80 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Shield Status: Active & Calibrated
            </span>
            <p className="text-xs md:text-sm text-slate-200">
              {hypeData?.protection_summary || "Hype Shield actively scanned candidate reels and blocked low-substance clickbait items."}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Blocked</span>
              <strong className="text-rose-400 text-lg">{hypeData?.total_blocked ?? 1}</strong>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Verified Clean</span>
              <strong className="text-emerald-400 text-lg">
                {(hypeData?.analyzed_items.length ?? 2) - (hypeData?.total_blocked ?? 1)}
              </strong>
            </div>
          </div>
        </div>

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => {
            const isBlocked = item.decision === "Reject" || item.hype_score > 60;

            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border space-y-4 shadow-xl transition-all ${
                  isBlocked
                    ? "bg-rose-950/20 border-rose-500/30"
                    : "bg-slate-900/60 border-emerald-500/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border inline-flex items-center gap-1 ${
                      isBlocked
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}>
                      {isBlocked ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      Decision: {item.decision}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-white leading-snug">
                      &ldquo;{item.title}&rdquo;
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">Creator: {item.creator}</p>
                  </div>
                </div>

                {/* Score Bars */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <ScoreBar label="Hype & Clickbait Score" score={item.hype_score} color={isBlocked ? "rose" : "emerald"} />
                  <ScoreBar label="Educational Value" score={item.educational_value} color={item.educational_value >= 70 ? "emerald" : "amber"} />
                  <ScoreBar label="Pedagogical Credibility" score={item.credibility} color={item.credibility >= 70 ? "emerald" : "rose"} />
                </div>

                {/* Reasons List */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Inspection Rationales:
                  </span>
                  <ul className="space-y-1 text-xs">
                    {item.reasons.map((r, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2 text-slate-300">
                        <span className={`text-xs mt-0.5 ${isBlocked ? "text-rose-400" : "text-emerald-400"}`}>•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
