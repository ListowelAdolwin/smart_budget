from django.urls import path
from .views import BudgetCreateView, CalculateBudget, GetSocietyBudgets, RegisterView, LoginView, SocietyView, LogoutView, Routes, MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('', Routes, name='routes'),
    path('create-budget', BudgetCreateView.as_view(), name='budget-create'),
    path('calculate-budget', CalculateBudget.as_view() ),
    path('get-budgets/<str:id>',GetSocietyBudgets.as_view() ),
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('society', SocietyView.as_view()),
    path('logout', LogoutView.as_view()),
]




