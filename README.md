# Plateforme E-commerce Multi-vendeurs avec Chatbot IA

## 🏗️ Architecture du Projet

```
Projet-ecomerce/
├── backend/                    # API Django
│   ├── apps/                   # Applications Django modulaires
│   │   ├── users/              # Gestion utilisateurs
│   │   ├── products/           # Catalogue produits
│   │   ├── orders/             # Commandes
│   │   ├── payments/           # Système de paiement
│   │   ├── promotions/         # Marketing et promotions
│   │   ├── notifications/      # Notifications
│   │   ├── support/            # Support client
│   │   ├── chatbot/            # Chatbot IA
│   │   └── analytics/          # Statistiques
│   ├── core/                   # Configuration Django
│   ├── static/                 # Fichiers statiques
│   ├── media/                  # Uploads utilisateurs
│   ├── templates/              # Templates Django
│   └── requirements/           # Dépendances Python
├── frontend/                   # Interface React
│   ├── src/
│   │   ├── components/         # Composants React
│   │   │   └── Chat/           # Interface chatbot
│   │   ├── pages/              # Pages de l'application
│   │   ├── services/           # Services API
│   │   ├── hooks/              # Hooks React personnalisés
│   │   ├── utils/              # Utilitaires
│   │   └── styles/             # Styles CSS/Sass
│   └── public/                 # Assets publics
├── docs/                       # Documentation
├── scripts/                    # Scripts d'automatisation
├── myenv/                      # Environnement virtuel Python
└── .github/                    # Workflows CI/CD
```

## 🚀 Technologies

### Backend
- **Django 4.2+** avec Django REST Framework
- **PostgreSQL** (production) / SQLite (développement)
- **Redis** pour cache et sessions
- **Celery** pour tâches asynchrones
- **Django Channels** pour WebSockets (chatbot)
- **OpenAI GPT / Claude** pour IA conversationnelle

### Frontend
- **React 18+** avec TypeScript
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