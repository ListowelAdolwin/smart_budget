from django.urls import path
from .views import BudgetCreateView, CalculateBudget, GetSocietyBudgets

urlpatterns = [
    path('create-budget', BudgetCreateView.as_view(), name='budget-create'),
    path('calculate-budget', CalculateBudget.as_view() ),
    path('get-budgets/<str:id>',GetSocietyBudgets.as_view() ),
]
