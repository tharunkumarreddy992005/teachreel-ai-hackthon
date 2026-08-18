import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export const Loading: React.FC<LoadingProps> = ({
  message = "Loading AI Insights...",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative">
        <Loader2 className={`${sizeClasses[size]} text-indigo-400 animate-spin`} />
        <div className="absolute inset-0 blur-md bg-indigo-500/30 -z-10 rounded-full" />
      </div>
      <p className="text-xs font-semibold text-slate-400 animate-pulse">{message}</p>
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-2xl glass-panel text-center space-y-4 border border-dashed border-white/10">
      {icon && <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{icon}</div>}
      <div className="space-y-1 max-w-sm">
        <h4 className="text-sm font-bold text-slate-200">{title}</h4>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
