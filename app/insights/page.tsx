"use client";

import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { InterestEvolutionCard } from "@/components/insights/InterestEvolution";
import { InterestBridgeCard } from "@/components/insights/InterestBridge";
import { SmartSurpriseCard } from "@/components/insights/SmartSurprise";
import { CounterfactualCard } from "@/components/insights/Counterfactual";
import { CareerAlignmentCard } from "@/components/dashboard/CareerAlignment";
import { Loading } from "@/components/common/Loading";
import { getEvolution, getInterestBridge, getSmartSurprise, getCareerAlignment } from "@/lib/api";

export default function InsightsPage() {
  const [evolution, setEvolution] = useState<any>(null);
  const [bridges, setBridges] = useState<any[]>([]);
  const [surprise, setSurprise] = useState<any>(null);
  const [career, setCareer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [evo, b, s, c] = await Promise.all([
          getEvolution("student_001"),
          getInterestBridge(),
          getSmartSurprise(),
          getCareerAlignment("student_001")
        ]);
        setEvolution(evo);
        setBridges(b);
        setSurprise(s);
        setCareer(c);
      } catch (err) {
        console.error("Error loading insights:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <PageContainer>
        <Loading message="Aggregating Deep Latent Insights & Simulations..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-outfit">
            AI Insights & Counterfactual Simulations
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            Deep-dive telemetry into cross-topic synergy, historical growth vectors, career alignment exploration, and &ldquo;What If?&rdquo; simulations.
          </p>
        </div>

        <InterestEvolutionCard data={evolution} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <CounterfactualCard />
          <CareerAlignmentCard alignments={career?.alignments} />
        </div>

        <InterestBridgeCard bridges={bridges} />
        <SmartSurpriseCard data={surprise} />
      </div>
    </PageContainer>
  );
}
