# Generated by Django 3.1 on 2020-10-22 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_auto_20201022_2218'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='expiration_limit',
            field=models.CharField(default=90, max_length=10),
        ),
        migrations.AlterField(
            model_name='account',
            name='stock_limit',
            field=models.CharField(default=10, max_length=10),
        ),
    ]
