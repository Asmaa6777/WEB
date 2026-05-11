from django.core.management.base import BaseCommand

from recipes.sync_recipe_images import sync_recipe_images


class Command(BaseCommand):
    help = 'Set each Recipe.image from media/recipes/<mapped>.jpg (see recipe_image_map).'

    def handle(self, *args, **options):
        n = sync_recipe_images()
        self.stdout.write(self.style.SUCCESS(f'Updated {n} recipe image(s).'))
