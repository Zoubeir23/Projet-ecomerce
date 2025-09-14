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

## 🚀 Démarrage Rapide avec Docker

### Prérequis
- Docker Desktop installé
- 4GB RAM libre minimum

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd Projet-ecomerce

# Démarrer avec Docker (Recommandé)
docker.bat start

# Ou sur Linux/Mac
chmod +x docker.sh
./docker.sh start
```

### Accès aux services
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8000
- **Admin DB** : http://localhost:8080

## 📁 Structure du Projet

```
Projet-ecomerce/
├── backend/                 # API Django
│   ├── apps/
│   │   ├── users/          # Gestion utilisateurs
│   │   ├── products/       # Catalogue produits
│   │   ├── orders/         # Commandes
│   │   ├── payments/       # Paiements
│   │   ├── chatbot/        # IA & Chat
│   │   └── analytics/      # Statistiques
│   ├── core/               # Configuration
│   └── requirements.txt
├── frontend/               # Interface React
│   ├── src/
│   │   ├── components/     # Composants UI
│   │   ├── pages/          # Pages principales
│   │   ├── services/       # API calls
│   │   └── hooks/          # React hooks
│   └── package.json
├── docker-compose.yml      # Orchestration services
├── DOCKER.md              # Guide Docker complet
└── README.md              # Ce fichier
```

## �️ Stack Technique

### Backend
- **Framework** : Django 4.2+ LTS
- **API** : Django REST Framework
- **Base de données** : PostgreSQL 15+
- **Cache** : Redis
- **IA** : OpenAI GPT / Anthropic Claude
- **WebSocket** : Django Channels

### Frontend
- **Framework** : React 18+ avec TypeScript
- **Redux Toolkit** ou Zustand pour state management
- **Tailwind CSS** ou Bootstrap 5 pour styling
- **Axios** pour requêtes API
- **Socket.io** pour chat temps réel

### Infrastructure
- **Gunicorn + Nginx** (production)
- **Docker** pour containerisation
- **GitHub Actions** pour CI/CD

## 🛠️ Installation

### Prérequis
- Python 3.11+
- Node.js 18+
- PostgreSQL (optionnel pour dev)
- Redis (pour cache et WebSockets)

### Setup Backend (Django)

1. Activer l'environnement virtuel :
```bash
# Windows
myenv\Scripts\activate

# Linux/Mac
source myenv/bin/activate
```

2. Installer les dépendances :
```bash
cd backend
pip install -r requirements/development.txt
```

3. Configuration de la base de données :
```bash
python manage.py migrate
python manage.py createsuperuser
```

4. Lancer le serveur de développement :
```bash
python manage.py runserver
```

### Setup Frontend (React)

1. Installer les dépendances :
```bash
cd frontend
npm install
```

2. Lancer le serveur de développement :
```bash
npm start
```

## 🌿 Gestion des Branches

### Branches principales
- `master` : Production (code stable)
- `develop` : Développement (intégration)

### Branches de fonctionnalités
- `feature/authentication-users`
- `feature/gestion-produits`
- `feature/ajout-panier`
- `feature/chatbot-ia`
- `feature/systeme-paiement`
- etc.

### Workflow
```bash
# Travailler sur une fonctionnalité
git checkout feature/nom-fonctionnalite
git add .
git commit -m "feat: description de la fonctionnalité"
git push origin feature/nom-fonctionnalite

# Fusionner dans develop
git checkout develop
git merge feature/nom-fonctionnalite
git push origin develop
```

## 📦 Fonctionnalités Principales

### ✅ Prévues
- [ ] Authentification multi-niveaux (clients, vendeurs, admins)
- [ ] Catalogue produits avec recherche avancée
- [ ] Panier persistant et wishlist
- [ ] Système de commandes multi-étapes
- [ ] Intégration paiements (Stripe, PayPal)
- [ ] Dashboard vendeur avec analytics
- [ ] **Chatbot IA intelligent 24/7**
- [ ] Système de notifications temps réel
- [ ] Promotions et coupons
- [ ] Interface React moderne

### 🤖 Chatbot IA
- **IA conversationnelle** avec OpenAI GPT-4
- **Interface temps réel** avec WebSockets
- **Base de connaissances** dynamique
- **Escalade automatique** vers support humain
- **Analytics** et métriques de performance

## 🔧 Scripts Utiles

```bash
# Backend
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic
python manage.py test

# Frontend
npm test
npm run build
npm run lint
```

## 📚 Documentation

- [Architecture détaillée](docs/architecture.md)
- [API Documentation](docs/api.md)
- [Guide de déploiement](docs/deployment.md)
- [Guide Docker complet](DOCKER.md)
- [Installation pas à pas](INSTALLATION.md)
- [Guide de contribution](CONTRIBUTORS.md)

## 🤝 Contribution

Nous accueillons les contributions de la communauté ! 

- 📋 **Guidelines** : Voir [CONTRIBUTORS.md](CONTRIBUTORS.md)
- 📜 **Code de conduite** : [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- 🐛 **Signaler un bug** : Ouvrir une [issue](../../issues)
- 💡 **Proposer une fonctionnalité** : Ouvrir une [discussion](../../discussions)
- [Gestion des branches](BRANCHES.md)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'feat: ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

> **Note** : Ce projet est en cours de développement. Le chatbot IA représente une fonctionnalité innovante pour améliorer l'expérience client.