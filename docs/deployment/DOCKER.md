# 🐳 Guide Docker - Plateforme E-commerce

## 📋 Prérequis

1. **Docker Desktop** installé sur votre système
2. **Docker Compose** (inclus avec Docker Desktop)
3. Au moins **4GB de RAM libre** pour les conteneurs

## 🚀 Démarrage Rapide

### Option 1 : Utilisation du script (Recommandé)

```bash
# Sur Windows
docker.bat start

# Sur Linux/Mac
chmod +x docker.sh
./docker.sh start
```

### Option 2 : Commandes Docker directes

```bash
# Démarrer tous les services
docker-compose --env-file .env.docker up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

## 🌐 URLs d'Accès

Une fois les services démarrés :

- **Frontend React** : http://localhost:3000
- **Backend Django** : http://localhost:8000  
- **Admin Base de Données** : http://localhost:8080
- **PostgreSQL** : localhost:5432
- **Redis** : localhost:6379

## 📦 Services Inclus

### 🎨 Frontend (React + TypeScript)
- **Port** : 3000
- **Hot Reload** : ✅ Activé
- **Node.js** : v18 Alpine

### ⚙️ Backend (Django)
- **Port** : 8000
- **Auto-reload** : ✅ Activé  
- **Python** : 3.11
- **Base de données** : PostgreSQL

### 🗄️ Base de Données (PostgreSQL)
- **Port** : 5432
- **Utilisateur** : ecommerce_user
- **Mot de passe** : ecommerce_password
- **Base** : ecommerce_db

### 🚀 Cache (Redis)
- **Port** : 6379
- **Utilisation** : Sessions, cache

### 🛠️ Adminer (Interface DB)
- **Port** : 8080
- **Accès** : Interface web pour gérer PostgreSQL

## 🔄 Hot Reload et Modifications

### ✅ **OUI** - Les modifications sont prises en compte automatiquement !

#### Frontend React
```bash
# Les modifications dans ./frontend/ sont automatiquement détectées
# Le serveur de développement recharge la page automatiquement
```

#### Backend Django  
```bash
# Les modifications dans ./backend/ redémarrent automatiquement le serveur
# Pas besoin de rebuilder le container pour les changements de code
```

### 📁 Volumes Configurés

```yaml
# Frontend
volumes:
  - ./frontend:/app           # Code source synchronisé
  - /app/node_modules        # node_modules isolé

# Backend  
volumes:
  - ./backend:/app           # Code source synchronisé
  - /app/myenv              # virtualenv isolé
```

## 🛠️ Commandes Utiles

### Scripts de Gestion

```bash
# Démarrer les services
docker.bat start

# Voir les logs en temps réel
docker.bat logs

# Voir les logs d'un service spécifique
docker.bat logs frontend
docker.bat logs backend

# Ouvrir un shell dans un container
docker.bat shell backend
docker.bat shell frontend

# Installer des dépendances
docker.bat install

# Exécuter les migrations Django
docker.bat migrate

# Créer un superuser Django
docker.bat superuser

# Voir le statut des services
docker.bat status

# Redémarrer tous les services
docker.bat restart

# Reconstruire les images
docker.bat rebuild

# Nettoyer (supprime tout)
docker.bat clean
```

### Commandes Docker Directes

```bash
# Construire les images
docker-compose build

# Démarrer en arrière-plan
docker-compose up -d

# Voir les conteneurs en cours
docker-compose ps

# Arrêter et supprimer
docker-compose down

# Voir les logs
docker-compose logs -f [service]

# Exécuter une commande dans un container
docker-compose exec backend python manage.py migrate
docker-compose exec frontend yarn add nouvelle-dependance
```

## 🔧 Gestion des Dépendances

### Ajouter une Dépendance Frontend

```bash
# Option 1 : Via le container
docker-compose exec frontend yarn add nouvelle-dependance

# Option 2 : Rebuilder après modification locale
# Modifier package.json puis :
docker.bat rebuild
```

### Ajouter une Dépendance Backend

```bash
# Option 1 : Via le container  
docker-compose exec backend pip install nouvelle-dependance

# Option 2 : Modifier requirements.txt puis :
docker.bat install
```

## 🗃️ Gestion de la Base de Données

### Migrations Django

```bash
# Créer une migration
docker-compose exec backend python manage.py makemigrations

# Appliquer les migrations
docker-compose exec backend python manage.py migrate

# Ou via le script
docker.bat migrate
```

### Accès Direct à PostgreSQL

```bash
# Via Adminer (Interface Web)
# http://localhost:8080
# Système : PostgreSQL
# Serveur : db
# Utilisateur : ecommerce_user
# Mot de passe : ecommerce_password

# Via la ligne de commande
docker-compose exec db psql -U ecommerce_user -d ecommerce_db
```

### Sauvegarde/Restauration

```bash
# Sauvegarde
docker-compose exec db pg_dump -U ecommerce_user ecommerce_db > backup.sql

# Restauration
docker-compose exec -T db psql -U ecommerce_user ecommerce_db < backup.sql
```

## 🚨 Dépannage

### Problèmes Courants

#### Port déjà utilisé
```bash
# Vérifier les ports utilisés
netstat -an | findstr :3000
netstat -an | findstr :8000

# Arrêter les services
docker.bat stop
```

#### Permissions (Linux/Mac)
```bash
# Donner les permissions au script
chmod +x docker.sh

# Problèmes de propriétaire
sudo chown -R $USER:$USER ./frontend/node_modules
sudo chown -R $USER:$USER ./backend
```

#### Container ne démarre pas
```bash
# Voir les logs détaillés
docker.bat logs [service]

# Rebuilder les images
docker.bat rebuild

# Nettoyer et recommencer
docker.bat clean
docker.bat start
```

#### Hot reload ne fonctionne pas
```bash
# Sur Windows, vérifier CHOKIDAR_USEPOLLING
echo CHOKIDAR_USEPOLLING=true >> .env.docker

# Redémarrer le frontend
docker-compose restart frontend
```

## 📊 Monitoring

### Logs en Temps Réel

```bash
# Tous les services
docker-compose logs -f

# Service spécifique
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f db
```

### Ressources Utilisées

```bash
# Stats des containers
docker stats

# Espace disque utilisé
docker system df
```

## 🚀 Production

### Build de Production

```bash
# Frontend
docker-compose exec frontend yarn build

# Backend (collectstatic)
docker-compose exec backend python manage.py collectstatic --noinput
```

### Variables d'Environnement Production

Créer un fichier `.env.production` :

```env
DEBUG=False
SECRET_KEY=your-super-secret-production-key
DATABASE_URL=postgresql://user:password@prod-db:5432/prod_db
REDIS_URL=redis://prod-redis:6379/0
```

## ✅ Avantages de cette Configuration Docker

1. **🔄 Hot Reload** : Modifications instantanées sans rebuild
2. **🔒 Isolation** : Chaque service dans son container
3. **📦 Reproductibilité** : Même environnement partout
4. **🚀 Facilité** : Scripts automatisés
5. **🔧 Développement** : Base de données et cache inclus
6. **🛠️ Outils** : Interface d'admin DB intégrée

## 🎯 Workflow de Développement Recommandé

1. **Démarrer** : `docker.bat start`
2. **Développer** : Modifier le code normalement
3. **Tester** : http://localhost:3000 se recharge automatiquement
4. **DB Changes** : `docker.bat migrate` si besoin
5. **Logs** : `docker.bat logs` pour débugger
6. **Arrêter** : `docker.bat stop` en fin de journée

**Résultat : Environnement de développement professionnel en 1 commande !** 🎉