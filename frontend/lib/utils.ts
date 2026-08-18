export function cn(...inputs: any[]): string {
  return inputs
    .flat()
    .filter(Boolean)
    .join(" ");
}

export function formatPercent(val: number): string {
  return `${Math.round(val)}%`;
}

export function getDifficultyBadgeColor(difficulty: string): string {
  const d = (difficulty || "").toLowerCase();
  if (d === "beginner") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (d === "intermediate") return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
  if (d === "advanced") return "bg-rose-500/10 text-rose-400 border-rose-500/20";
  return "bg-slate-500/10 text-slate-400 border-slate-500/20";
}

export function getScoreColor(score: number): string {
  if (score >= 85) return "text-emerald-400";
  if (score >= 60) return "text-indigo-400";
  if (score >= 40) return "text-amber-400";
  return "text-rose-400";
}
