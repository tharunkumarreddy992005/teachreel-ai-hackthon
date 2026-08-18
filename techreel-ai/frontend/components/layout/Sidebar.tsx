"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Dna,
  Network,
  Sparkles,
  Compass,
  MapPin,
  TrendingUp,
  ShieldAlert,
  Bot,
  Zap,
  CheckCircle2,
  Tv
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "My Interests", href: "/interests", icon: Dna },
  { name: "Interest Graph", href: "/graph", icon: Network },
  { name: "Recommendations", href: "/recommendations", icon: Sparkles },
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Learning Path", href: "/learning", icon: MapPin },
  { name: "Insights", href: "/insights", icon: TrendingUp },
  { name: "Hype Shield", href: "/hype-shield", icon: ShieldAlert },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 z-40 bg-[#0c1222]/90 backdrop-blur-xl border-r border-white/5 flex flex-col justify-between p-4 select-none">
      {/* Brand Header */}
      <div>
        <Link href="/" className="flex items-center gap-3 px-2 py-3 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
              <Tv className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="font-extrabold tracking-wider text-base text-white flex items-center gap-1.5">
              TECHREEL <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">AI</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Smart Discovery Recommender</p>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 group relative",
                  isActive
                    ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-lg shadow-indigo-500/10"
                    : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                <span>{item.name}</span>
                {isActive && (
                  <div className="absolute right-2.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Badges */}
      <div className="space-y-2 pt-4 border-t border-white/5">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-indigo-400" /> AI Engine
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Demo Mode
            </span>
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Active
            </span>
          </div>
        </div>

        <p className="text-[10px] text-center text-slate-400 italic">
          &ldquo;Don&apos;t stop scrolling. Upgrade what you discover.&rdquo;
        </p>
      </div>
    </aside>
  );
};
