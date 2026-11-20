$ErrorActionPreference = "Continue"

$ProjectDir = Split-Path -Parent $PSScriptRoot

Write-Host "Stopping Prelegal..."

$backendPidFile = "$ProjectDir\backend\.backend.pid"
if (Test-Path $backendPidFile) {
    $backendPid = Get-Content $backendPidFile
    try {
        Stop-Process -Id $backendPid -Force
        Write-Host "Backend stopped (PID: $backendPid)"
    } catch {
        Write-Host "Backend process not found (PID: $backendPid)"
    }
    Remove-Item $backendPidFile -Force
} else {
    Write-Host "No backend PID file found"
}

$frontendPidFile = "$ProjectDir\frontend\.frontend.pid"
if (Test-Path $frontendPidFile) {
    $frontendPid = Get-Content $frontendPidFile
    try {
        Stop-Process -Id $frontendPid -Force
        Write-Host "Frontend stopped (PID: $frontendPid)"
    } catch {
        Write-Host "Frontend process not found (PID: $frontendPid)"
    }
    Remove-Item $frontendPidFile -Force
} else {
    Write-Host "No frontend PID file found"
}

Write-Host "Prelegal stopped."
