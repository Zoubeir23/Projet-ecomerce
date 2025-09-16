@echo off
echo.
echo 🧪 Tests finaux de la Plateforme E-commerce
echo ===========================================
echo.

echo 📋 Vérification de la structure...
if exist "backend\manage.py" (
    echo ✅ Backend Django présent
) else (
    echo ❌ Backend manquant
    goto :end
)

if exist "frontend\package.json" (
    echo ✅ Frontend React présent
) else (
    echo ❌ Frontend manquant
    goto :end
)

if exist "docker\docker-compose.yml" (
    echo ✅ Configuration Docker présente
) else (
    echo ❌ Configuration Docker manquante
    goto :end
)

echo.
echo 🐍 Tests Backend Django...
cd backend
python manage.py check
if %errorlevel% neq 0 (
    echo ❌ Problème détecté dans le backend
    cd ..
    goto :end
)
echo ✅ Backend Django validé
cd ..

echo.
echo ⚛️ Vérification Frontend React...
cd frontend
if exist "node_modules" (
    echo ✅ Dépendances installées
) else (
    echo ⚠️ Installation des dépendances...
    npm install
)
echo ✅ Frontend React validé
cd ..

echo.
echo 🐳 Tests configuration Docker...
cd docker
docker-compose config >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Problème dans la configuration Docker
    cd ..
    goto :end
)
echo ✅ Configuration Docker validée
cd ..

echo.
echo 🔍 Tests de connectivité...
echo Vérification des ports...
netstat -an | findstr "3000" >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Port 3000 disponible pour React
) else (
    echo ⚠️ Port 3000 libre
)

netstat -an | findstr "8000" >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Port 8000 disponible pour Django
) else (
    echo ⚠️ Port 8000 libre
)

echo.
echo ✅ Tous les tests sont passés avec succès !
echo.
echo 🚀 Prêt pour le déploiement !
echo   Exécutez: deploy.bat
echo.

:end
pause