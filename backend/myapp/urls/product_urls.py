from django.urls import path
from myapp.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name='products'),
    path('top/', views.getTopProducts, name='top-products'),
    path('create/', views.createProduct, name='product-create'), 
    path('upload/', views.uploadImage, name='image-upload'),
    
    path('<str:pk>/reviews/', views.createProductReview, name='create-product-review'),
    path('<str:pk>/', views.getProduct, name='product'),
    path('update/<str:pk>/', views.updateProduct, name='product-delete'),
    path('delete/<str:pk>/', views.deleteProduct, name='product-update'),
]