from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('send_Request/',views.send_request,name='send_request'),
    path('getSQL/', views.getSQL, name='getSQL'),
]
