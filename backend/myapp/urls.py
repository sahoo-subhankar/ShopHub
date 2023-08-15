from django.urls import path
from . import views

urlpatterns = [
    path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.MyTokenObtainPairView.as_view(), name='token_refresh'),
    path('routes/', views.getRoutes, name='routes'),
    path('users/profile/', views.getUserProfile, name='users-profile'),
    path('products/', views.getProducts, name='products'),
    path('products/<str:id>/', views.getProduct, name='product'),
]