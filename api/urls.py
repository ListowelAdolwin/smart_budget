from django.urls import path
from .views import BudgetCreateView, CalculateBudget, GetSocietyBudgets, RegisterView, LoginView, SocietyView, LogoutView


urlpatterns = [
    path('create-budget', BudgetCreateView.as_view(), name='budget-create'),
    path('calculate-budget', CalculateBudget.as_view() ),
    path('get-budgets/<str:id>',GetSocietyBudgets.as_view() ),

    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('society', SocietyView.as_view()),
    path('logout', LogoutView.as_view()),
]
