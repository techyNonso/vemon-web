# Generated by Django 3.1 on 2021-07-08 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('branches', '0006_branch_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='branch',
            name='address',
            field=models.CharField(blank=True, max_length=300),
        ),
    ]