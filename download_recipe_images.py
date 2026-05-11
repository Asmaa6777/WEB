"""
Download real recipe images from Pexels (free stock photos) and save to media/recipes/.
Run from project root: python download_recipe_images.py
"""
import os
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MEDIA_RECIPES = ROOT / 'media' / 'recipes'
STATIC_IMAGES = ROOT / 'static' / 'images'

# Pexels free images mapped to each recipe
RECIPE_IMAGES = {
    'carbonara.jpg': 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=800',
    'avocado_toast.jpg': 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=800',
    'cheesecake.jpg': 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800',
    'butter_chicken.jpg': 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    'caprese.jpg': 'https://images.pexels.com/photos/1410236/pexels-photo-1410236.jpeg?auto=compress&cs=tinysrgb&w=800',
    'lava_cake.jpg': 'https://images.pexels.com/photos/4553031/pexels-photo-4553031.jpeg?auto=compress&cs=tinysrgb&w=800',
    'poke_bowl.jpg': 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    'bruschetta.jpg': 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800',
    'creme_brulee.jpg': 'https://images.pexels.com/photos/2638026/pexels-photo-2638026.jpeg?auto=compress&cs=tinysrgb&w=800',
    'tacos.jpg': 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=800',
}


def main():
    MEDIA_RECIPES.mkdir(parents=True, exist_ok=True)
    STATIC_IMAGES.mkdir(parents=True, exist_ok=True)

    for filename, url in RECIPE_IMAGES.items():
        media_path = MEDIA_RECIPES / filename
        static_path = STATIC_IMAGES / filename

        print(f'Downloading {filename}...', end=' ')
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = resp.read()

            # Save to media/recipes/
            with open(media_path, 'wb') as f:
                f.write(data)

            # Also update static/images/ (replace the 633-byte placeholders)
            with open(static_path, 'wb') as f:
                f.write(data)

            print(f'OK ({len(data):,} bytes)')
        except Exception as e:
            print(f'FAILED: {e}')

    print('\nDone!')


if __name__ == '__main__':
    main()
