#!/bin/bash

# Script de gestion Docker pour le projet E-commerce

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function pour afficher les messages
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Fonction pour vérifier si Docker est installé
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installé. Veuillez l'installer d'abord."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose n'est pas installé. Veuillez l'installer d'abord."
        exit 1
    fi
}

# Fonction pour démarrer les services
start_services() {
    log_info "Démarrage des services Docker..."
    docker-compose --env-file .env.docker up -d
    log_success "Services démarrés !"
    
    log_info "Attente que les services soient prêts..."
    sleep 10
    
    log_info "URLs disponibles :"
    echo "  - Frontend React : http://localhost:3000"
    echo "  - Backend Django : http://localhost:8000"
    echo "  - Admin DB (Adminer) : http://localhost:8080"
}

# Fonction pour arrêter les services
stop_services() {
    log_info "Arrêt des services Docker..."
    docker-compose down
    log_success "Services arrêtés !"
}

# Fonction pour rebuilder les images
rebuild_services() {
    log_info "Reconstruction des images Docker..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose --env-file .env.docker up -d
    log_success "Images reconstruites et services redémarrés !"
}

# Fonction pour voir les logs
view_logs() {
    if [ -n "$1" ]; then
        log_info "Affichage des logs pour le service : $1"
        docker-compose logs -f "$1"
    else
        log_info "Affichage de tous les logs..."
        docker-compose logs -f
    fi
}

# Fonction pour ouvrir un shell dans un container
shell_access() {
    service=${1:-backend}
    log_info "Ouverture d'un shell dans le container : $service"
    docker-compose exec "$service" /bin/sh
}

# Fonction pour installer les dépendances
install_deps() {
    log_info "Installation des dépendances..."
    
    # Frontend
    log_info "Installation des dépendances frontend..."
    docker-compose exec frontend yarn install
    
    # Backend
    log_info "Installation des dépendances backend..."
    docker-compose exec backend pip install -r requirements.txt
    
    log_success "Dépendances installées !"
}

# Fonction pour les migrations Django
migrate() {
    log_info "Exécution des migrations Django..."
    docker-compose exec backend python manage.py migrate
    log_success "Migrations terminées !"
}

# Fonction pour créer un superuser Django
create_superuser() {
    log_info "Création d'un superuser Django..."
    docker-compose exec backend python manage.py createsuperuser
}

# Fonction d'aide
show_help() {
    echo "Utilisation: $0 [COMMANDE]"
    echo ""
    echo "Commandes disponibles :"
    echo "  start       Démarrer tous les services"
    echo "  stop        Arrêter tous les services"
    echo "  restart     Redémarrer tous les services"
    echo "  rebuild     Reconstruire les images et redémarrer"
    echo "  logs        Voir les logs (logs [service] pour un service spécifique)"
    echo "  shell       Ouvrir un shell (shell [service], défaut: backend)"
    echo "  install     Installer/mettre à jour les dépendances"
    echo "  migrate     Exécuter les migrations Django"
    echo "  superuser   Créer un superuser Django"
    echo "  status      Voir le statut des services"
    echo "  clean       Nettoyer les volumes et images"
    echo "  help        Afficher cette aide"
}

# Fonction pour voir le statut
show_status() {
    log_info "Statut des services :"
    docker-compose ps
}

# Fonction de nettoyage
clean_docker() {
    log_warning "Nettoyage des volumes et images Docker..."
    read -p "Êtes-vous sûr ? Cette action supprimera toutes les données. (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose down -v
        docker system prune -f
        log_success "Nettoyage terminé !"
    else
        log_info "Nettoyage annulé."
    fi
}

# Script principal
main() {
    check_docker
    
    case "${1:-help}" in
        start)
            start_services
            ;;
        stop)
            stop_services
            ;;
        restart)
            stop_services
            start_services
            ;;
        rebuild)
            rebuild_services
            ;;
        logs)
            view_logs "$2"
            ;;
        shell)
            shell_access "$2"
            ;;
        install)
            install_deps
            ;;
        migrate)
            migrate
            ;;
        superuser)
            create_superuser
            ;;
        status)
            show_status
            ;;
        clean)
            clean_docker
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            log_error "Commande inconnue : $1"
            show_help
            exit 1
            ;;
    esac
}

# Exécuter le script principal
main "$@"