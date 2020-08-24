# Generated by Django 3.1 on 2020-08-24 14:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='staff',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('staffId', models.CharField(max_length=10)),
                ('staffName', models.CharField(max_length=30)),
                ('position', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=50)),
                ('phone', models.CharField(max_length=20)),
                ('permission', models.CharField(max_length=30)),
                ('registered', models.DateField()),
                ('state', models.CharField(max_length=20)),
                ('town', models.CharField(max_length=50)),
                ('street', models.CharField(max_length=50)),
            ],
        ),
    ]
