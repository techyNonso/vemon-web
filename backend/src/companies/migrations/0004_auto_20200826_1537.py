# Generated by Django 3.1 on 2020-08-26 14:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0003_auto_20200826_1031'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='companyId',
            field=models.CharField(max_length=20, unique=True),
        ),
        migrations.AlterField(
            model_name='company',
            name='companyName',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]
