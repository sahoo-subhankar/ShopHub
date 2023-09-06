from django.urls import path
from myapp.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name='products'),
    path('<str:id>/', views.getProduct, name='product'),
]