from django.db import models
from accounts.models import CustomUser

class Recipe(models.Model):
    CATEGORY_CHOICES = [
        ('appetizer', 'Appetizer'),
        ('main_course', 'Main Course'),
        ('dessert', 'Dessert'),
        ('beverage', 'Beverage'),
        ('breakfast', 'Breakfast'),
    ]

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    ingredients = models.TextField()
    instructions = models.TextField()
    prep_time = models.IntegerField()  # in minutes
    cook_time = models.IntegerField()  # in minutes
    servings = models.IntegerField()
    image = models.ImageField(upload_to='recipes/', null=True, blank=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']