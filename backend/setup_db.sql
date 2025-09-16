-- Script de configuration PostgreSQL pour le projet e-commerce
-- Selon les instructions du projet de haut niveau

-- Création de l'utilisateur pour l'application
CREATE USER ecommerce_user WITH PASSWORD 'ecommerce_password';

-- Création de la base de données
CREATE DATABASE ecommerce_db OWNER ecommerce_user;

-- Attribution des privilèges
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;

-- Connexion à la base ecommerce_db pour attribuer les privilèges sur le schéma
\c ecommerce_db;
GRANT ALL ON SCHEMA public TO ecommerce_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ecommerce_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ecommerce_user;

-- Configuration pour les futures tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ecommerce_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ecommerce_user;

-- Affichage de confirmation
\echo 'Configuration PostgreSQL terminée pour le projet e-commerce'
\echo 'Base de données: ecommerce_db'
\echo 'Utilisateur: ecommerce_user'
\echo 'Prêt pour les migrations Django'