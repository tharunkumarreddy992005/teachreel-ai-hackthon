# TechReel AI - Backend Engine

FastAPI backend and recommendation agent orchestrating latent interest discovery, Hype Shield filtering, vector search, and pedagogical learning paths.

## Run Locally

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Health Check

```bash
curl http://localhost:8000/health
```

## API Documentation

Interactive Swagger UI available at `http://localhost:8000/docs`
