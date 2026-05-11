from django.db import migrations


def forwards(apps, schema_editor):
    from recipes.sync_recipe_images import sync_recipe_images

    sync_recipe_images(apps=apps)


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_alter_recipe_image_optional'),
    ]

    operations = [
        migrations.RunPython(forwards, migrations.RunPython.noop),
    ]
