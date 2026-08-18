# TechReel AI

<div align="center">
  <h3>"Don't stop scrolling. Upgrade what you discover."</h3>
  <p><strong>AI-powered Latent Interest Discovery & Educational Recommender for Short-Form Video</strong></p>
</div>

---

## The Core Differentiator

| Traditional Recommender | TechReel AI Recommender |
| :--- | :--- |
| **"What did the student watch?"** | **"What is the student becoming interested in?"** |
| Java Meme $\to$ Java Tutorial $\to$ Java Meme | Java + Coding Interview + SWE Lifestyle + GitHub + Hardware $\to$ **Software Engineering** $\to$ High-Level System Design, Backend, DSA, Cloud |
| Traps user in shallow repetition loops | Discovers latent curiosity and elevates career exploration |

---

## Quick Start (Run Locally)

### Terminal 1: Frontend (Next.js 14)

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at **`http://localhost:3000`**.

### Terminal 2: Backend (FastAPI Python)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows (or source venv/bin/activate on macOS/Linux)
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The backend API will run at **`http://localhost:8000`** with interactive Swagger documentation at **`http://localhost:8000/docs`**.

---

## Key Features

1. **Latent Interest Discovery**: Cross-synthesizes disparate entertainment and lifestyle interactions into broad engineering domains.
2. **Intent Decomposition**: Evaluates 4 dimensions (Entertainment, Learning, Career, Curiosity). High watch time on humor $\ne$ high learning intent.
3. **Multi-Objective 7-Factor Ranking**: Utility function balancing Interest Match (30%), Learning Value (20%), Career Relevance (15%), Credibility (10%), Novelty (10%), Difficulty Fit (10%), and Diversity (5%).
4. **Hype Shield**: Real-time filter eliminating clickbait, unrealistic salary guarantees, and low-substance spam.
5. **Content Fatigue Warning**: Detects repetitive syntax tutorials and automatically branches to adjacent systems topics.
6. **Interactive Semantic Interest Graph**: Clickable hierarchical network of domains, specializations, and concepts.
7. **Adaptive Learning Path**: Step-by-step 6-milestone roadmap from Java core to distributed cloud deployment.
8. **30-Second Micro-Learning & Interactive Quiz**: High-yield conceptual summaries and embedded assessments.
9. **Counterfactual AI Simulation**: Interactive *"What If?"* slider demonstrating recommendation sensitivity to latent weight shifts.
10. **Zero-Dependency Resilient Demo Mode**: Guaranteed 100% functionality with deterministic providers and in-memory vector fallbacks.

---

## Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [REST API Specification](docs/API_SPEC.md)
- [2-Minute Hackathon Demo Script](docs/DEMO_GUIDE.md)
- [Algorithmic Formulations](docs/ALGORITHMS.md)

---

## Testing

```bash
cd backend
pytest tests/ -v
```
