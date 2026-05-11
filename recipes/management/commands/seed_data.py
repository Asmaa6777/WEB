from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from recipes.models import Category, Recipe
from django.utils.text import slugify

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with initial data including categories, recipes, and users.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Delete all existing data before seeding',
        )

    def handle(self, *args, **kwargs):
        reset = kwargs.get('reset')
        if reset:
            self.stdout.write(self.style.WARNING('Resetting database...'))
            Recipe.objects.all().delete()
            Category.objects.all().delete()
            User.objects.exclude(is_superuser=True).delete()
            self.stdout.write('Existing recipes, categories, and non-admin users deleted.')

        self.stdout.write('Seeding data...')

        # 1. Create Users
        self.create_users()

        # 2. Create Categories
        categories = self.create_categories()

        # 3. Create Recipes
        self.create_recipes(categories)

        self.stdout.write(self.style.SUCCESS('Successfully seeded database!'))

    def create_users(self):
        self.stdout.write('Creating users...')
        # Admin user
        if not User.objects.filter(email='admin@recipefinder.com').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@recipefinder.com',
                password='adminpassword'
            )
            self.stdout.write('- Admin user created (admin@recipefinder.com / adminpassword)')
        
        # Regular user
        if not User.objects.filter(email='user@recipefinder.com').exists():
            User.objects.create_user(
                username='regularuser',
                email='user@recipefinder.com',
                password='userpassword'
            )
            self.stdout.write('- Regular user created (user@recipefinder.com / userpassword)')

    def create_categories(self):
        self.stdout.write('Creating categories...')
        category_names = ['Main Course', 'Appetizer', 'Dessert', 'Breakfast', 'Drinks']
        categories = {}
        for name in category_names:
            cat, created = Category.objects.get_or_create(
                name=name,
                defaults={'slug': slugify(name)}
            )
            categories[name] = cat
            if created:
                self.stdout.write(f'- Category "{name}" created')
        return categories

    def create_recipes(self, categories):
        self.stdout.write('Creating recipes...')
        recipes_data = [
            {
                "name": "Spaghetti Carbonara",
                "category": "Main Course",
                "description": "Silky Roman pasta with crispy pancetta and creamy egg sauce.",
                "ingredients": "Spaghetti\nEggs\nPancetta\nParmesan\nBlack Pepper\nSalt",
                "instructions": "Boil spaghetti in salted water until al dente.\nFry pancetta until crispy in a pan.\nWhisk eggs and parmesan together in a bowl.\nDrain pasta and mix with pancetta off the heat.\nAdd egg mixture and toss quickly to coat.\nSeason with black pepper and serve immediately.",
            },
            {
                "name": "Avocado Toast",
                "category": "Appetizer",
                "description": "Creamy smashed avocado on golden toasted sourdough with a kick of chili.",
                "ingredients": "Sourdough Bread\nAvocado\nLemon\nChili Flakes\nOlive Oil\nSalt",
                "instructions": "Toast sourdough bread until golden and crispy.\nHalve the avocado and scoop out the flesh.\nMash avocado with lemon juice and salt.\nSpread avocado mixture on the toast.\nDrizzle with olive oil and sprinkle chili flakes.\nServe immediately.",
            },
            {
                "name": "Strawberry Cheesecake",
                "category": "Dessert",
                "description": "Velvety cheesecake topped with fresh glossy strawberries.",
                "ingredients": "Cream Cheese\nStrawberries\nDigestive Biscuits\nButter\nSugar\nVanilla",
                "instructions": "Crush digestive biscuits and mix with melted butter.\nPress mixture into the base of a springform pan.\nBeat cream cheese, sugar and vanilla until smooth.\nPour filling over the biscuit base.\nRefrigerate for at least 4 hours until set.\nTop with fresh strawberries before serving.",
            },
            {
                "name": "Butter Chicken",
                "category": "Main Course",
                "description": "Tender chicken in a rich, velvety tomato and butter sauce.",
                "ingredients": "Chicken\nButter\nTomato Puree\nHeavy Cream\nGarlic\nGaram Masala\nGinger",
                "instructions": "Marinate chicken in yogurt and spices for 1 hour.\nGrill or pan fry chicken until cooked through.\nSaut\u00e9 garlic and ginger in butter.\nAdd tomato puree and garam masala, simmer for 10 minutes.\nStir in heavy cream and add the cooked chicken.\nSimmer for 5 minutes and serve with rice or naan.",
            },
            {
                "name": "Caprese Salad",
                "category": "Appetizer",
                "description": "Fresh mozzarella and ripe tomatoes drizzled with balsamic glaze.",
                "ingredients": "Fresh Mozzarella\nTomatoes\nBasil\nOlive Oil\nBalsamic Glaze\nSalt",
                "instructions": "Slice mozzarella and tomatoes into equal rounds.\nAlternate mozzarella and tomato slices on a plate.\nTuck fresh basil leaves between the slices.\nDrizzle generously with olive oil.\nAdd balsamic glaze and a pinch of salt.\nServe immediately at room temperature.",
            },
            {
                "name": "Chocolate Lava Cake",
                "category": "Dessert",
                "description": "Warm chocolate cake with an irresistible molten center.",
                "ingredients": "Dark Chocolate\nButter\nEggs\nSugar\nFlour\nVanilla",
                "instructions": "Preheat oven to 220\u00b0C and grease ramekins.\nMelt dark chocolate and butter together.\nWhisk eggs, sugar and vanilla until pale.\nFold chocolate mixture into the eggs.\nSift in flour and fold gently.\nPour into ramekins and bake for 12 minutes.\nInvert onto a plate and serve immediately.",
            },
            {
                "name": "Salmon Poke Bowl",
                "category": "Main Course",
                "description": "Vibrant Hawaiian bowl with fresh salmon, rice and colorful toppings.",
                "ingredients": "Salmon\nSushi Rice\nAvocado\nCucumber\nEdamame\nSoy Sauce\nSesame Oil",
                "instructions": "Cook sushi rice and season with rice vinegar.\nDice fresh salmon into cubes and marinate in soy sauce and sesame oil.\nSlice avocado and cucumber.\nAssemble bowl with rice as the base.\nArrange salmon, avocado, cucumber and edamame on top.\nDrizzle with extra soy sauce and sesame oil.",
            },
            {
                "name": "Bruschetta",
                "category": "Appetizer",
                "description": "Toasted bread topped with juicy tomatoes, fresh basil and garlic.",
                "ingredients": "Baguette\nTomatoes\nBasil\nGarlic\nOlive Oil\nBalsamic",
                "instructions": "Slice baguette diagonally and toast until golden.\nDice tomatoes and mix with chopped basil.\nAdd olive oil, balsamic and a pinch of salt.\nRub toasted bread with a cut garlic clove.\nSpoon tomato mixture onto each slice.\nServe immediately.",
            },
            {
                "name": "Cr\u00e8me Br\u00fbl\u00e9e",
                "category": "Dessert",
                "description": "Silky custard topped with a perfectly caramelized sugar crust.",
                "ingredients": "Heavy Cream\nEgg Yolks\nSugar\nVanilla Bean",
                "instructions": "Preheat oven to 160\u00b0C.\nHeat heavy cream with vanilla bean until just simmering.\nWhisk egg yolks and sugar until pale.\nSlowly pour warm cream into egg mixture whisking constantly.\nPour into ramekins and bake in a water bath for 40 minutes.\nRefrigerate for 2 hours then sprinkle sugar on top.\nTorch the sugar until caramelized and serve.",
            },
            {
                "name": "Beef Tacos",
                "category": "Main Course",
                "description": "Crispy tacos loaded with spiced beef and fresh colorful toppings.",
                "ingredients": "Corn Tortillas\nGround Beef\nAvocado\nSalsa\nLime\nCilantro\nCheese",
                "instructions": "Brown ground beef in a pan with taco seasoning.\nWarm corn tortillas in a dry pan.\nMash avocado with lime juice and salt.\nFill tortillas with beef, then avocado.\nTop with salsa, cheese and fresh cilantro.\nServe with lime wedges.",
            }
        ]

        for r_data in recipes_data:
            cat = categories.get(r_data['category'])
            recipe, created = Recipe.objects.get_or_create(
                name=r_data['name'],
                defaults={
                    'category': cat,
                    'description': r_data['description'],
                    'ingredients': r_data['ingredients'],
                    'instructions': r_data['instructions'],
                }
            )
            if created:
                self.stdout.write(f'- Recipe "{recipe.name}" created')
            else:
                self.stdout.write(f'- Recipe "{recipe.name}" already exists')
