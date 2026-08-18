"use client";

import React from "react";
import { Zap, BookOpen, CheckCircle2 } from "lucide-react";
import { MicroLearning } from "@/types";

interface MicroLearningProps {
  microLearning?: MicroLearning;
}

export const MicroLearningCard: React.FC<MicroLearningProps> = ({ microLearning }) => {
  const data = microLearning || {
    headline: "30-SECOND TAKEAWAY: System Design Foundations",
    key_points: [
      "1. Horizontal Scaling: Add lightweight compute nodes behind a Load Balancer rather than provisioning a single massive instance.",
      "2. Redis Caching: Intercept database reads in sub-millisecond RAM to eliminate database connection saturation.",
      "3. Message Queues (Kafka): Decouple synchronous API requests into asynchronous, fault-tolerant event streams."
    ]
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/20 border border-indigo-500/30 p-6 md:p-8 space-y-4 shadow-xl">
      <div className="flex items-center gap-2 text-indigo-400">
        <Zap className="w-5 h-5 fill-current" />
        <h3 className="text-sm md:text-base font-extrabold uppercase tracking-wider text-white">
          {data.headline}
        </h3>
      </div>

      <div className="space-y-2.5">
        {data.key_points.map((pt, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/60 border border-white/5 text-xs md:text-sm text-slate-200"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">{pt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
