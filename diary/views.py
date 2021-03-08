from django.shortcuts import render
from django.http import HttpResponse
import os
import datetime
from diary.models import Schedule

# Create your views here.
def post_list(request):
    return render(request, 'diary/index.html', {})
def send_request(request):
    return HttpResponse("ajax is done!")
def getSQL(request):
    today = datetime.date.today()
    month = today.month
    year = today.year
    primaryKey = year + "-" + month
    
    try:
        monthSchdule = Schedule.objects.get(month=primaryKey)
        return HttpResponse('todo_id:%s,  title:%s, main_text:%s.' % (t.todo_id, t.title, t.main_text))
    except :
        print(error)
