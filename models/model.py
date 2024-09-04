from typing import Any


class Model:
    def __init__(self, table: str, data_model: dict, type_model) -> None:
        self.table_name: str = table
        self.data_model: dict = data_model
        self.type_model:dict[Any, Any] = type_model