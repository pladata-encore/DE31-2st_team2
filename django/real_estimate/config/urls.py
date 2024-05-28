from django.contrib import admin
from django.urls import path,include
#from real_estimate import views

from url.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('url/', include('url.urls')), 
]
