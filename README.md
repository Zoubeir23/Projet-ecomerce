# 🛒 Plateforme E-commerce Multi-Vendeurs

![Django](https://img.shields.io/badge/Django-4.2+-green.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)

Une plateforme e-commerce professionnelle avec **gestion multi-vendeurs**, **chatbot IA**, et **architecture moderne** développée avec Django et React.

## 🎯 Fonctionnalités Principales

- 🏪 **Multi-vendeurs** : Gestion complète de vendeurs indépendants
- 🛍️ **Catalogue avancé** : Catégories, filtres, recherche intelligente
- 💳 **Paiements sécurisés** : Stripe, PayPal, gestion des transactions
- 🤖 **Chatbot IA** : Support client 24/7 avec intelligence artificielle
- 📊 **Analytics** : Tableaux de bord vendeurs et administrateurs
- 🔐 **Sécurité renforcée** : Authentification, validation, protection CSRF
- 📱 **Responsive** : Interface optimisée mobile et desktop

## 📁 Structure du Projet (Réorganisée)

```
Projet-ecomerce/
├── backend/              # Application Django
│   ├── apps/            # Applications modulaires
│   ├── core/            # Configuration centrale
│   └── requirements/    # Dépendances
├── frontend/             # Application React
│   ├── src/             # Code source
│   └── public/          # Assets publics
├── docker/               # Configuration Docker
│   ├── docker-compose.yml
│   └── .env.docker
├── scripts/              # Scripts d'automatisation
│   ├── docker.bat       # Gestion Docker
│   ├── start.bat        # Démarrage développement
│   └── setup.bat        # Configuration initiale
├── docs/                 # Documentation complète
│   ├── governance/      # Licence, Code de conduite
│   ├── guides/          # Guides d'utilisation
│   └── project/         # Documentation technique
├── .github/             # Templates GitHub
│   ├── ISSUE_TEMPLATE/  # Templates d'issues
│   └── pull_request_template.md
└── README.md            # Ce fichier
```

## 🚀 Démarrage Rapide

### Option 1 : Avec Docker (Recommandé)
```bash
# Scripts de redirection disponibles à la racine
docker.bat start          # Lance l'environnement Docker
start.bat                 # Démarrage développement
setup.bat                 # Configuration initiale

# Ou directement depuis les dossiers
cd docker && docker-compose up -d
cd scripts && docker.bat start
```

### Option 2 : Installation manuelle
```bash
# Backend Django
cd backend
pip install -r requirements/dev.txt
python manage.py migrate
python manage.py runserver

# Frontend React (nouveau terminal)
cd frontend
npm install
npm start
```

## 🛠️ Stack Technique

### Backend
- **Framework** : Django 4.2+ LTS
- **API** : Django REST Framework
- **Base de données** : PostgreSQL 15+ / SQLite (dev)
- **Authentification** : Django Auth + JWT
- **IA/Chatbot** : OpenAI GPT-4 ou Anthropic Claude
- **Cache** : Redis
- **WebSockets** : Django Channels

### Frontend
- **Framework** : React 18+ avec TypeScript
- **State Management** : Redux Toolkit / Zustand
- **Styling** : Tailwind CSS / Bootstrap 5
- **Chat UI** : Composants temps réel

### Infrastructure
- **Serveur** : Gunicorn + Nginx
- **Conteneurisation** : Docker + Docker Compose
- **Files** : AWS S3 / Stockage local
- **Email** : SendGrid / SMTP
- **Monitoring** : Sentry

### Paiements
- **Stripe** : Cartes, virements SEPA
- **PayPal** : Paiements et cartes
- **Sécurité** : PCI DSS compliant

## 📋 Installation Détaillée

### Prérequis
- Docker Desktop installé
- 4GB RAM libre minimum
- Git installé

### 1. Cloner le projet
```bash
git clone https://github.com/votre-repo/Projet-ecomerce.git
cd Projet-ecomerce
```

### 2. Configuration de l'environnement
```bash
# Copier les fichiers d'environnement
copy docker\.env.docker.example docker\.env.docker
copy backend\.env.example backend\.env

# Modifier les variables d'environnement selon vos besoins
```

### 3. Lancement avec Docker
```bash
# Via script de redirection
docker.bat start

# Ou directement
cd docker
docker-compose up -d
```

### 4. Accès à l'application
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8000
- **Admin Django** : http://localhost:8000/admin
- **Base de données** : localhost:5432

## 🤖 Fonctionnalités Chatbot IA

### Capacités intelligentes
- **Réponses contextuelles** : Accès aux données utilisateur
- **Intent recognition** : Compréhension des intentions
- **Base de connaissances** : FAQ dynamique
- **Escalade automatique** : Transfert vers agents humains
- **Support multilingue** : Français, anglais

### Technologies IA
- **Service IA** : OpenAI GPT-4 / Anthropic Claude
- **WebSocket** : Chat temps réel avec Django Channels
- **Cache intelligent** : Réponses fréquentes mises en cache
- **Analytics** : Monitoring des performances

## 🔐 Sécurité et Conformité

- **HTTPS obligatoire** en production
- **Protection CSRF** sur tous les formulaires
- **Validation stricte** des données d'entrée
- **Rate limiting** contre les attaques DDoS
- **Conformité GDPR** pour les conversations IA
- **Gestion sécurisée** des clés API

## 📊 Monitoring et Analytics

- **Dashboard vendeur** : Métriques détaillées
- **Analytics chatbot** : Taux de résolution
- **Performance monitoring** : Sentry pour les erreurs
- **Logs structurés** : Suivi des événements

## 📚 Documentation

### Gouvernance
- **[Licence MIT](docs/governance/LICENSE)** - Termes de licence
- **[Code de Conduite](docs/governance/CODE_OF_CONDUCT.md)** - Règles communauté
- **[Guide de Contribution](docs/governance/CONTRIBUTORS.md)** - Comment contribuer
- **[Changelog](docs/governance/CHANGELOG.md)** - Historique des versions

### Guides Techniques
- **[Installation](docs/guides/)** - Guide d'installation complet
- **[Déploiement](docs/guides/)** - Guide de déploiement production
- **[API Documentation](docs/project/)** - Documentation des endpoints

### Templates GitHub
- **[Bug Report](.github/ISSUE_TEMPLATE/bug_report.md)** - Signaler un bug
- **[Feature Request](.github/ISSUE_TEMPLATE/feature_request.md)** - Demander une fonctionnalité
- **[Question](.github/ISSUE_TEMPLATE/question.md)** - Poser une question
- **[Pull Request](.github/pull_request_template.md)** - Template PR

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. **Créer une branche** pour votre fonctionnalité
3. **Commit** vos changements
4. **Push** vers la branche
5. **Ouvrir une Pull Request**

Consultez notre [guide de contribution](docs/governance/CONTRIBUTORS.md) pour plus de détails.

## 🆘 Support et Aide

### Ressources
- **Documentation** : Dossier `docs/` complet
- **Issues GitHub** : Utilisez les templates appropriés
- **Discussions** : Pour les questions générales

### Commandes Utiles
```bash
# Vérifier les logs
docker.bat logs

# Rebuild complet
docker.bat rebuild

# Tests
scripts\test.bat

# Backup base de données
scripts\backup.bat
```

## 📈 Roadmap

- [ ] **v1.0** : Fonctionnalités de base multi-vendeurs
- [ ] **v1.1** : Intégration chatbot IA avancé
- [ ] **v1.2** : Analytics et reporting avancés
- [ ] **v2.0** : Mobile app (React Native)
- [ ] **v2.1** : Marketplace international

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](docs/governance/LICENSE) pour plus de détails.

---

**Développé avec ❤️ pour une expérience e-commerce moderne et intelligente**