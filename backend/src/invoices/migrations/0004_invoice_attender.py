# Generated by Django 3.1 on 2021-04-10 14:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0003_auto_20210404_1935'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoice',
            name='attender',
            field=models.CharField(default='william Ikeji', max_length=200),
            preserve_default=False,
        ),
    ]
