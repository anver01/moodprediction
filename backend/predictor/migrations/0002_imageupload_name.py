# Generated by Django 3.1.2 on 2020-11-20 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('predictor', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='imageupload',
            name='name',
            field=models.CharField(default=123, max_length=20),
            preserve_default=False,
        ),
    ]