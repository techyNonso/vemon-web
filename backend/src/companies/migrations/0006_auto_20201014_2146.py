# Generated by Django 3.1 on 2020-10-14 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0005_auto_20200911_0446'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='branches',
            field=models.CharField(default=0, max_length=10),
        ),
    ]
