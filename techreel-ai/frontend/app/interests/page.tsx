"use client";

import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { InterestDNA } from "@/components/dashboard/InterestDNA";
import { HiddenInterestCard } from "@/components/dashboard/HiddenInterest";
import { InterestEvolutionCard } from "@/components/insights/InterestEvolution";
import { Loading } from "@/components/common/Loading";
import { InterestDNAResponse } from "@/types";
import { getInterestDNA, getEvolution } from "@/lib/api";

export default function InterestsPage() {
  const [dnaData, setDnaData] = useState<InterestDNAResponse | null>(null);
  const [evolutionData, setEvolutionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [dna, evo] = await Promise.all([
          getInterestDNA("student_001"),
          getEvolution("student_001")
        ]);
        setDnaData(dna);
        setEvolutionData(evo);
      } catch (err) {
        console.error("Error loading interest data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <PageContainer>
        <Loading message="Profiling Latent Interest DNA..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-outfit">
            My Interest DNA & Latent Vectors
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            Multi-dimensional interest tracking inferred from real-time behavior, watch percentages, replays, and cross-domain semantic synthesis.
          </p>
        </div>

        {dnaData?.hidden_interest && (
          <HiddenInterestCard hiddenInterest={dnaData.hidden_interest} />
        )}

        {dnaData?.interest_dna && (
          <InterestDNA items={dnaData.interest_dna} />
        )}

        <InterestEvolutionCard data={evolutionData} />
      </div>
    </PageContainer>
  );
}
