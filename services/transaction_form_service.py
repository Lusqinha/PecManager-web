from controllers.transaction_controller import TransactionController
from custom_types import TransactionData
from tinydb.table import Document
from datetime import datetime
from typing import Callable

class TransactionCalculator:
    def __init__(self) -> None:
        self.balance: float = 0.0
        self.transaction_methods: dict[str, Callable] = {
            'Entrada': self.incomig_transaction,
            'Saída': self.outgoing_transaction,
        }
    
    def incomig_transaction(self, value: float) -> None:
        self.balance += value
    
    def outgoing_transaction(self, value: float) -> None:
        self.balance -= value
    
    def total_balance(self, transactions: list[Document]) -> float:
        self.balance = 0.0
        
        for transaction in transactions:
            self.transaction_methods[transaction['category']](transaction['value'])
        return self.balance
        
    def process_balance(self, data: TransactionData) -> float:
        self.transaction_methods[data['category']](data['value'])
        return self.balance
    
class TransactionFormService(TransactionController, TransactionCalculator):
    def __init__(self) -> None:
        TransactionCalculator.__init__(self)
        TransactionController.__init__(self)
        self.date_format: str = '%d-%m-%Y'
    
    def prepare_data(self, value: float, category: str, description: str) -> TransactionData:
        
        data: TransactionData = {
            'date': datetime.now().strftime(self.date_format),
            'value': value,
            'category': category,
            'description': description
        }
        
        return data
    
    def compute_submit(self, value: float, category: str, description: str) -> None:
        
        if description == '':
            description = 'Sem descrição'
        
        data: TransactionData = self.prepare_data(value, category, description)
        
        self.create(data)
        self.process_balance(data)
        
        
    

     