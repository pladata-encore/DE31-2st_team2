# Generated by Django 5.0.6 on 2024-05-27 23:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_predict_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='predict',
            name='road_number',
            field=models.CharField(max_length=20),
        ),
    ]
