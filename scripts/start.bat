@echo off
title Plateforme E-commerce - Environnement de Developpement

echo.
echo ============================================
echo    PLATEFORME E-COMMERCE MULTI-VENDEURS
echo ============================================
echo.

REM Verifier si Docker est disponible
docker --version >nul 2>&1
if errorlevel 1 (
    echo [INFO] Docker non detecte - Demarrage en mode local
    goto LOCAL_MODE
) else (
    echo [INFO] Docker detecte - Choisissez le mode de demarrage:
    echo.
    echo 1. Docker ^(Recommande^)
    echo 2. Local ^(Backend + Frontend separes^)
    echo 3. Configuration initiale
    echo.
    set /p choice="Votre choix (1-3): "
    
    if "%choice%"=="1" goto DOCKER_MODE
    if "%choice%"=="2" goto LOCAL_MODE
    if "%choice%"=="3" goto SETUP_MODE
    
    echo Choix invalide, demarrage en mode local...
    goto LOCAL_MODE
)

:DOCKER_MODE
echo.
echo ==========================================
echo         DEMARRAGE AVEC DOCKER
echo ==========================================
echo.

REM Verifier si les fichiers Docker existent
if not exist "docker-compose.yml" (
    echo [ERREUR] Fichiers Docker non trouves
    echo Executez d'abord: setup.bat
    pause
    exit /b 1
)

echo Demarrage des services Docker...
docker.bat start

echo.
echo Services demarres!
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:8000
echo - Admin DB: http://localhost:8080
echo.
echo Appuyez sur une touche pour voir les logs...
pause >nul
docker.bat logs

goto END

:LOCAL_MODE
echo.
echo ==========================================
echo         DEMARRAGE EN MODE LOCAL
echo ==========================================
echo.

REM Verifier si le backend existe
if not exist "backend\myenv" (
    echo [ERREUR] Environnement backend non configure
    echo Executez d'abord: setup.bat
    pause
    exit /b 1
)

REM Verifier si le frontend existe
if not exist "frontend\node_modules" (
    echo [ERREUR] Dependances frontend non installees
    echo Executez d'abord: setup.bat
    pause
    exit /b 1
)

echo Demarrage du backend Django...
start "Backend Django - Port 8000" cmd /k "cd backend && myenv\Scripts\activate && python manage.py migrate && python manage.py runserver"

echo Attente du demarrage backend...
timeout /t 5 /nobreak >nul

echo Demarrage du frontend React...
start "Frontend React - Port 3000" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================
echo        ENVIRONNEMENT DEMARRE!
echo ==========================================
echo.
echo URLs d'acces:
echo - Frontend React: http://localhost:3000
echo - Backend Django: http://localhost:8000
echo - Admin Django: http://localhost:8000/admin
echo.
echo Les deux services sont maintenant en cours d'execution
echo dans des fenetres separees.
echo.

goto END

:SETUP_MODE
echo.
echo ==========================================
echo      CONFIGURATION INITIALE
echo ==========================================
echo.
echo Lancement de la configuration automatique...
call setup.bat
goto END

:END
echo.
echo ==========================================
echo           GUIDE RAPIDE
echo ==========================================
echo.
echo Commandes utiles:
echo.
echo DOCKER:
echo - docker.bat start    : Demarrer tous les services
echo - docker.bat stop     : Arreter tous les services
echo - docker.bat logs     : Voir les logs
echo - docker.bat shell    : Ouvrir un shell dans un container
echo.
echo LOCAL:
echo - Backend: cd backend ^&^& myenv\Scripts\activate
echo - Frontend: cd frontend ^&^& npm run dev
echo - Tests: python manage.py test
echo.
echo DEVELOPPEMENT:
echo - Toutes les modifications de code sont detectees automatiquement
echo - Les pages se rechargent automatiquement
echo - Base de donnees: SQLite ^(local^) ou PostgreSQL ^(Docker^)
echo.
echo Documentation complete: README.md, DOCKER.md, INSTALLATION.md
echo.
pause