# Generated by Django 5.1.1 on 2024-10-11 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('safari', '0003_safaripackage_image2_alter_safaripackage_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
