# Generated by Django 3.1 on 2020-08-26 08:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0003_remove_stock_userid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stock',
            name='expDate',
        ),
    ]
