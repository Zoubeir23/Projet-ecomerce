# Structure du Projet E-commerce

Cette structure a été créée pour organiser le projet Django + React de manière modulaire et évolutive.

## Structure Actuelle

```
Projet-ecomerce/
├── backend/                           # 🐍 API Django
│   ├── apps/                          # Applications modulaires
│   │   ├── users/                     # 👥 Gestion utilisateurs
│   │   ├── products/                  # 📦 Catalogue produits
│   │   ├── orders/                    # 🛒 Commandes
│   │   ├── payments/                  # 💳 Paiements
│   │   ├── promotions/                # 🎯 Marketing
│   │   ├── notifications/             # 📧 Notifications
│   │   ├── support/                   # 🎧 Support client
│   │   ├── chatbot/                   # 🤖 Chatbot IA
│   │   └── analytics/                 # 📊 Statistiques
│   ├── core/                          # ⚙️ Configuration Django
│   ├── static/                        # 🎨 Fichiers statiques
│   ├── media/                         # 📸 Uploads utilisateurs
│   ├── templates/                     # 📄 Templates Django
│   └── requirements/                  # 📋 Dépendances Python
├── frontend/                          # ⚛️ Interface React
│   ├── src/
│   │   ├── components/                # 🧩 Composants React
│   │   │   └── Chat/                  # 💬 Interface chatbot
│   │   ├── pages/                     # 📱 Pages application
│   │   ├── services/                  # 🔗 Services API
│   │   ├── hooks/                     # 🪝 Hooks React
│   │   ├── utils/                     # 🛠️ Utilitaires
│   │   └── styles/                    # 🎨 Styles CSS
│   └── public/                        # 🌐 Assets publics
├── docs/                              # 📚 Documentation
├── scripts/                           # 🔧 Scripts automatisation
├── myenv/                             # 🐍 Environnement virtuel
├── .github/                           # 🚀 CI/CD & Instructions
│   └── instructions/
└── README.md                          # 📖 Documentation principale
```

## Prochaines étapes

1. **Activer l'environnement virtuel** et installer Django
2. **Initialiser le projet Django** dans le dossier backend
3. **Créer les applications** Django modulaires
4. **Initialiser React** dans le dossier frontend
5. **Configurer les dépendances** pour chaque partie

Cette structure respecte les bonnes pratiques et facilite la maintenance du code.