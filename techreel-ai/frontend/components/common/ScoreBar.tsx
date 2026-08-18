import React from "react";
import { cn } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  score: number;
  maxScore?: number;
  color?: "indigo" | "emerald" | "amber" | "rose" | "cyan" | "violet";
  showValue?: boolean;
  className?: string;
}

export const ScoreBar: React.FC<ScoreBarProps> = ({
  label,
  score,
  maxScore = 100,
  color = "indigo",
  showValue = true,
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));

  const barColors = {
    indigo: "bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.5)]",
    emerald: "bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]",
    amber: "bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]",
    rose: "bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.5)]",
    cyan: "bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]",
    violet: "bg-gradient-to-r from-violet-600 to-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.5)]",
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-300 font-medium">{label}</span>
        {showValue && (
          <span className="font-bold text-slate-100">{Math.round(score)}%</span>
        )}
      </div>
      <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden p-[1px] border border-white/5">
        <div
          className={cn("h-full rounded-full transition-all duration-500", barColors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
