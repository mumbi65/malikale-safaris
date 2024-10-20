# Generated by Django 5.1.1 on 2024-10-15 16:16

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('safari', '0004_review_updated_at'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullname', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('country', models.CharField(max_length=100)),
                ('contactNumber', models.CharField(max_length=15)),
                ('adults', models.PositiveIntegerField()),
                ('children', models.PositiveIntegerField()),
                ('subject', models.CharField(max_length=255)),
                ('message', models.TextField()),
                ('bookingDate', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('safari', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookings', to='safari.safaripackage')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
