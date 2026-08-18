"use client";

import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SmartSurpriseCard } from "@/components/insights/SmartSurprise";
import { InterestBridgeCard } from "@/components/insights/InterestBridge";
import { EmergingInterestCard } from "@/components/dashboard/EmergingInterest";
import { Loading } from "@/components/common/Loading";
import { Compass, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { getSmartSurprise, getInterestBridge, getEmergingInterests } from "@/lib/api";

export default function ExplorePage() {
  const [surprise, setSurprise] = useState<any>(null);
  const [bridges, setBridges] = useState<any[]>([]);
  const [emerging, setEmerging] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [s, b, e] = await Promise.all([
          getSmartSurprise(),
          getInterestBridge(),
          getEmergingInterests("student_001")
        ]);
        setSurprise(s);
        setBridges(b);
        setEmerging(e);
      } catch (err) {
        console.error("Error loading explore data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <PageContainer>
        <Loading message="Synthesizing 70/20/10 Exploration Matrix..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-outfit">
            Smart Exploration Engine (70 / 20 / 10 Rule)
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            Exploration safeguards that prevent algorithmic filter bubbles by allocating 70% to known interests, 20% to adjacent concepts, and 10% to serendipitous smart discoveries.
          </p>
        </div>

        {/* 70/20/10 Ratio Breakdown Visualizer */}
        <div className="p-6 rounded-3xl glass-panel border border-indigo-500/20 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" /> Dynamic Feed Allocation Ratio
          </span>
          <div className="w-full h-4 rounded-full overflow-hidden flex border border-white/10 p-[1px] bg-slate-900">
            <div className="h-full bg-indigo-500 rounded-l-full flex items-center justify-center text-[10px] font-bold text-white" style={{ width: "70%" }}>
              70% Known Interests
            </div>
            <div className="h-full bg-cyan-500 flex items-center justify-center text-[10px] font-bold text-white" style={{ width: "20%" }}>
              20% Adjacent
            </div>
            <div className="h-full bg-purple-500 rounded-r-full flex items-center justify-center text-[10px] font-bold text-white" style={{ width: "10%" }}>
              10% Surprise
            </div>
          </div>
        </div>

        <SmartSurpriseCard data={surprise} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <InterestBridgeCard bridges={bridges} />
          <EmergingInterestCard items={emerging} />
        </div>
      </div>
    </PageContainer>
  );
}
