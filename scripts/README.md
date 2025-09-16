# 🛠️ Scripts d'Automatisation

Ce dossier contient tous les scripts pour automatiser le développement et le déploiement.

## 📋 Scripts Disponibles

### 🐳 Docker
- **`docker.bat`** (Windows) - Gestion complète Docker avec toutes les commandes
- **`docker.sh`** (Linux/Mac) - Version Unix du script Docker

### 🚀 Configuration
- **`setup.bat`** - Configuration automatique de l'environnement de développement
- **`start.bat`** - Démarrage rapide du projet (Docker ou local)

## 📖 Utilisation

### Windows
```bash
# Configuration initiale
scripts\setup.bat

# Démarrage rapide
scripts\start.bat

# Gestion Docker complète
scripts\docker.bat start
scripts\docker.bat logs
scripts\docker.bat stop
```

### Linux/Mac
```bash
# Donner les permissions
chmod +x scripts/*.sh

# Gestion Docker
./scripts/docker.sh start
./scripts/docker.sh logs
./scripts/docker.sh stop
```

## 🔧 Commandes Docker Disponibles

Le script `docker.bat` / `docker.sh` propose :

- `start` - Démarrer tous les services
- `stop` - Arrêter tous les services
- `restart` - Redémarrer tous les services
- `logs` - Voir les logs de tous les services
- `logs [service]` - Logs d'un service spécifique
- `shell [service]` - Ouvrir un shell dans un container
- `status` - Voir l'état des services
- `install` - Installer les dépendances
- `migrate` - Exécuter les migrations Django
- `superuser` - Créer un superuser Django
- `rebuild` - Reconstruire les images
- `clean` - Nettoyer complètement l'environnement

## 📁 Organisation

```
scripts/
├── docker.bat          # Script Docker Windows
├── docker.sh           # Script Docker Unix
├── setup.bat           # Configuration environnement
├── start.bat           # Démarrage rapide
└── README.md           # Cette documentation
```

## 🎯 Workflow Recommandé

### Première Installation
1. `scripts\setup.bat` - Configuration complète
2. `scripts\start.bat` - Choisir Docker ou local

### Développement Quotidien
1. `scripts\docker.bat start` - Démarrer l'environnement
2. Développer normalement (hot reload activé)
3. `scripts\docker.bat logs` - Voir les logs si nécessaire
4. `scripts\docker.bat stop` - Arrêter en fin de journée

### Maintenance
- `scripts\docker.bat migrate` - Après changements DB
- `scripts\docker.bat rebuild` - Après changements dépendances
- `scripts\docker.bat clean` - Nettoyage complet

---

*Scripts optimisés pour un développement efficace* ⚡