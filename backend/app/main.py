from contextlib import asynccontextmanager
import time
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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
    """Manages application startup and graceful shutdown lifecycle."""
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
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://teachreel-ai-hackthon.vercel.app",
    settings.FRONTEND_URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.DEMO_MODE else origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    max_age=3600
)

@app.middleware("http")
async def add_security_headers_and_timing(request: Request, call_next):
    """
    Applies enterprise-grade HTTP security headers, sanitization,
    and process timing to all incoming requests.
    """
    start_time = time.time()
    try:
        response: Response = await call_next(request)
    except Exception as exc:
        logger.error(f"Unhandled server error on {request.url.path}: {str(exc)}", exc_info=True)
        response = JSONResponse(
            status_code=500,
            content={"detail": "An internal server error occurred. Please try again later."}
        )

    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = f"{process_time:.4f}s"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    return response

# Health Check with detailed diagnostic signals
@app.get("/health", tags=["Monitoring"])
async def health_check():
    """Returns real-time service health, database status, and inference engine telemetry."""
    return {
        "status": "ok",
        "service": "techreel-ai-backend",
        "database": "connected" if db_manager.is_connected else "in-memory-fallback",
        "ai": "live" if (settings.AI_API_KEY and not settings.DEMO_MODE) else "demo",
        "vector_search": "mongodb-atlas" if db_manager.is_connected else "local-cosine-fallback",
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ")
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
