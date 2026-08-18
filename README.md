# TECHREEL AI

"Don't stop scrolling. Upgrade what you discover."

Please navigate to `techreel-ai/`:

### Terminal 1 (Frontend):
```bash
cd techreel-ai/frontend
npm install
npm run dev
```

### Terminal 2 (Backend):
```bash
cd techreel-ai/backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
