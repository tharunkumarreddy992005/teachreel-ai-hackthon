"use client";

import React from "react";
import { ShieldAlert, XCircle, AlertTriangle, Layers, ZapOff } from "lucide-react";
import { RejectedCandidate } from "@/types";

interface RejectedRecommendationsProps {
  rejectedList?: RejectedCandidate[];
}

export const RejectedRecommendationsCard: React.FC<RejectedRecommendationsProps> = ({ rejectedList }) => {
  const defaultRejected: RejectedCandidate[] = [
    {
      reel_id: "reel_012",
      title: "10 AI Tools that GUARANTEE a $200k Tech Job in 30 Days (No Coding!)",
      reason: "High hype (96%), unrealistic career guarantee, low technical evidence (educational value 22%).",
      decision: "Reject",
      hype_score: 96,
      educational_value: 22,
      credibility: 14
    },
    {
      reel_id: "reel_013",
      title: "Complete Java Tutorial for Absolute Beginners (Part 1: Hello World)",
      reason: "Too repetitive. User already demonstrates familiarity with OOP/Java syntax and developer lifestyle humor.",
      decision: "Reject",
      hype_score: 8,
      educational_value: 65,
      credibility: 85
    },
    {
      reel_id: "reel_014",
      title: "Advanced Kubernetes eBPF Kernel Packet Inspection & CNI Mesh",
      reason: "Too difficult. Advanced kernel-level systems programming is too steep for current intermediate profile.",
      decision: "Reject",
      hype_score: 5,
      educational_value: 94,
      credibility: 96
    }
  ];

  const items = (rejectedList && rejectedList.length > 0) ? rejectedList : defaultRejected;

  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-6 border border-rose-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Why NOT These Recommendations?</h3>
            <p className="text-xs text-slate-400">Candidate rejection filter & anti-hype guardrails</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
          {items.length} Candidates Rejected
        </span>
      </div>

      {/* List of Rejected Candidates */}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2.5 hover:border-rose-500/20 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                REJECT
              </span>
            </div>

            <p className="text-xs text-rose-300/80 pl-6 leading-relaxed">
              <strong>Reason:</strong> {item.reason}
            </p>

            {item.hype_score > 50 && (
              <div className="flex items-center gap-3 text-[10px] text-slate-400 pl-6 pt-1">
                <span>Hype Score: <strong className="text-rose-400">{item.hype_score}%</strong></span>
                <span>•</span>
                <span>Educational Value: <strong className="text-amber-400">{item.educational_value}%</strong></span>
                <span>•</span>
                <span>Credibility: <strong className="text-slate-300">{item.credibility}%</strong></span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
