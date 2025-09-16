from django.db import models
from django.utils import timezone as django_timezone
from django.core.validators import MinValueValidator
import uuid

class Cart(models.Model):
    """Panier d'achat"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField('users.User', on_delete=models.CASCADE, related_name='cart')
    session_key = models.CharField(max_length=40, blank=True, null=True)  # Pour les utilisateurs non connectés
    
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'carts'
        verbose_name = 'Panier'
        verbose_name_plural = 'Paniers'

    def __str__(self):
        return f"Panier de {self.user.email if self.user else 'Anonyme'}"

    @property
    def total_items(self):
        """Nombre total d'articles dans le panier"""
        return sum(item.quantity for item in self.items.all())

    @property
    def total_amount(self):
        """Montant total du panier"""
        return sum(item.total_price for item in self.items.all())

    @property
    def is_empty(self):
        """Vérifie si le panier est vide"""
        return not self.items.exists()

class CartItem(models.Model):
    """Article dans le panier"""
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    variant = models.ForeignKey('products.ProductVariant', on_delete=models.CASCADE, blank=True, null=True)
    quantity = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    
    # Prix au moment de l'ajout (pour éviter les changements de prix)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'cart_items'
        verbose_name = 'Article panier'
        verbose_name_plural = 'Articles panier'
        unique_together = ['cart', 'product', 'variant']

    def __str__(self):
        variant_str = f" - {self.variant.name}" if self.variant else ""
        return f"{self.product.name}{variant_str} x{self.quantity}"

    @property
    def total_price(self):
        """Prix total de cette ligne"""
        return self.unit_price * self.quantity

    def save(self, *args, **kwargs):
        # Définir le prix unitaire si pas déjà défini
        if not self.unit_price:
            if self.variant:
                self.unit_price = self.variant.final_price
            else:
                self.unit_price = self.product.price
        super().save(*args, **kwargs)

class Order(models.Model):
    """Commande"""
    ORDER_STATUS = [
        ('pending', 'En attente'),
        ('confirmed', 'Confirmée'),
        ('processing', 'En traitement'),
        ('shipped', 'Expédiée'),
        ('delivered', 'Livrée'),
        ('cancelled', 'Annulée'),
        ('refunded', 'Remboursée'),
    ]

    PAYMENT_STATUS = [
        ('pending', 'En attente'),
        ('paid', 'Payée'),
        ('failed', 'Échec'),
        ('refunded', 'Remboursée'),
        ('partially_refunded', 'Partiellement remboursée'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_number = models.CharField(max_length=20, unique=True)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='orders')
    
    # Statuts
    status = models.CharField(max_length=20, choices=ORDER_STATUS, default='pending')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    
    # Informations de livraison
    shipping_address = models.JSONField()  # Stockage flexible de l'adresse
    billing_address = models.JSONField()
    
    # Informations de contact
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20, blank=True)
    
    # Montants
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_cost = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    tax_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    discount_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Codes promo
    coupon_code = models.CharField(max_length=50, blank=True)
    
    # Livraison
    shipping_method = models.CharField(max_length=100, blank=True)
    tracking_number = models.CharField(max_length=100, blank=True)
    estimated_delivery = models.DateTimeField(blank=True, null=True)
    
    # Notes
    notes = models.TextField(blank=True)
    admin_notes = models.TextField(blank=True)
    
    # Dates importantes
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    confirmed_at = models.DateTimeField(blank=True, null=True)
    shipped_at = models.DateTimeField(blank=True, null=True)
    delivered_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'orders'
        verbose_name = 'Commande'
        verbose_name_plural = 'Commandes'
        ordering = ['-created_at']

    def __str__(self):
        return f"Commande {self.order_number}"

    def save(self, *args, **kwargs):
        # Générer un numéro de commande si pas déjà défini
        if not self.order_number:
            # Format: ORD-YYYYMMDD-XXXX
            from datetime import datetime
            today = datetime.now().strftime('%Y%m%d')
            last_order = Order.objects.filter(
                order_number__startswith=f'ORD-{today}'
            ).order_by('-order_number').first()
            
            if last_order:
                last_num = int(last_order.order_number.split('-')[-1])
                new_num = str(last_num + 1).zfill(4)
            else:
                new_num = '0001'
            
            self.order_number = f'ORD-{today}-{new_num}'
        
        super().save(*args, **kwargs)

    @property
    def total_items(self):
        """Nombre total d'articles dans la commande"""
        return sum(item.quantity for item in self.items.all())

    @property
    def can_be_cancelled(self):
        """Vérifie si la commande peut être annulée"""
        return self.status in ['pending', 'confirmed']

class OrderItem(models.Model):
    """Article commandé"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    variant = models.ForeignKey('products.ProductVariant', on_delete=models.CASCADE, blank=True, null=True)
    vendor = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='vendor_order_items')
    
    # Informations du produit au moment de la commande
    product_name = models.CharField(max_length=200)
    product_sku = models.CharField(max_length=100, blank=True)
    variant_name = models.CharField(max_length=100, blank=True)
    
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Commission vendeur
    commission_rate = models.DecimalField(max_digits=5, decimal_places=2)  # %
    commission_amount = models.DecimalField(max_digits=8, decimal_places=2)
    
    created_at = models.DateTimeField(default=django_timezone.now)

    class Meta:
        db_table = 'order_items'
        verbose_name = 'Article commandé'
        verbose_name_plural = 'Articles commandés'

    def __str__(self):
        variant_str = f" - {self.variant_name}" if self.variant_name else ""
        return f"{self.product_name}{variant_str} x{self.quantity}"

    def save(self, *args, **kwargs):
        # Calculer le total et la commission
        self.total_price = self.unit_price * self.quantity
        self.commission_amount = (self.total_price * self.commission_rate) / 100
        
        # Sauvegarder les informations produit
        if not self.product_name:
            self.product_name = self.product.name
        if not self.product_sku:
            self.product_sku = getattr(self.variant, 'sku', '') or str(self.product.id)
        if self.variant and not self.variant_name:
            self.variant_name = self.variant.name
        if not self.commission_rate:
            self.commission_rate = self.vendor.vendor_profile.commission_rate
            
        super().save(*args, **kwargs)

class OrderStatusHistory(models.Model):
    """Historique des changements de statut"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='status_history')
    old_status = models.CharField(max_length=20)
    new_status = models.CharField(max_length=20)
    comment = models.TextField(blank=True)
    changed_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True)
    
    created_at = models.DateTimeField(default=django_timezone.now)

    class Meta:
        db_table = 'order_status_history'
        verbose_name = 'Historique statut commande'
        verbose_name_plural = 'Historiques statuts commandes'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.order.order_number}: {self.old_status} → {self.new_status}"
