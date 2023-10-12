from django.urls import path
from myapp.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='add-orders'),
    path('myorders/', views.getMyOrders, name='my-orders'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay', views.updateOrderToPaid, name='order-payment'),
    path('<str:pk>/deliver', views.updateOrderToDelivered, name='order-delivery'),
]