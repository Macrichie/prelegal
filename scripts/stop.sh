#!/usr/bin/env bash
set +e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "Stopping Prelegal..."

if [ -f "$PROJECT_DIR/backend/.backend.pid" ]; then
  BACKEND_PID=$(cat "$PROJECT_DIR/backend/.backend.pid")
  if kill -0 "$BACKEND_PID" 2>/dev/null; then
    kill "$BACKEND_PID"
    echo "Backend stopped (PID: $BACKEND_PID)"
  else
    echo "Backend process not found (PID: $BACKEND_PID)"
  fi
  rm -f "$PROJECT_DIR/backend/.backend.pid"
else
  echo "No backend PID file found"
fi

if [ -f "$PROJECT_DIR/frontend/.frontend.pid" ]; then
  FRONTEND_PID=$(cat "$PROJECT_DIR/frontend/.frontend.pid")
  if kill -0 "$FRONTEND_PID" 2>/dev/null; then
    kill "$FRONTEND_PID"
    echo "Frontend stopped (PID: $FRONTEND_PID)"
  else
    echo "Frontend process not found (PID: $FRONTEND_PID)"
  fi
  rm -f "$PROJECT_DIR/frontend/.frontend.pid"
else
  echo "No frontend PID file found"
fi

echo "Prelegal stopped."
