from typing import TypeVar, Dict

DataType = TypeVar('DataType', str, float, int)

TransactionData = Dict[str, DataType]