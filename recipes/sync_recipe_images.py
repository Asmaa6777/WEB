"""
Assign Recipe.image from files in MEDIA_ROOT/recipes/ using recipe_image_map
and slugify(name).replace('-', '_') + '.jpg' as fallback when the file exists.
"""
from __future__ import annotations

from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.utils.text import slugify

from recipes.recipe_image_map import RECIPE_NAME_TO_JPG


def sync_recipe_images(apps=None) -> int:
    if apps:
        Recipe = apps.get_model('recipes', 'Recipe')
    else:
        from recipes.models import Recipe  # noqa: WPS433

    media_dir = Path(settings.MEDIA_ROOT) / 'recipes'
    if not media_dir.is_dir():
        return 0

    updated = 0
    for recipe in Recipe.objects.iterator():
        fname = RECIPE_NAME_TO_JPG.get(recipe.name)
        if not fname:
            cand = f"{slugify(recipe.name).replace('-', '_')}.jpg"
            if (media_dir / cand).is_file():
                fname = cand
        if not fname:
            continue
        path = media_dir / fname
        if not path.is_file():
            continue
        current = getattr(recipe.image, 'name', '') or ''
        if current.endswith(fname):
            continue
        with path.open('rb') as fh:
            recipe.image.save(fname, File(fh), save=True)
        updated += 1
    return updated
