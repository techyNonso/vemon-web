# Generated by Django 3.1 on 2021-06-22 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0008_sale_invoiceid'),
    ]

    operations = [
        migrations.AddField(
            model_name='sale',
            name='disccount',
            field=models.CharField(default='0', max_length=20),
            preserve_default=False,
        ),
    ]
