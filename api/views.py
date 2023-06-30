from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Budget, Society, Item
from .serializers import BudgetSerializer, ItemSerializer, SocietySerializer


from rest_framework.exceptions import AuthenticationFailed
import jwt
import datetime


class BudgetCreateView(generics.CreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Retrieve and remove 'items' and 'society_id' data from validated data
        items_data = serializer.validated_data.pop('items')
        society_id = serializer.validated_data.pop('society_id')

        # Get the society using the provided society_id
        society = Society.objects.get(id=society_id)

        # Create the budget with the society and other validated data
        budget = Budget.objects.create(
            society=society, **serializer.validated_data)

        # Create and associate 'items' with the budget
        for item_data in items_data:
            Item.objects.create(budget=budget, **item_data)

        headers = self.get_success_headers({})
        return Response({'message': f"Budget {serializer.validated_data['title']} successfully created!"}, status=status.HTTP_201_CREATED, headers=headers)


class GetSocietyBudgets(APIView):
    def get(self, request, id):
        society = Society.objects.get(id=id)
        society_budgets = society.budget_set.all()
        if not society_budgets:
            return Response({"Error":f"No budgets found for {society}"})
        serializer = BudgetSerializer(society_budgets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CalculateBudget(APIView):
    def get(self, request):
        budget = Budget.objects.get(id=4)
        total = budget.calculate_total()
        grand_total = budget.calculate_grand_total()
        data = {
            "total": total,
            "grand_total": grand_total,
        }

        return Response(data)


class RegisterView(APIView):
    def post(self, request):
        serializer = SocietySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        society = Society.objects.filter(email=email).first()

        if society is None:
            raise AuthenticationFailed('User not found!')

        if not society.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': society.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret',
                           algorithm='HS256').decode('utf-8')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        society = Society.objects.filter(id=payload['id']).first()
        serializer = SocietySerializer(society)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'Logged out successfully'
        }
        return response
