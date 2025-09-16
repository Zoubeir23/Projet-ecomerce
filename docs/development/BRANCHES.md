# Gestion des Branches Git - Projet E-commerce

## Structure des Branches

### Branches Principales
- `master` : Branche de production (code stable uniquement)
- `develop` : Branche de développement (intégration continue)

### Branches de Fonctionnalités (Features)

#### 🏗️ Infrastructure & Setup
- `feature/setup-project-structure` : Structure initiale backend/frontend
- `feature/api-rest` : Configuration API REST Django
- `feature/interface-react` : Setup interface React + TypeScript

#### 👥 Gestion Utilisateurs
- `feature/authentication-users` : Système d'authentification multi-niveaux
  - Login/Register clients, vendeurs, admins
  - JWT tokens, permissions granulaires
  - Profils utilisateurs complets

#### 🛍️ E-commerce Core
- `feature/gestion-produits` : Catalogue et gestion produits
  - CRUD produits, catégories, variantes
  - Images multiples, descriptions riches
  - Système d'avis et notes

- `feature/ajout-panier` : Panier d'achat persistant
  - Ajout/suppression produits
  - Sauvegarde cross-device
  - Wishlist intégrée

- `feature/gestion-commandes` : Processus de commande
  - Checkout multi-étapes
  - Gestion des adresses
  - Statuts de commande avancés

#### 💳 Paiements & Finances
- `feature/systeme-paiement` : Intégration paiements
  - Stripe et PayPal
  - Gestion des transactions
  - Génération factures PDF

#### 🏪 Espace Vendeur
- `feature/dashboard-vendeur` : Interface vendeur
  - Analytics et statistiques
  - Gestion stock et alertes
  - Rapports export CSV/PDF

#### 🎯 Marketing & Communication
- `feature/promotions-coupons` : Système promotionnel
  - Codes de réduction
  - Promotions par catégorie/vendeur
  - Newsletter intégrée

- `feature/notifications` : Système de notifications
  - Emails transactionnels
  - Notifications in-app temps réel
  - Templates personnalisables

#### 🤖 IA & Support
- `feature/chatbot-ia` : Chatbot intelligent
  - OpenAI GPT/Claude intégration
  - WebSocket temps réel
  - Escalade automatique support

## Workflow Git Recommandé

### 1. Travailler sur une fonctionnalité
```bash
# Basculer sur la branche de fonctionnalité
git checkout feature/ajout-panier

# Faire ses modifications et commits
git add .
git commit -m "feat: ajout fonctionnalité ajout produit au panier"

# Pousser la branche (première fois)
git push -u origin feature/ajout-panier
```

### 2. Fusionner une fonctionnalité terminée
```bash
# Retour sur develop
git checkout develop

# Récupérer les derniers changements
git pull origin develop

# Fusionner la fonctionnalité
git merge feature/ajout-panier

# Pousser les changements
git push origin develop

# Supprimer la branche locale (optionnel)
git branch -d feature/ajout-panier
```

### 3. Déploiement en production
```bash
# Fusionner develop dans master
git checkout master
git merge develop
git push origin master

# Taguer la version
git tag -a v1.0.0 -m "Version 1.0.0 - Lancement initial"
git push origin v1.0.0
```

## Conventions de Nommage

### Commits
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage code
- `refactor:` Refactorisation
- `test:` Ajout/modification tests
- `chore:` Tâches de maintenance

### Branches
- `feature/nom-fonctionnalite` : Nouvelle fonctionnalité
- `hotfix/nom-correction` : Correction urgente production
- `release/vX.X.X` : Préparation release

## Structure de Projet

```
Projet-ecomerce/
├── backend/           # Django API
│   ├── apps/
│   ├── core/
│   └── requirements/
├── frontend/          # React TypeScript
│   ├── src/
│   ├── public/
│   └── package.json
├── docs/             # Documentation
└── .github/          # Workflows CI/CD
```

## Commandes Utiles

```bash
# Lister toutes les branches
git branch -a

# Voir les branches distantes
git branch -r

# Créer et basculer sur nouvelle branche
git checkout -b feature/nouvelle-fonctionnalite

# Supprimer branche locale
git branch -d nom-branche

# Supprimer branche distante
git push origin --delete nom-branche

# Voir l'historique graphique
git log --oneline --graph --all
```

---

> **Note** : Toujours tester les fonctionnalités avant de fusionner dans `develop`
> **Conseil** : Faire des commits atomiques et des messages descriptifs