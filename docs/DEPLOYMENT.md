# TechReel AI - Deployment Guide

## 1-Click Fast Deployment Options (Recommended for Hackathons)

---

### Option A: Vercel (Frontend) + Render / Railway (Backend) — *Recommended*

#### 1. Deploy the Backend (FastAPI on Render / Railway)
1. Go to **[Render.com](https://render.com)** or **[Railway.app](https://railway.app)**.
2. Click **New +** $\to$ **Web Service** $\to$ Connect your GitHub repo: `https://github.com/tharunkumarreddy992005/teachreel-ai-hackthon`.
3. Configure settings:
   - **Root Directory**: `techreel-ai/backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add Environment Variables:
   - `MONGODB_URI`: `mongodb+srv://kt760133_db_user:tharunreddy%40992005@cluster0.4jitx16.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
   - `DATABASE_NAME`: `techreel`
   - `DEMO_MODE`: `false`
5. Click **Deploy Web Service**. Copy your public backend URL (e.g. `https://techreel-ai-backend.onrender.com`).

---

#### 2. Deploy the Frontend (Next.js on Vercel)
1. Go to **[Vercel.com](https://vercel.com)** $\to$ Click **Add New Project**.
2. Import your GitHub repository: `teachreel-ai-hackthon`.
3. Set **Root Directory** to `techreel-ai/frontend`.
4. In **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL`: Your live backend URL from Step 1 (e.g. `https://techreel-ai-backend.onrender.com`).
5. Click **Deploy**. Your frontend is live with automatic SSL!

---

### Option B: 1-Click Render Blueprint (Full Stack)
1. Go to **[dashboard.render.com/blueprints](https://dashboard.render.com/blueprints)**.
2. Connect `teachreel-ai-hackthon` repository.
3. Render will read `render.yaml` and provision both backend and frontend automatically.
4. Input your `MONGODB_URI` when prompted and click **Apply**.

---

### Option C: Docker Compose (Self-Hosted / Cloud VPS)
Run on any Ubuntu/Debian/AWS EC2 instance:

```bash
git clone https://github.com/tharunkumarreddy992005/teachreel-ai-hackthon.git
cd teachreel-ai-hackthon/techreel-ai
docker-compose up -d --build
```
The stack will be live at `http://YOUR_SERVER_IP:3000`.
