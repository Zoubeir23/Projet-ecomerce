from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone as django_timezone
import uuid

class User(AbstractUser):
    """Modèle utilisateur étendu"""
    USER_TYPES = [
        ('customer', 'Client'),
        ('vendor', 'Vendeur'),
        ('admin', 'Administrateur'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default='customer')
    phone = models.CharField(max_length=20, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    class Meta:
        db_table = 'users'
        verbose_name = 'Utilisateur'
        verbose_name_plural = 'Utilisateurs'

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

class UserProfile(models.Model):
    """Profil utilisateur détaillé"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True)
    website = models.URLField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    newsletter_subscription = models.BooleanField(default=True)
    
    # Préférences
    language = models.CharField(max_length=10, default='fr')
    currency = models.CharField(max_length=3, default='EUR')
    timezone = models.CharField(max_length=50, default='Europe/Paris')
    
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'user_profiles'
        verbose_name = 'Profil utilisateur'
        verbose_name_plural = 'Profils utilisateurs'

    def __str__(self):
        return f"Profil de {self.user.email}"

class VendorProfile(models.Model):
    """Profil vendeur"""
    VENDOR_STATUS = [
        ('pending', 'En attente'),
        ('approved', 'Approuvé'),
        ('suspended', 'Suspendu'),
        ('rejected', 'Rejeté'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='vendor_profile')
    company_name = models.CharField(max_length=200)
    company_description = models.TextField()
    company_logo = models.ImageField(upload_to='vendor_logos/', blank=True, null=True)
    
    # Informations légales
    siret = models.CharField(max_length=14, unique=True)
    vat_number = models.CharField(max_length=20, blank=True)
    
    # Informations bancaires
    iban = models.CharField(max_length=34)
    bic = models.CharField(max_length=11)
    
    # Statut et performance
    status = models.CharField(max_length=20, choices=VENDOR_STATUS, default='pending')
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_sales = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    commission_rate = models.DecimalField(max_digits=5, decimal_places=2, default=5.00)  # %
    
    approved_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'vendor_profiles'
        verbose_name = 'Profil vendeur'
        verbose_name_plural = 'Profils vendeurs'

    def __str__(self):
        return f"{self.company_name} ({self.user.email})"

class Address(models.Model):
    """Adresses des utilisateurs"""
    ADDRESS_TYPES = [
        ('billing', 'Facturation'),
        ('shipping', 'Livraison'),
        ('both', 'Facturation et Livraison'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    type = models.CharField(max_length=20, choices=ADDRESS_TYPES)
    is_default = models.BooleanField(default=False)
    
    # Informations adresse
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    company = models.CharField(max_length=100, blank=True)
    
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    state = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, default='France')
    
    phone = models.CharField(max_length=20, blank=True)
    
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'addresses'
        verbose_name = 'Adresse'
        verbose_name_plural = 'Adresses'
        unique_together = ['user', 'type', 'is_default']

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.city}"

    def save(self, *args, **kwargs):
        # Assurer qu'il n'y a qu'une seule adresse par défaut par type
        if self.is_default:
            Address.objects.filter(
                user=self.user, 
                type=self.type, 
                is_default=True
            ).exclude(pk=self.pk).update(is_default=False)
        super().save(*args, **kwargs)
