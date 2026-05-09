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
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='recipes')
    description = models.TextField()
    ingredients = models.TextField(help_text="Enter ingredients, one per line")
    instructions = models.TextField(help_text="Enter steps, one per line")
    image = models.ImageField(upload_to='recipes/', default='placeholder.svg')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    def get_ingredients_list(self):
        return [i.strip() for i in self.ingredients.split('\n') if i.strip()]
    
    def get_instructions_list(self):
        return [i.strip() for i in self.instructions.split('\n') if i.strip()]
