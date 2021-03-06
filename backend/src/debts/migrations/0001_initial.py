# Generated by Django 3.1 on 2020-08-24 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='debts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('customer', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=50)),
                ('attender', models.CharField(max_length=50)),
                ('amount', models.IntegerField()),
                ('paid', models.IntegerField()),
                ('balance', models.IntegerField()),
            ],
        ),
    ]
