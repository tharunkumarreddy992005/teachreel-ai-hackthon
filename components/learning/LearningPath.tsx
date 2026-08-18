"use client";

import React from "react";
import { MapPin, CheckCircle2, Clock, Play, ArrowDown, Sparkles } from "lucide-react";
import { LearningStep, LearningPathResponse } from "@/types";
import { Badge } from "@/components/common/Badge";
import { getDifficultyBadgeColor } from "@/lib/utils";

interface LearningPathProps {
  pathData?: LearningPathResponse;
  onSelectStepReel?: (reelId?: string) => void;
}

export const LearningPathWidget: React.FC<LearningPathProps> = ({
  pathData,
  onSelectStepReel,
}) => {
  const steps: LearningStep[] = pathData?.steps || [
    { step: 1, topic: "Java & OOP Core", difficulty: "Beginner", status: "Completed", estimated_time: "15 mins", reel_title: "POV: Your Java code works on the first try 😂" },
    { step: 2, topic: "DSA (Arrays & Pointers)", difficulty: "Intermediate", status: "In Progress", estimated_time: "30 mins", reel_title: "Two-Pointer Technique: Master LeetCode Mediums" },
    { step: 3, topic: "Backend REST APIs", difficulty: "Intermediate", status: "Next Up", estimated_time: "45 mins", reel_title: "REST API Best Practices: Status Codes & Idempotency" },
    { step: 4, topic: "Databases & Indexing", difficulty: "Intermediate", status: "Upcoming", estimated_time: "1 hour", reel_title: "Why SQL Injection Still Happens and How Parameterized Queries Fix It" },
    { step: 5, topic: "System Design & Scalability", difficulty: "Intermediate", status: "Upcoming", estimated_time: "1.5 hours", reel_title: "How Backend Engineers Think About System Design" },
    { step: 6, topic: "Cloud & Container Deployment", difficulty: "Advanced", status: "Upcoming", estimated_time: "2 hours", reel_title: "Deploying Containers with Docker & ECS" }
  ];

  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-6 border border-indigo-500/20 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Adaptive Learning Roadmap <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">Target: Backend Engineer</span>
            </h2>
            <p className="text-xs text-slate-400">Step-by-step curriculum bridging latent interests into structured engineering skills</p>
          </div>
        </div>

        <Badge variant="indigo" size="sm">
          Est. Total: 6.5 Hours
        </Badge>
      </div>

      {/* Step by Step Timeline */}
      <div className="space-y-3 relative">
        {steps.map((step, idx) => {
          const isCompleted = step.status === "Completed";
          const isInProgress = step.status === "In Progress";
          const isNext = step.status === "Next Up";

          return (
            <div
              key={step.step}
              className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isInProgress
                  ? "bg-indigo-950/30 border-indigo-500/40 shadow-lg shadow-indigo-500/10"
                  : isCompleted
                  ? "bg-slate-900/40 border-emerald-500/20 opacity-80"
                  : "bg-slate-900/40 border-white/5"
              }`}
            >
              {/* Left Column: Number, Topic, and Status */}
              <div className="flex items-start md:items-center gap-3.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 border ${
                    isCompleted
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                      : isInProgress
                      ? "bg-indigo-600 border-indigo-400 text-white animate-pulse"
                      : "bg-slate-800 border-white/10 text-slate-400"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.step}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs md:text-sm font-bold text-white">{step.topic}</h4>
                    <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full border ${getDifficultyBadgeColor(step.difficulty)}`}>
                      {step.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-300/90 font-medium">
                    Reel: &ldquo;{step.reel_title}&rdquo;
                  </p>
                </div>
              </div>

              {/* Right Column: Time, Status Badge & Action */}
              <div className="flex items-center justify-between md:justify-end gap-3 pl-11 md:pl-0">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{step.estimated_time}</span>
                </div>

                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border ${
                    isCompleted
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : isInProgress
                      ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                      : isNext
                      ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
                      : "bg-slate-800 text-slate-400 border-white/5"
                  }`}
                >
                  {step.status}
                </span>

                <button
                  onClick={() => onSelectStepReel && onSelectStepReel(step.reel_id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors"
                  title="Watch Concept Reel"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
