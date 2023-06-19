from django.db import models


class Society(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Budget(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('printed', 'Printed'),
    )
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    society = models.ForeignKey(Society, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_total(self):
        total = 0
        for item in self.items.all():
            total += item.calculate_total()
        return total

    def calculate_grand_total(self):
        total = self.calculate_total()
        nhil = total * 0.06
        subtotal = total + nhil
        vat = subtotal * 0.15
        grand_total = subtotal + vat
        return  round(grand_total, 2)

    def __str__(self) -> str:
        return f"{self.society} {self.title}"

class Item(models.Model):
    budget = models.ForeignKey(Budget, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    unit_price = models.FloatField()
    quantity = models.IntegerField()

    def calculate_total(self):
        return self.unit_price * self.quantity

    def __str__(self):
        return self.name
