@echo off
echo ============================================
echo   SOLUTIONS DIRECTES PRO - DEPLOIEMENT
echo ============================================
echo.

cd /d "%~dp0"

echo [1/4] Ajout des fichiers...
git add -A

echo [2/4] Commit...
set DATETIME=%date% %time%
git commit -m "Mise a jour %DATETIME%"

echo [3/4] Push vers GitHub...
git push origin main

echo.
echo ============================================
echo   DEPLOIEMENT LANCE !
echo   Vercel detecte le push et deploie
echo   automatiquement en 30-60 secondes.
echo ============================================
echo.
pause
