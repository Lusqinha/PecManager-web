from custom_types import TransactionData
from models.model import Model

class TransactionModel(Model):
    def __init__(self) -> None:
        super().__init__('transactions', {
            'date': str,
            'value': float,
            'category': str,
            'description': str
            }, TransactionData)