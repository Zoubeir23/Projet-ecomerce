# 📦 Guide d'Installation Docker - Windows

## 🚀 Installation Docker Desktop

### 1. Télécharger Docker Desktop

Rendez-vous sur le site officiel de Docker :
- **URL** : <https://www.docker.com/products/docker-desktop/>
- Cliquez sur **"Download for Windows"**
- Le fichier `Docker Desktop Installer.exe` sera téléchargé

### 2. Configuration Système Requise

**Minimum requis :**
- Windows 10/11 (64-bit)
- 4 GB RAM
- Hyper-V et conteneurs Windows activés
- WSL 2 (Windows Subsystem for Linux)

### 3. Installation

1. **Exécuter l'installateur** : Double-cliquez sur `Docker Desktop Installer.exe`
2. **Configuration** : Suivez l'assistant d'installation
   - ✅ Cochez "Use WSL 2 instead of Hyper-V" (recommandé)
   - ✅ Cochez "Add shortcut to desktop"
3. **Redémarrage** : Redémarrez Windows après l'installation

### 4. Vérification Installation

Ouvrez PowerShell ou Command Prompt et tapez :

```powershell
docker --version
docker-compose --version
```

Vous devriez voir quelque chose comme :
```
Docker version 24.0.6, build ed223bc
Docker Compose version v2.21.0
```

## 🔧 Alternative : Installation sans Docker

Si vous ne pouvez pas installer Docker, voici comment configurer le projet manuellement :

### Backend Django

```powershell
# Aller dans le dossier backend
cd backend

# Créer un environnement virtuel
python -m venv myenv

# Activer l'environnement
myenv\Scripts\activate

# Installer les dépendances
pip install django djangorestframework psycopg2-binary redis celery

# Créer requirements.txt
pip freeze > requirements.txt

# Migrations initiales
python manage.py migrate

# Créer un superuser
python manage.py createsuperuser

# Lancer le serveur
python manage.py runserver
```

### Frontend React

```powershell
# Aller dans le dossier frontend
cd frontend

# Installer Node.js si nécessaire
# Télécharger depuis https://nodejs.org/

# Installer Yarn (optionnel)
npm install -g yarn

# Installer les dépendances
yarn install
# ou
npm install

# Lancer le serveur de développement
yarn dev
# ou
npm run dev
```

### Base de Données PostgreSQL

#### Option 1 : PostgreSQL Local

1. **Télécharger PostgreSQL** : <https://www.postgresql.org/download/windows/>
2. **Installer** avec les paramètres par défaut
3. **Configurer** :
   ```sql
   -- Créer la base de données
   CREATE DATABASE ecommerce_db;
   CREATE USER ecommerce_user WITH PASSWORD 'ecommerce_password';
   GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;
   ```

#### Option 2 : SQLite (Plus Simple)

Modifier `backend/core/settings.py` :

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

### Redis (Cache)

#### Option 1 : Redis local

1. **Télécharger Redis pour Windows** : <https://github.com/microsoftarchive/redis/releases>
2. **Installer** et démarrer le service

#### Option 2 : Sans Redis

Modifier `backend/core/settings.py` :

```python
# Utiliser le cache en mémoire au lieu de Redis
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }
}
```

## 🎯 Lancement du Projet

### Avec Docker (Recommandé après installation)

```powershell
# Retourner dans le dossier principal
cd C:\Users\A&A COMPUTER\Desktop\Projet-ecomerce

# Lancer avec Docker
docker.bat start
```

### Sans Docker

```powershell
# Terminal 1 : Backend
cd backend
myenv\Scripts\activate
python manage.py runserver

# Terminal 2 : Frontend  
cd frontend
yarn dev
```

## 🌐 Accès aux Services

### Avec Docker
- **Frontend** : <http://localhost:3000>
- **Backend** : <http://localhost:8000>
- **Admin DB** : <http://localhost:8080>

### Sans Docker
- **Frontend** : <http://localhost:3000>
- **Backend** : <http://localhost:8000>
- **Admin Django** : <http://localhost:8000/admin>

## 🚨 Dépannage

### Docker ne démarre pas

1. **Vérifier WSL 2** :
   ```powershell
   wsl --list --verbose
   ```

2. **Activer les fonctionnalités Windows** :
   - Ouvrir "Activer ou désactiver des fonctionnalités Windows"
   - ✅ Cocher "Hyper-V"
   - ✅ Cocher "Plateforme de machine virtuelle"
   - ✅ Cocher "Sous-système Windows pour Linux"

3. **Redémarrer** Windows

### Python non trouvé

1. **Installer Python** : <https://www.python.org/downloads/>
2. **Ajouter au PATH** : Cocher "Add Python to PATH" lors de l'installation

### Node.js non trouvé

1. **Installer Node.js** : <https://nodejs.org/>
2. **Vérifier** : `node --version` et `npm --version`

## 📋 Checklist Installation

- [ ] Docker Desktop installé et démarré
- [ ] Python 3.11+ installé
- [ ] Node.js 18+ installé
- [ ] Git installé
- [ ] PostgreSQL installé (optionnel avec Docker)
- [ ] Redis installé (optionnel avec Docker)

## 🎉 Prochaines Étapes

Une fois Docker installé :

1. **Redémarrer** votre terminal
2. **Tester** : `docker --version`
3. **Lancer** : `docker.bat start`
4. **Accéder** : <http://localhost:3000>

**Bon développement ! 🚀**