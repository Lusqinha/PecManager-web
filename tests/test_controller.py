import unittest
from unittest.mock import MagicMock
from controllers.controller import Controller

class TestController(unittest.TestCase):
    def setUp(self):
        self.model_mock = MagicMock()
        self.controller = Controller(self.model_mock)

    def test_create(self):
        data_model = {"name": "John", "age": 30}
        self.controller.table.insert = MagicMock()
        self.controller.create(data_model)
        self.controller.table.insert.assert_called_once_with(data_model)

    def test_read(self):
        documents = [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]
        self.controller.table.all = MagicMock(return_value=documents)
        result = self.controller.read()
        self.assertEqual(result, documents)

    def test_delete(self):
        doc_id = 1
        self.controller.table.remove = MagicMock()
        self.controller.delete(doc_id)
        self.controller.table.remove.assert_called_once_with(self.controller.local_query.id == doc_id)

    def test_update(self):
        doc_id = 1
        data_model = {"name": "John", "age": 35}
        self.controller.table.update = MagicMock()
        self.controller.update(doc_id, data_model)
        self.controller.table.update.assert_called_once_with(data_model, self.controller.local_query.id == doc_id)

    def test_get_existing_item(self):
        doc_id = 1
        item = {"name": "John", "age": 30}
        self.controller.table.get = MagicMock(return_value=item)
        result = self.controller.get(doc_id)
        self.assertEqual(result, item)

    def test_get_non_existing_item(self):
        doc_id = 1
        self.controller.table.get = MagicMock(return_value=None)
        result = self.controller.get(doc_id)
        self.assertEqual(result, [])

    def test_get_filtered(self):
        filter = "name"
        value = "John"
        documents = [{"name": "John", "age": 30}, {"name": "John", "age": 35}]
        self.controller.table.search = MagicMock(return_value=documents)
        result = self.controller.get_filtered(filter, value)
        self.assertEqual(result, documents)

if __name__ == '__main__':
    unittest.main()