# Generated manually: optional recipe image + clear invalid default path

from django.db import migrations, models


def clear_placeholder_image(apps, schema_editor):
    Recipe = apps.get_model('recipes', 'Recipe')
    Recipe.objects.filter(image='placeholder.svg').update(image=None)


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='recipes/'),
        ),
        migrations.RunPython(clear_placeholder_image, migrations.RunPython.noop),
    ]
