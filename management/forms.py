from django import forms
from recipes.models import Recipe, Category

class RecipeForm(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = [
            'name', 'category', 'description', 'ingredients', 'instructions',
            'cuisine', 'difficulty', 'prep_time', 'cook_time', 'servings',
            'is_vegan', 'is_vegetarian', 'is_gluten_free', 'is_nut_free', 'is_dairy_free',
            'image'
        ]
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'e.g. Spaghetti Bolognese'}),
            'category': forms.Select(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 3, 'placeholder': 'Describe your recipe...'}),
            'ingredients': forms.Textarea(attrs={'class': 'form-control', 'rows': 5, 'placeholder': 'Enter ingredients, one per line'}),
            'instructions': forms.Textarea(attrs={'class': 'form-control', 'rows': 5, 'placeholder': 'First do this then do that...'}),
            'cuisine': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'e.g. Italian'}),
            'difficulty': forms.Select(attrs={'class': 'form-control'}),
            'prep_time': forms.NumberInput(attrs={'class': 'form-control', 'min': 0}),
            'cook_time': forms.NumberInput(attrs={'class': 'form-control', 'min': 0}),
            'servings': forms.NumberInput(attrs={'class': 'form-control', 'min': 1}),
            'is_vegan': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'is_vegetarian': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'is_gluten_free': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'is_nut_free': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'is_dairy_free': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
            'image': forms.FileInput(attrs={'class': 'form-control'}),
        }
