# Generated by Django 3.1 on 2020-08-24 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='attendance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('staffId', models.CharField(max_length=10)),
                ('staffName', models.CharField(max_length=100)),
                ('arrivalTime', models.CharField(max_length=10)),
                ('exitTime', models.CharField(max_length=10)),
            ],
        ),
    ]
