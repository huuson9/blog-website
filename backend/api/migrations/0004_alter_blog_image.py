# Generated by Django 4.1.2 on 2024-01-08 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_profile_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='image',
            field=models.TextField(default='blog/default.jpg'),
        ),
    ]
