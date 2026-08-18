# TechReel AI - Recommendation Algorithms & Mathematical Formulations

## 1. Interest Scoring Formula

Per-interaction interest score $S_{interaction} \in [0, 100]$:

$$S_{interaction} = 0.20 \cdot W_{completion} + 0.10 \cdot R_{replay} + 0.15 \cdot L_{like} + 0.20 \cdot S_{save} + 0.10 \cdot S_{share} + 0.10 \cdot F_{frequency} + 0.10 \cdot R_{semantic} + 0.05 \cdot T_{recency}$$

---

## 2. Multi-Objective Recommendation Utility Score

Candidate reel composite ranking score $R_{score} \in [0, 100]$:

$$R_{score} = 0.30 \cdot I_{match} + 0.20 \cdot L_{value} + 0.15 \cdot C_{relevance} + 0.10 \cdot C_{credibility} + 0.10 \cdot N_{novelty} + 0.10 \cdot D_{fit} + 0.05 \cdot D_{diversity} - P_{hype} - P_{repetition}$$

Where:
- $P_{hype} = 1.5 \cdot (\text{HypeScore} - 40)$ if $\text{HypeScore} > 40$, else $0$.
- $P_{repetition} = 35.0$ if topic is in recent seen history and reel is basic tutorial.

---

## 3. Vector Similarity Fallback

Cosine similarity metric for semantic retrieval:

$$\text{Sim}(u, v) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2}$$

Scaled to $[0, 1]$ range:

$$\text{Score}_{sim} = \frac{\text{Sim}(u, v) + 1.0}{2.0}$$

---

## 4. 70 / 20 / 10 Exploration Policy

Feed distribution maintains optimal discovery balance:
- **70% Known Interests**: Exploitation of validated Interest DNA vectors.
- **20% Adjacent Interests**: Graph neighbors connected by 1 hop (e.g. Java $\to$ Backend $\to$ System Design).
- **10% Smart Surprise**: Serendipitous, high-novelty concepts with subtle cross-domain semantic anchors.
