"""
One-off: create tiny JPEGs under static/images/, copy .jpg only to media/recipes/.
Run from project root (same folder as manage.py): python bootstrap_recipe_jpg_media.py
"""
from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
STATIC_IMAGES = ROOT / 'static' / 'images'
MEDIA_RECIPES = ROOT / 'media' / 'recipes'

# Same filenames as recipes/recipe_image_map.py values
JPG_NAMES = [
    'carbonara.jpg',
    'avocado_toast.jpg',
    'cheesecake.jpg',
    'butter_chicken.jpg',
    'caprese.jpg',
    'lava_cake.jpg',
    'poke_bowl.jpg',
    'bruschetta.jpg',
    'creme_brulee.jpg',
    'tacos.jpg',
]


def main() -> None:
    try:
        from PIL import Image
    except ImportError as e:
        raise SystemExit(
            'Install Pillow first: pip install Pillow\n'
            f'Original error: {e}'
        ) from e

    STATIC_IMAGES.mkdir(parents=True, exist_ok=True)
    MEDIA_RECIPES.mkdir(parents=True, exist_ok=True)

    img = Image.new('RGB', (8, 8), (188, 142, 86))
    for name in JPG_NAMES:
        src = STATIC_IMAGES / name
        img.save(src, 'JPEG', quality=88)
        shutil.copy2(src, MEDIA_RECIPES / name)
    print(f'Wrote {len(JPG_NAMES)} JPEGs to {STATIC_IMAGES} and copied to {MEDIA_RECIPES}')


if __name__ == '__main__':
    main()
