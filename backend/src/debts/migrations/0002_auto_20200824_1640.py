# Generated by Django 3.1 on 2020-08-24 15:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('debts', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='debts',
            new_name='debt',
        ),
    ]
