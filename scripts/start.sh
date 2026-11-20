#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "Starting Prelegal..."

# Start backend
echo "Starting backend (FastAPI)..."
cd "$PROJECT_DIR/backend"
if [ ! -d ".venv" ]; then
  echo "Creating Python virtual environment..."
  python3 -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
else
  source .venv/bin/activate
fi
uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!
echo $BACKEND_PID > "$PROJECT_DIR/backend/.backend.pid"
echo "Backend started (PID: $BACKEND_PID)"

# Start frontend
echo "Starting frontend (Next.js)..."
cd "$PROJECT_DIR/frontend"
if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi
npm run dev &
FRONTEND_PID=$!
echo $FRONTEND_PID > "$PROJECT_DIR/frontend/.frontend.pid"
echo "Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "Prelegal is running!"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
echo ""
echo "Run scripts/stop.sh to stop all services."

wait
