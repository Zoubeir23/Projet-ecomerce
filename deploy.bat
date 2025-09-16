@echo off
REM Script de déploiement automatique
REM Plateforme E-commerce Multi-Vendeurs

echo.
echo 🚀 Déploiement de la Plateforme E-commerce
echo =========================================
echo.

echo 📋 Vérification des prérequis...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker n'est pas installé
    echo.
    echo Pour installer Docker Desktop:
    echo 1. Allez sur https://docker.com/products/docker-desktop
    echo 2. Téléchargez et installez Docker Desktop
    echo 3. Redémarrez votre ordinateur
    echo 4. Relancez ce script
    pause
    exit /b 1
)

echo ✅ Docker détecté
echo.

echo 🔧 Configuration de l'environnement...
if not exist "docker\.env.docker" (
    echo DEBUG=True > "docker\.env.docker"
    echo DATABASE_URL=postgresql://postgres:password@db:5432/ecommerce_db >> "docker\.env.docker"
    echo REDIS_URL=redis://redis:6379/0 >> "docker\.env.docker"
    echo SECRET_KEY=dev-secret-key-change-in-production >> "docker\.env.docker"
    echo ALLOWED_HOSTS=localhost,127.0.0.1 >> "docker\.env.docker"
    echo ✅ Fichier .env.docker créé
)

if not exist "backend\.env" (
    echo DEBUG=True > "backend\.env"
    echo SECRET_KEY=dev-secret-key-change-in-production >> "backend\.env"
    echo DATABASE_URL=sqlite:///db.sqlite3 >> "backend\.env"
    echo ✅ Fichier backend\.env créé
)

echo.
echo 🏗️ Construction des images Docker...
cd docker
docker-compose build --no-cache

echo.
echo 🚀 Démarrage des services...
docker-compose up -d

echo.
echo ⏳ Attente du démarrage des services (30 secondes)...
timeout /t 30 /nobreak >nul

echo.
echo 🗄️ Application des migrations...
docker-compose exec -T backend python manage.py migrate

echo.
echo 👤 Création du superutilisateur...
echo Voulez-vous créer un superutilisateur maintenant ? (O/N)
set /p response=
if /i "%response%"=="O" (
    docker-compose exec backend python manage.py createsuperuser
)

echo.
echo 📁 Collecte des fichiers statiques...
docker-compose exec -T backend python manage.py collectstatic --noinput

echo.
echo 🎉 Déploiement terminé avec succès !
echo ==================================
echo.
echo 🌐 Accès aux services :
echo   Frontend React : http://localhost:3000
echo   Backend API    : http://localhost:8000
echo   Admin Django   : http://localhost:8000/admin
echo   Base de données: localhost:5432
echo.
echo 📚 Documentation : docs/
echo 🐛 Issues        : .github/ISSUE_TEMPLATE/
echo.
echo ✅ Votre plateforme e-commerce est maintenant en ligne !
echo.
cd ..
pause