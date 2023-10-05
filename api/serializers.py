from rest_framework import serializers
from .models import Budget, Item, Society



class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['name', 'unit_price', 'quantity']


class BudgetSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True)
    society_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Budget
        fields = ['id', 'title', 'items', 'society_id', 'created_at']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        society_id = validated_data.pop('society_id')

        society = Society.objects.get(id=society_id)
        budget = Budget.objects.create(society=society, **validated_data)

        for item_data in items_data:
            Item.objects.create(budget=budget, **item_data)

        return budget


class SocietySerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
