# Generated by Django 5.1.1 on 2024-10-10 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('safari', '0002_review'),
    ]

    operations = [
        migrations.AddField(
            model_name='safaripackage',
            name='image2',
            field=models.ImageField(blank=True, null=True, upload_to='safari_images/'),
        ),
        migrations.AlterField(
            model_name='safaripackage',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='safari_images/'),
        ),
    ]
