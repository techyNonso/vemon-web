# Generated by Django 3.1 on 2020-08-25 18:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0002_auto_20200825_1927'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stock',
            name='userId',
        ),
    ]
