"use client";

import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { InterestGraph } from "@/components/graph/InterestGraph";
import { InterestBridgeCard } from "@/components/insights/InterestBridge";
import { Loading } from "@/components/common/Loading";
import { InterestGraphResponse } from "@/types";
import { getInterestGraph, getInterestBridge } from "@/lib/api";

export default function GraphPage() {
  const [graphData, setGraphData] = useState<InterestGraphResponse | null>(null);
  const [bridges, setBridges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [graph, b] = await Promise.all([
          getInterestGraph("Software Engineering"),
          getInterestBridge()
        ]);
        setGraphData(graph);
        setBridges(b);
      } catch (err) {
        console.error("Error loading graph data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <PageContainer>
        <Loading message="Building Semantic Knowledge Hierarchy..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-outfit">
            Semantic Interest Graph
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            Interactive visualization of your personal technology knowledge tree, parent domains, active specializations, and latent topic bridges.
          </p>
        </div>

        <InterestGraph graphData={graphData || undefined} />

        <InterestBridgeCard bridges={bridges} />
      </div>
    </PageContainer>
  );
}
