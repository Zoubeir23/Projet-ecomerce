"""
Configuration ASGI pour la plateforme e-commerce évoluée

Cette configuration supporte :
- HTTP/HTTPS classique
- WebSockets pour le chat temps réel
- Routing par type de protocole
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_platform.settings')

# Configuration Django ASGI
django_asgi_app = get_asgi_application()

# Import des routing WebSocket (sera créé plus tard)
try:
    from chatbot.routing import websocket_urlpatterns
except ImportError:
    websocket_urlpatterns = []

application = ProtocolTypeRouter({
    # HTTP classique
    "http": django_asgi_app,
    
    # WebSocket pour le chat temps réel
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(websocket_urlpatterns)
        )
    ),
})
