@echo off
echo.
echo ==========================================
echo  CONFIGURATION ENVIRONNEMENT DE DEV
echo ==========================================
echo.

REM Verifier si Python est installe
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Python n'est pas installe ou pas dans le PATH
    echo Telecharger Python depuis: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Verifier si Node.js est installe
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Node.js n'est pas installe ou pas dans le PATH
    echo Telecharger Node.js depuis: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Python et Node.js detectes
echo.

REM Configuration Backend Django
echo ==========================================
echo  CONFIGURATION BACKEND DJANGO
echo ==========================================

if not exist "backend" (
    echo Creation du dossier backend...
    mkdir backend
)

cd backend

REM Creer l'environnement virtuel
if not exist "myenv" (
    echo Creation de l'environnement virtuel Python...
    python -m venv myenv
)

REM Activer l'environnement virtuel
echo Activation de l'environnement virtuel...
call myenv\Scripts\activate

REM Installer Django et les dependances de base
echo Installation des dependances Django...
pip install --upgrade pip
pip install django==4.2.7
pip install djangorestframework==3.14.0
pip install django-cors-headers==4.3.1
pip install python-dotenv==1.0.0
pip install pillow==10.1.0

REM Creer le projet Django si il n'existe pas
if not exist "core" (
    echo Creation du projet Django...
    django-admin startproject core .
    
    REM Creer le dossier apps
    mkdir apps
    
    REM Creer les apps de base
    python manage.py startapp users apps\users
    python manage.py startapp products apps\products
    python manage.py startapp orders apps\orders
    python manage.py startapp payments apps\payments
    
    echo Configuration Django terminee
)

REM Generer requirements.txt
pip freeze > requirements.txt

cd ..

echo.
echo ==========================================
echo  CONFIGURATION FRONTEND REACT
echo ==========================================

if not exist "frontend" (
    echo Creation du dossier frontend...
    mkdir frontend
)

cd frontend

REM Initialiser le projet React avec Vite
if not exist "package.json" (
    echo Creation du projet React avec Vite...
    npm create vite@latest . -- --template react-ts
    
    echo Installation des dependances...
    npm install
    
    REM Installer des dependances utiles
    npm install axios react-router-dom @types/react-router-dom
    npm install @reduxjs/toolkit react-redux
    npm install tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    
    echo Configuration React terminee
)

cd ..

echo.
echo ==========================================
echo  CREATION FICHIERS DE CONFIGURATION
echo ==========================================

REM Creer .env pour le backend
if not exist "backend\.env" (
    echo Creation du fichier .env...
    (
        echo DEBUG=True
        echo SECRET_KEY=django-insecure-dev-key-change-in-production
        echo DATABASE_URL=sqlite:///db.sqlite3
        echo CORS_ALLOWED_ORIGINS=http://localhost:3000
    ) > backend\.env
)

REM Creer .gitignore
if not exist ".gitignore" (
    echo Creation du fichier .gitignore...
    (
        echo # Python
        echo __pycache__/
        echo *.pyc
        echo *.pyo
        echo *.pyd
        echo .Python
        echo myenv/
        echo venv/
        echo .env
        echo.
        echo # Django
        echo *.log
        echo db.sqlite3
        echo media/
        echo.
        echo # Node.js
        echo node_modules/
        echo npm-debug.log*
        echo yarn-debug.log*
        echo yarn-error.log*
        echo .pnpm-debug.log*
        echo.
        echo # Build
        echo dist/
        echo build/
        echo.
        echo # IDE
        echo .vscode/
        echo .idea/
        echo *.swp
        echo *.swo
        echo.
        echo # OS
        echo .DS_Store
        echo Thumbs.db
    ) > .gitignore
)

REM Creer un script de demarrage
if not exist "start.bat" (
    echo Creation du script de demarrage...
    (
        echo @echo off
        echo echo Demarrage de l'environnement de developpement...
        echo.
        echo REM Demarrer le backend Django
        echo start "Backend Django" cmd /k "cd backend && myenv\Scripts\activate && python manage.py runserver"
        echo.
        echo REM Attendre 3 secondes
        echo timeout /t 3 /nobreak ^>nul
        echo.
        echo REM Demarrer le frontend React
        echo start "Frontend React" cmd /k "cd frontend && npm run dev"
        echo.
        echo echo Environnement demarre!
        echo echo Backend: http://localhost:8000
        echo echo Frontend: http://localhost:3000
        echo.
        echo pause
    ) > start.bat
)

echo.
echo ==========================================
echo          CONFIGURATION TERMINEE!
echo ==========================================
echo.
echo Prochaines etapes:
echo.
echo 1. Pour demarrer le projet:
echo    start.bat
echo.
echo 2. Ou manuellement:
echo    - Backend: cd backend ^&^& myenv\Scripts\activate ^&^& python manage.py runserver
echo    - Frontend: cd frontend ^&^& npm run dev
echo.
echo 3. URLs d'acces:
echo    - Frontend: http://localhost:3000
echo    - Backend: http://localhost:8000
echo    - Admin Django: http://localhost:8000/admin
echo.
echo 4. Pour Docker (optionnel):
echo    - Installer Docker Desktop
echo    - Utiliser: docker.bat start
echo.
echo Bon developpement! 🚀
echo.
pause