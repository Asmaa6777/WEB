from django import forms
from .models import Recipe

class RecipeForm(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = ['title', 'category', 'ingredients', 'instructions', 'prep_time', 'cook_time', 'servings', 'image']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Recipe Title'}),
            'category': forms.Select(attrs={'class': 'form-control'}),
            'ingredients': forms.Textarea(attrs={'class': 'form-control', 'rows': 5, 'placeholder': 'List ingredients...'}),
            'instructions': forms.Textarea(attrs={'class': 'form-control', 'rows': 5, 'placeholder': 'Step by step instructions...'}),
            'prep_time': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Minutes'}),
            'cook_time': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Minutes'}),
            'servings': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Number of servings'}),
            'image': forms.FileInput(attrs={'class': 'form-control'}),
        }