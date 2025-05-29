@echo off
set SCRIPT=start-proxicare.ps1

REM Vérifie si le script existe dans le dossier courant
if not exist "%SCRIPT%" (
    echo ❌ Script PowerShell introuvable : %SCRIPT%
    pause
    exit /b 1
)

echo 🚀 Lancement du script PowerShell : %SCRIPT%

powershell -ExecutionPolicy Bypass -NoProfile -File "%SCRIPT%"

pause