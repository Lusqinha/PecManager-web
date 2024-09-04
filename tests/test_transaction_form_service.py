from services.transaction_form_service import TransactionCalculator
import unittest

class TestTransactionCalculator(unittest.TestCase):
    def setUp(self):
        self.calculator = TransactionCalculator()

    def test_incoming_transaction(self):
        self.calculator.incomig_transaction(100)
        self.assertEqual(self.calculator.balance, 100)

    def test_outgoing_transaction(self):
        self.calculator.outgoing_transaction(50)
        self.assertEqual(self.calculator.balance, -50)

    def test_total_balance(self):
        transactions = [
            {'category': 'Entrada', 'value': 100},
            {'category': 'Saída', 'value': 50},
            {'category': 'Entrada', 'value': 200},
        ]
        balance = self.calculator.total_balance(transactions) # type: ignore
        self.assertEqual(balance, 250)

    def test_calculate_balance(self):
        data = {'category': 'Saída', 'value': 50}
        balance = self.calculator.process_balance(data)
        self.assertEqual(balance, -50)

if __name__ == '__main__':
    unittest.main()