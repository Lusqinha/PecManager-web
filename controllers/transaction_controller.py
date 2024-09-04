from models.transaction_model import TransactionModel
from controllers.controller import Controller

class TransactionController(Controller):
    def __init__(self) -> None:
        super().__init__(TransactionModel())
