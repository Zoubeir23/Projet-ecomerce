from django.db import models
from django.utils import timezone as django_timezone
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify
import uuid

class Category(models.Model):
    """Catégories de produits"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    
    # Hiérarchie
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='children')
    
    # Métadonnées
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'categories'
        verbose_name = 'Catégorie'
        verbose_name_plural = 'Catégories'
        ordering = ['sort_order', 'name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_full_path(self):
        """Retourne le chemin complet de la catégorie"""
        if self.parent:
            return f"{self.parent.get_full_path()} > {self.name}"
        return self.name

class Product(models.Model):
    """Produits de la plateforme"""
    PRODUCT_STATUS = [
        ('draft', 'Brouillon'),
        ('active', 'Actif'),
        ('inactive', 'Inactif'),
        ('out_of_stock', 'Rupture de stock'),
        ('discontinued', 'Arrêté'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vendor = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    
    # Informations de base
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField()
    short_description = models.CharField(max_length=300, blank=True)
    
    # Prix et stock
    price = models.DecimalField(max_digits=10, decimal_places=2)
    compare_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    stock_quantity = models.PositiveIntegerField(default=0)
    low_stock_threshold = models.PositiveIntegerField(default=5)
    track_inventory = models.BooleanField(default=True)
    
    # Caractéristiques physiques
    weight = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)  # kg
    length = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)  # cm
    width = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)   # cm
    height = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)  # cm
    
    # SEO et métadonnées
    meta_title = models.CharField(max_length=70, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    tags = models.CharField(max_length=500, blank=True, help_text="Tags séparés par des virgules")
    
    # Statut et visibilité
    status = models.CharField(max_length=20, choices=PRODUCT_STATUS, default='draft')
    is_featured = models.BooleanField(default=False)
    is_digital = models.BooleanField(default=False)
    
    # Statistiques
    views_count = models.PositiveIntegerField(default=0)
    sales_count = models.PositiveIntegerField(default=0)
    rating_average = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    rating_count = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products'
        verbose_name = 'Produit'
        verbose_name_plural = 'Produits'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'category']),
            models.Index(fields=['vendor', 'status']),
            models.Index(fields=['is_featured', 'status']),
        ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @property
    def is_on_sale(self):
        """Vérifie si le produit est en promotion"""
        return self.compare_price and self.compare_price > self.price

    @property
    def discount_percentage(self):
        """Calcule le pourcentage de réduction"""
        if self.is_on_sale:
            return round(((self.compare_price - self.price) / self.compare_price) * 100)
        return 0

    @property
    def is_in_stock(self):
        """Vérifie si le produit est en stock"""
        if not self.track_inventory:
            return True
        return self.stock_quantity > 0

    @property
    def is_low_stock(self):
        """Vérifie si le stock est faible"""
        if not self.track_inventory:
            return False
        return self.stock_quantity <= self.low_stock_threshold

class ProductImage(models.Model):
    """Images des produits"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)
    sort_order = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(default=django_timezone.now)

    class Meta:
        db_table = 'product_images'
        verbose_name = 'Image produit'
        verbose_name_plural = 'Images produits'
        ordering = ['sort_order', 'created_at']

    def __str__(self):
        return f"Image de {self.product.name}"

    def save(self, *args, **kwargs):
        # Assurer qu'il n'y a qu'une seule image principale par produit
        if self.is_primary:
            ProductImage.objects.filter(
                product=self.product, 
                is_primary=True
            ).exclude(pk=self.pk).update(is_primary=False)
        super().save(*args, **kwargs)

class ProductVariant(models.Model):
    """Variantes de produits (taille, couleur, etc.)"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    
    # Attributs de variante
    name = models.CharField(max_length=100)  # Ex: "Rouge - M", "Bleu - L"
    sku = models.CharField(max_length=100, unique=True)
    
    # Attributs individuels
    color = models.CharField(max_length=50, blank=True)
    size = models.CharField(max_length=20, blank=True)
    material = models.CharField(max_length=50, blank=True)
    
    # Prix spécifique (optionnel)
    price_adjustment = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    
    # Stock spécifique
    stock_quantity = models.PositiveIntegerField(default=0)
    
    # Image spécifique (optionnel)
    image = models.ImageField(upload_to='product_variants/', blank=True, null=True)
    
    # Statut
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'product_variants'
        verbose_name = 'Variante produit'
        verbose_name_plural = 'Variantes produits'
        unique_together = ['product', 'name']

    def __str__(self):
        return f"{self.product.name} - {self.name}"

    @property
    def final_price(self):
        """Prix final de la variante"""
        return self.product.price + self.price_adjustment

class ProductReview(models.Model):
    """Avis clients sur les produits"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='reviews')
    
    # Évaluation
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    title = models.CharField(max_length=200)
    comment = models.TextField()
    
    # Métadonnées
    is_verified_purchase = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    helpful_count = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'product_reviews'
        verbose_name = 'Avis produit'
        verbose_name_plural = 'Avis produits'
        ordering = ['-created_at']
        unique_together = ['product', 'user']

    def __str__(self):
        return f"Avis de {self.user.email} sur {self.product.name}"
