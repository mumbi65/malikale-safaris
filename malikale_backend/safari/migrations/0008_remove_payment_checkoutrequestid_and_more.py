# Generated by Django 5.1.1 on 2024-10-30 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('safari', '0007_payment_checkoutrequestid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='checkoutRequestID',
        ),
        migrations.AddField(
            model_name='payment',
            name='checkout_request_id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='payment',
            name='transaction_id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
