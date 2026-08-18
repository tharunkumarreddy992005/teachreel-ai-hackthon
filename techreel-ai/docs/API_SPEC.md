# TechReel AI - REST API Specification

All endpoints are prefixed with `/api` except `/health`.

## 1. System Health

### `GET /health`
Returns backend health status, database connection state, and active AI engine mode.

```json
{
  "status": "ok",
  "database": "connected",
  "ai": "demo",
  "vector_search": "mongodb-atlas"
}
```

---

## 2. User Intelligence & Discovery Endpoints

### `GET /api/user/interest-dna?user_id=student_001`
Returns multi-factor weighted Interest DNA vectors, confidence levels, trends, and latent discovery.

### `GET /api/user/interest-graph?latent_topic=Software%20Engineering`
Returns hierarchical technology knowledge graph with nodes, relations, and latent node highlighting.

### `GET /api/user/recommendations?user_id=student_001`
Returns top recommendations, 7-factor utility scores, explanation paths, and rejected candidate details.

### `GET /api/user/hype-analysis`
Returns Hype Shield analysis across candidate reels with clickbait verdicts and credibility scores.

### `GET /api/user/evolution?user_id=student_001`
Returns 4-week historical interest trajectory.

### `GET /api/user/emerging-interests?user_id=student_001`
Returns probabilistic emerging technology interests.

### `GET /api/user/knowledge-gaps?user_id=student_001`
Returns identified missing foundational concepts.

### `GET /api/user/career-alignment?user_id=student_001`
Returns career role exploration matches.

### `GET /api/user/learning-path?user_id=student_001`
Returns structured step-by-step roadmap.

### `GET /api/user/interest-bridge`
Returns cross-disciplinary topic intersections.

### `GET /api/user/smart-surprise`
Returns 10% serendipitous discovery reel.

---

## 3. Action Endpoints

### `POST /api/analyze`
Decomposes recent interactions into Entertainment, Learning, Career, and Curiosity intents.

### `POST /api/feedback`
Submits rating and reason tags to update Interest DNA in real time.

### `POST /api/quiz`
Retrieves or validates a 30-second micro-learning assessment.

### `POST /api/demo/run`
Executes end-to-end golden scenario pipeline and returns complete synchronized state for the presentation.
