from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    """Represents a course type (e.g., Main Course, Dessert, Appetizer)"""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    """The core recipe data model"""
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]

    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='recipes')
    description = models.TextField()
    ingredients = models.TextField(help_text="Enter ingredients, one per line or JSON format")
    instructions = models.TextField(help_text="Enter steps, one per line")
    cuisine = models.CharField(max_length=100, blank=True)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='medium')
    prep_time = models.PositiveIntegerField(help_text="Prep time in minutes", default=0)
    cook_time = models.PositiveIntegerField(help_text="Cook time in minutes", default=0)
    servings = models.PositiveIntegerField(default=1)
    
    # Dietary flags
    is_vegan = models.BooleanField(default=False)
    is_vegetarian = models.BooleanField(default=False)
    is_gluten_free = models.BooleanField(default=False)
    is_nut_free = models.BooleanField(default=False)
    is_dairy_free = models.BooleanField(default=False)
    
    image = models.ImageField(upload_to='recipes/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    def get_ingredients_list(self):
        return [i.strip() for i in self.ingredients.split('\n') if i.strip()]
    
    def get_instructions_list(self):
        return [i.strip() for i in self.instructions.split('\n') if i.strip()]
