from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Budget, Society, Item
from .serializers import BudgetSerializer, ItemSerializer, SocietySerializer


class BudgetCreateView(generics.CreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Retrieve and remove 'items' data from validated data
        items_data = serializer.validated_data.pop('items')

        society = Society.objects.get(id=1)
        budget = Budget.objects.create(society=society, **serializer.validated_data)

        # Create and associate 'items' with the budget
        for item_data in items_data:
            Item.objects.create(budget=budget, **item_data)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class GetSocietyBudgets(APIView):
    def get(self, request, id):
        society = Society.objects.get(id=id)
        society_budgets = society.budget_set.all()
        serializer = BudgetSerializer(society_budgets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CalculateBudget(APIView):
    def get(self, request):
        budget = Budget.objects.get(id=4)
        total = budget.calculate_total()
        grand_total = budget.calculate_grand_total()
        data = {
            "total":total,
            "grand_total":grand_total,
        }

        return Response(data)
