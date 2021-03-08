from django.conf import settings
from django.db import models
from django.utils import timezone



class Schedule(models.Model):
    created_date = models.DateField(default=timezone.now)
    month = models.CharField(max_length=7,primary_key=True)
    date = models.DateField()
    time = models.TimeField()
    colors = models.CharField(max_length=20)
    events = models.CharField(max_length=500)

    def __str__(self):
        return self.month
