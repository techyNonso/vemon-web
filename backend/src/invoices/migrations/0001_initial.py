# Generated by Django 3.1 on 2021-04-03 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='invoice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('invoiceId', models.CharField(max_length=100)),
                ('customer_name', models.CharField(max_length=50)),
                ('customer_number', models.IntegerField()),
                ('customer_address', models.CharField(max_length=200)),
                ('total_price', models.IntegerField(max_length=20)),
                ('net_price', models.IntegerField(max_length=20)),
                ('paid', models.IntegerField(max_length=20)),
                ('balance', models.IntegerField(max_length=20)),
                ('discount', models.IntegerField()),
                ('transactionType', models.CharField(max_length=20)),
                ('companyId', models.CharField(max_length=50, null=True)),
                ('branchId', models.CharField(max_length=50, null=True)),
                ('date', models.DateField(null=True)),
            ],
        ),
    ]
