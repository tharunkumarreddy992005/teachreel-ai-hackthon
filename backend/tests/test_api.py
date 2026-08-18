import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_health_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert "database" in data
        assert "ai" in data

@pytest.mark.asyncio
async def test_interest_dna_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/user/interest-dna?user_id=student_001")
        assert response.status_code == 200
        data = response.json()
        assert "interest_dna" in data
        assert len(data["interest_dna"]) > 0
        assert data["hidden_interest"]["primary_topic"] == "Software Engineering"

@pytest.mark.asyncio
async def test_recommendations_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/api/user/recommendations?user_id=student_001")
        assert response.status_code == 200
        data = response.json()
        assert "recommendation" in data
        assert data["recommendation"]["title"] == "How Backend Engineers Think About System Design"
        assert len(data["recommendation"]["rejected_candidates"]) >= 3

@pytest.mark.asyncio
async def test_demo_run_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.post("/api/demo/run")
        assert response.status_code == 200
        data = response.json()
        assert "steps" in data
        assert len(data["steps"]) == 10
        assert data["selected_recommendation"]["title"] == "How Backend Engineers Think About System Design"
