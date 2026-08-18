# TechReel AI - System Architecture

## Overview

TechReel AI is an end-to-end AI recommender system designed to guide students from passive entertainment scrolling toward structured technology discovery, latent domain inference, and career exploration.

```
                    TECHREEL AI SYSTEM ARCHITECTURE
                                   |
                     Next.js 14/15 Frontend (App Router)
                                   |
                              REST API
                                   |
                       FastAPI Python Backend
                                   |
                        Recommendation Agent
                                   |
       ┌───────────────────────────┼───────────────────────────┐
       |                           |                           |
   AI Services           Recommendation Engine          Database Layer
 (Live / Demo LLM &     (7-Factor Utility Function,    (MongoDB Atlas with
 Local 64D Embeddings)   Latent Discovery, Hype Shield) In-Memory Fallback)
```

## Key Architectural Principles

1. **Frontend Isolation**: Next.js communicates strictly with the FastAPI REST API layer. The frontend never accesses MongoDB directly.
2. **Deterministic Demo Resilience**: The system features zero-network-dependency `DemoAIProvider` and `InMemoryCollection` fallbacks, ensuring hackathon presentations never fail due to API rate limits or offline database clusters.
3. **Multi-Factor Intent Decomposition**: Distinguishes high watch time on memes (91% Entertainment) from true educational engagement (21% Learning), avoiding keyword repetition loops.
4. **Transparent Explainability**: Every recommendation includes a full decision trace (`why_path`), rejected alternatives with explicit reasons, and 30-second micro-learning takeaways.
