from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from pathlib import Path

# Locate project paths
ROOT_DIR = Path(__file__).resolve().parent.parent.parent.parent
DATA_DIR = ROOT_DIR / "data"

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="allow",
        case_sensitive=True
    )

    PROJECT_NAME: str = "TechReel AI Backend"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # MongoDB Atlas Connection (Configured via MONGODB_URI env var)
    MONGODB_URI: Optional[str] = Field(default=None)
    DATABASE_NAME: str = Field(default="techreel")
    
    # AI & Embeddings
    AI_API_KEY: Optional[str] = Field(default=None)
    AI_MODEL: str = Field(default="gemini-1.5-flash")
    EMBEDDING_API_KEY: Optional[str] = Field(default=None)
    EMBEDDING_MODEL: str = Field(default="text-embedding-004")
    
    # Application Mode
    DEMO_MODE: bool = Field(default=True)
    FRONTEND_URL: str = Field(default="http://localhost:3000")
    LOG_LEVEL: str = Field(default="INFO")
    
    # Data path
    DATA_PATH: Path = DATA_DIR

settings = Settings()
