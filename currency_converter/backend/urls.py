# converter/urls.py

from django.urls import path
from .views import convert_currency, sos, homepage
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('convert/', convert_currency, name='convert_currency'),
    path('sos/', sos, name='sos'),
    path('', homepage, name='homepage'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)