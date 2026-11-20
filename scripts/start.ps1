$ErrorActionPreference = "Stop"

$ProjectDir = Split-Path -Parent $PSScriptRoot

Write-Host "Starting Prelegal..."

# Start backend
Write-Host "Starting backend (FastAPI)..."
Set-Location "$ProjectDir\backend"
if (-not (Test-Path ".venv")) {
    Write-Host "Creating Python virtual environment..."
    python -m venv .venv
    & ".venv\Scripts\Activate.ps1"
    pip install -r requirements.txt
} else {
    & ".venv\Scripts\Activate.ps1"
}
$backend = Start-Process -NoNewWindow -PassThru -FilePath "python" -ArgumentList "-m", "uvicorn", "app.main:app", "--reload", "--port", "8000"
$backend.Id | Out-File "$ProjectDir\backend\.backend.pid" -Encoding ascii
Write-Host "Backend started (PID: $($backend.Id))"

# Start frontend
Write-Host "Starting frontend (Next.js)..."
Set-Location "$ProjectDir\frontend"
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..."
    npm install
}
$frontend = Start-Process -NoNewWindow -PassThru -FilePath "npm" -ArgumentList "run", "dev"
$frontend.Id | Out-File "$ProjectDir\frontend\.frontend.pid" -Encoding ascii
Write-Host "Frontend started (PID: $($frontend.Id))"

Write-Host ""
Write-Host "Prelegal is running!"
Write-Host "  Frontend: http://localhost:3000"
Write-Host "  Backend:  http://localhost:8000"
Write-Host "  API Docs: http://localhost:8000/docs"
Write-Host ""
Write-Host "Run scripts\stop.ps1 to stop all services."
