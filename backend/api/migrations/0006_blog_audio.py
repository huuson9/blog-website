# Generated by Django 4.1.2 on 2024-01-08 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_blog_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='audio',
            field=models.FileField(blank=True, null=True, upload_to='audio_files/'),
        ),
    ]