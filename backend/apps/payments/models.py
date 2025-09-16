from django.db import models
from django.utils import timezone as django_timezone
import uuid

class Payment(models.Model):
    """Paiements de la plateforme"""
    PAYMENT_METHODS = [
        ('stripe_card', 'Carte bancaire (Stripe)'),
        ('stripe_sepa', 'Virement SEPA (Stripe)'),
        ('paypal', 'PayPal'),
        ('bank_transfer', 'Virement bancaire'),
        ('admin', 'Paiement manuel (Admin)'),
    ]

    PAYMENT_STATUS = [
        ('pending', 'En attente'),
        ('processing', 'En cours'),
        ('completed', 'Terminé'),
        ('failed', 'Échec'),
        ('cancelled', 'Annulé'),
        ('refunded', 'Remboursé'),
        ('partially_refunded', 'Partiellement remboursé'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE, related_name='payments')
    
    # Méthode et statut
    method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    
    # Montants
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='EUR')
    
    # Identifiants externes
    stripe_payment_intent_id = models.CharField(max_length=200, blank=True)
    stripe_charge_id = models.CharField(max_length=200, blank=True)
    paypal_payment_id = models.CharField(max_length=200, blank=True)
    paypal_payer_id = models.CharField(max_length=200, blank=True)
    
    # Métadonnées
    gateway_response = models.JSONField(blank=True, null=True)  # Réponse complète du gateway
    failure_reason = models.TextField(blank=True)
    
    # Informations de carte (partielles, pour l'affichage)
    card_last4 = models.CharField(max_length=4, blank=True)
    card_brand = models.CharField(max_length=20, blank=True)
    card_exp_month = models.CharField(max_length=2, blank=True)
    card_exp_year = models.CharField(max_length=4, blank=True)
    
    # Dates
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'payments'
        verbose_name = 'Paiement'
        verbose_name_plural = 'Paiements'
        ordering = ['-created_at']

    def __str__(self):
        return f"Paiement {self.amount}€ - {self.order.order_number}"

    @property
    def is_successful(self):
        """Vérifie si le paiement a réussi"""
        return self.status == 'completed'

    @property
    def can_be_refunded(self):
        """Vérifie si le paiement peut être remboursé"""
        return self.status == 'completed' and self.method in ['stripe_card', 'stripe_sepa', 'paypal']

class Refund(models.Model):
    """Remboursements"""
    REFUND_STATUS = [
        ('pending', 'En attente'),
        ('processing', 'En cours'),
        ('completed', 'Terminé'),
        ('failed', 'Échec'),
        ('cancelled', 'Annulé'),
    ]

    REFUND_REASONS = [
        ('customer_request', 'Demande client'),
        ('product_defect', 'Produit défectueux'),
        ('wrong_item', 'Mauvais article'),
        ('not_delivered', 'Non livré'),
        ('admin_decision', 'Décision administrative'),
        ('duplicate_payment', 'Paiement en double'),
        ('fraud', 'Fraude'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='refunds')
    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE, related_name='refunds')
    
    # Montant et raison
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    reason = models.CharField(max_length=20, choices=REFUND_REASONS)
    reason_detail = models.TextField(blank=True)
    
    # Statut
    status = models.CharField(max_length=20, choices=REFUND_STATUS, default='pending')
    
    # Identifiants externes
    stripe_refund_id = models.CharField(max_length=200, blank=True)
    paypal_refund_id = models.CharField(max_length=200, blank=True)
    
    # Métadonnées
    gateway_response = models.JSONField(blank=True, null=True)
    failure_reason = models.TextField(blank=True)
    
    # Qui a initié le remboursement
    requested_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True)
    approved_by = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, related_name='approved_refunds')
    
    # Dates
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'refunds'
        verbose_name = 'Remboursement'
        verbose_name_plural = 'Remboursements'
        ordering = ['-created_at']

    def __str__(self):
        return f"Remboursement {self.amount}€ - {self.order.order_number}"

class PaymentMethod(models.Model):
    """Méthodes de paiement sauvegardées des utilisateurs"""
    PAYMENT_TYPES = [
        ('stripe_card', 'Carte bancaire'),
        ('stripe_sepa', 'Compte bancaire SEPA'),
        ('paypal', 'Compte PayPal'),
    ]

    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='payment_methods')
    type = models.CharField(max_length=20, choices=PAYMENT_TYPES)
    is_default = models.BooleanField(default=False)
    
    # Stripe
    stripe_payment_method_id = models.CharField(max_length=200, blank=True)
    stripe_customer_id = models.CharField(max_length=200, blank=True)
    
    # PayPal
    paypal_billing_agreement_id = models.CharField(max_length=200, blank=True)
    
    # Informations d'affichage (partielles)
    display_name = models.CharField(max_length=100)  # Ex: "Visa ****1234" ou "IBAN ****5678"
    
    # Dates
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    last_used_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'payment_methods'
        verbose_name = 'Méthode de paiement'
        verbose_name_plural = 'Méthodes de paiement'
        ordering = ['-is_default', '-last_used_at']

    def __str__(self):
        return f"{self.display_name} - {self.user.email}"

    def save(self, *args, **kwargs):
        # Assurer qu'il n'y a qu'une seule méthode par défaut par utilisateur
        if self.is_default:
            PaymentMethod.objects.filter(
                user=self.user, 
                is_default=True
            ).exclude(pk=self.pk).update(is_default=False)
        super().save(*args, **kwargs)

class VendorPayout(models.Model):
    """Paiements aux vendeurs"""
    PAYOUT_STATUS = [
        ('pending', 'En attente'),
        ('processing', 'En cours'),
        ('paid', 'Payé'),
        ('failed', 'Échec'),
        ('cancelled', 'Annulé'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vendor = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='payouts')
    
    # Période couverte
    period_start = models.DateField()
    period_end = models.DateField()
    
    # Montants
    total_sales = models.DecimalField(max_digits=12, decimal_places=2)
    commission_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payout_amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Statut
    status = models.CharField(max_length=20, choices=PAYOUT_STATUS, default='pending')
    
    # Méthode de paiement
    payout_method = models.CharField(max_length=50, default='bank_transfer')
    
    # Identifiants externes
    stripe_transfer_id = models.CharField(max_length=200, blank=True)
    paypal_payout_batch_id = models.CharField(max_length=200, blank=True)
    
    # Métadonnées
    gateway_response = models.JSONField(blank=True, null=True)
    failure_reason = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    
    # Dates
    created_at = models.DateTimeField(default=django_timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    paid_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'vendor_payouts'
        verbose_name = 'Paiement vendeur'
        verbose_name_plural = 'Paiements vendeurs'
        ordering = ['-created_at']
        unique_together = ['vendor', 'period_start', 'period_end']

    def __str__(self):
        return f"Paiement {self.payout_amount}€ - {self.vendor.vendor_profile.company_name}"

class Transaction(models.Model):
    """Journal des transactions financières"""
    TRANSACTION_TYPES = [
        ('payment_received', 'Paiement reçu'),
        ('refund_issued', 'Remboursement émis'),
        ('vendor_payout', 'Paiement vendeur'),
        ('commission_earned', 'Commission perçue'),
        ('fee_charged', 'Frais prélevés'),
        ('adjustment', 'Ajustement'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Relations
    payment = models.ForeignKey(Payment, on_delete=models.SET_NULL, null=True, blank=True)
    refund = models.ForeignKey(Refund, on_delete=models.SET_NULL, null=True, blank=True)
    payout = models.ForeignKey(VendorPayout, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.ForeignKey('orders.Order', on_delete=models.SET_NULL, null=True, blank=True)
    
    # Type et montant
    type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=3, default='EUR')
    
    # Description
    description = models.CharField(max_length=200)
    reference = models.CharField(max_length=100, blank=True)
    
    created_at = models.DateTimeField(default=django_timezone.now)

    class Meta:
        db_table = 'transactions'
        verbose_name = 'Transaction'
        verbose_name_plural = 'Transactions'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_type_display()}: {self.amount}€"
