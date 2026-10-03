@echo off
setlocal
title Do Well Studio
cd /d "%~dp0"
if not exist "%~dp0scripts\start-studio.ps1" (
  echo The startup helper is missing. Keep the scripts folder beside this shortcut.
  pause
  exit /b 1
)
powershell.exe -NoProfile -ExecutionPolicy RemoteSigned -WindowStyle Hidden -File "%~dp0scripts\start-studio.ps1"
exit /b %errorlevel%
