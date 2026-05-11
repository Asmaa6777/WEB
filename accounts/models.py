from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    dob = models.DateField(null=True, blank=True, verbose_name="Date of Birth")
    
    ROLE_CHOICES = (
        ('user', 'User'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
