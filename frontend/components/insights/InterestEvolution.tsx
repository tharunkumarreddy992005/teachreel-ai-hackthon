"use client";

import React from "react";
import { TrendingUp, Sparkles } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

interface EvolutionData {
  timeline: Array<{
    week: string;
    Programming: number;
    Gaming: number;
    "Software Engineering"?: number;
    AI?: number;
  }>;
  key_metric: string;
  summary: string;
}

export const InterestEvolutionCard: React.FC<{ data?: EvolutionData }> = ({ data }) => {
  const evolution = data || {
    timeline: [
      { week: "Week 1", Programming: 30, Gaming: 70, "Software Engineering": 15, AI: 10 },
      { week: "Week 2", Programming: 42, Gaming: 58, "Software Engineering": 28, AI: 22 },
      { week: "Week 3", Programming: 56, Gaming: 44, "Software Engineering": 48, AI: 35 },
      { week: "Week 4", Programming: 72, Gaming: 25, "Software Engineering": 87, AI: 51 }
    ],
    key_metric: "Programming interest increased +42% over 4 weeks.",
    summary: "Entertainment-heavy gaming content transitioned into disciplined software engineering and systems architecture discovery."
  };

  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-6 border border-indigo-500/20 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Interest Evolution <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">+42% Growth</span>
            </h2>
            <p className="text-xs text-slate-400">Historical trend progression from passive gaming to active software engineering</p>
          </div>
        </div>
      </div>

      {/* Recharts Line Chart */}
      <div className="h-64 w-full bg-[#070b14]/60 rounded-2xl p-4 border border-white/5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={evolution.timeline} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="week" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#fff"
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
            <Line
              type="monotone"
              dataKey="Software Engineering"
              stroke="#818cf8"
              strokeWidth={3}
              dot={{ r: 4, fill: "#818cf8" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Programming"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#10b981" }}
            />
            <Line
              type="monotone"
              dataKey="AI"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ r: 3, fill: "#06b6d4" }}
            />
            <Line
              type="monotone"
              dataKey="Gaming"
              stroke="#f43f5e"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: "#f43f5e" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-xs md:text-sm text-slate-200">
        <strong className="text-emerald-400 block mb-1">Key Growth Insight:</strong>
        &ldquo;{evolution.summary}&rdquo;
      </div>
    </div>
  );
};
