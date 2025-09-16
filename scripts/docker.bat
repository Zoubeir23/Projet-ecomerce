@echo off
REM Script de gestion Docker pour Windows (PowerShell)

setlocal enabledelayedexpansion

REM Fonction pour afficher les messages avec couleurs
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "NC=[0m"

REM Vérifier si Docker est installé
docker --version >nul 2>&1
if errorlevel 1 (
    echo %RED%[ERROR]%NC% Docker n'est pas installé ou n'est pas dans le PATH
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo %RED%[ERROR]%NC% Docker Compose n'est pas installé ou n'est pas dans le PATH
    exit /b 1
)

REM Traitement des commandes
if "%1"=="start" goto start
if "%1"=="stop" goto stop
if "%1"=="restart" goto restart
if "%1"=="rebuild" goto rebuild
if "%1"=="logs" goto logs
if "%1"=="shell" goto shell
if "%1"=="install" goto install
if "%1"=="migrate" goto migrate
if "%1"=="superuser" goto superuser
if "%1"=="status" goto status
if "%1"=="clean" goto clean
if "%1"=="help" goto help
if "%1"=="" goto help
goto unknown

:start
echo %BLUE%[INFO]%NC% Démarrage des services Docker...
docker-compose --env-file .env.docker up -d
if errorlevel 1 (
    echo %RED%[ERROR]%NC% Erreur lors du démarrage des services
    exit /b 1
)
echo %GREEN%[SUCCESS]%NC% Services démarrés !
echo.
echo URLs disponibles :
echo   - Frontend React : http://localhost:3000
echo   - Backend Django : http://localhost:8000
echo   - Admin DB (Adminer) : http://localhost:8080
goto end

:stop
echo %BLUE%[INFO]%NC% Arrêt des services Docker...
docker-compose down
echo %GREEN%[SUCCESS]%NC% Services arrêtés !
goto end

:restart
echo %BLUE%[INFO]%NC% Redémarrage des services...
docker-compose down
docker-compose --env-file .env.docker up -d
echo %GREEN%[SUCCESS]%NC% Services redémarrés !
goto end

:rebuild
echo %BLUE%[INFO]%NC% Reconstruction des images Docker...
docker-compose down
docker-compose build --no-cache
docker-compose --env-file .env.docker up -d
echo %GREEN%[SUCCESS]%NC% Images reconstruites et services redémarrés !
goto end

:logs
if "%2"=="" (
    echo %BLUE%[INFO]%NC% Affichage de tous les logs...
    docker-compose logs -f
) else (
    echo %BLUE%[INFO]%NC% Affichage des logs pour le service : %2
    docker-compose logs -f %2
)
goto end

:shell
set service=%2
if "%service%"=="" set service=backend
echo %BLUE%[INFO]%NC% Ouverture d'un shell dans le container : !service!
docker-compose exec !service! /bin/sh
goto end

:install
echo %BLUE%[INFO]%NC% Installation des dépendances...
echo %BLUE%[INFO]%NC% Installation des dépendances frontend...
docker-compose exec frontend yarn install
echo %BLUE%[INFO]%NC% Installation des dépendances backend...
docker-compose exec backend pip install -r requirements.txt
echo %GREEN%[SUCCESS]%NC% Dépendances installées !
goto end

:migrate
echo %BLUE%[INFO]%NC% Exécution des migrations Django...
docker-compose exec backend python manage.py migrate
echo %GREEN%[SUCCESS]%NC% Migrations terminées !
goto end

:superuser
echo %BLUE%[INFO]%NC% Création d'un superuser Django...
docker-compose exec backend python manage.py createsuperuser
goto end

:status
echo %BLUE%[INFO]%NC% Statut des services :
docker-compose ps
goto end

:clean
echo %YELLOW%[WARNING]%NC% Nettoyage des volumes et images Docker...
set /p confirm="Êtes-vous sûr ? Cette action supprimera toutes les données. (y/N): "
if /i "!confirm!"=="y" (
    docker-compose down -v
    docker system prune -f
    echo %GREEN%[SUCCESS]%NC% Nettoyage terminé !
) else (
    echo %BLUE%[INFO]%NC% Nettoyage annulé.
)
goto end

:help
echo Utilisation: %0 [COMMANDE]
echo.
echo Commandes disponibles :
echo   start       Démarrer tous les services
echo   stop        Arrêter tous les services
echo   restart     Redémarrer tous les services
echo   rebuild     Reconstruire les images et redémarrer
echo   logs        Voir les logs (logs [service] pour un service spécifique)
echo   shell       Ouvrir un shell (shell [service], défaut: backend)
echo   install     Installer/mettre à jour les dépendances
echo   migrate     Exécuter les migrations Django
echo   superuser   Créer un superuser Django
echo   status      Voir le statut des services
echo   clean       Nettoyer les volumes et images
echo   help        Afficher cette aide
goto end

:unknown
echo %RED%[ERROR]%NC% Commande inconnue : %1
call :help
exit /b 1

:end
exit /b 0