# Generated by Django 5.1.1 on 2024-12-15 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('safari', '0014_remove_mpesapayment_date_remove_mpesapayment_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='user',
        ),
        migrations.AddField(
            model_name='review',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
