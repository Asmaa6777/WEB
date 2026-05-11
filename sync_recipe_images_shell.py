#!/usr/bin/env python
"""Run from project root: python sync_recipe_images_shell.py (same folder as manage.py)."""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

import django  # noqa: E402

django.setup()

from recipes.sync_recipe_images import sync_recipe_images  # noqa: E402

if __name__ == '__main__':
    n = sync_recipe_images()
    print(f'Updated {n} recipe image(s).')
