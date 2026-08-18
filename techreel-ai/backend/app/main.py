from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import logger
from app.database.mongodb import db_manager
from app.database.indexes import create_indexes
from app.api.routes import (
    analysis,
    interests,
    recommendations,
    feedback,
    learning,
    insights,
    quiz,
    demo
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing TechReel AI Backend...")
    await db_manager.connect()
    await create_indexes()
    yield
    logger.info("Shutting down TechReel AI Backend...")
    await db_manager.close()

app = FastAPI(
    title="TechReel AI - Backend & Recommendation Agent",
    description="Intelligent Latent Interest Inference & Educational Recommendation System for Short-Form Video",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    settings.FRONTEND_URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.DEMO_MODE else origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check
@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "database": "connected" if db_manager.is_connected else "in-memory-fallback",
        "ai": "live" if (settings.AI_API_KEY and not settings.DEMO_MODE) else "demo",
        "vector_search": "mongodb-atlas" if db_manager.is_connected else "local-cosine-fallback"
    }

# Include API Routers
app.include_router(analysis.router, prefix="/api", tags=["Analysis"])
app.include_router(interests.router, prefix="/api", tags=["Interests"])
app.include_router(recommendations.router, prefix="/api", tags=["Recommendations"])
app.include_router(feedback.router, prefix="/api", tags=["Feedback"])
app.include_router(learning.router, prefix="/api", tags=["Learning"])
app.include_router(insights.router, prefix="/api", tags=["Insights"])
app.include_router(quiz.router, prefix="/api", tags=["Quiz"])
app.include_router(demo.router, prefix="/api", tags=["Demo"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
