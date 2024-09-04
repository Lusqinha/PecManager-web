from models.model import Model
from database.database import DatabaseInitializer
from tinydb.table import Document, Table
from tinydb import TinyDB, Query, where

class Controller:
    def __init__(self, model: Model) -> None:
        self.db_init: DatabaseInitializer = DatabaseInitializer(f'{model.table_name}_db.json', model.table_name)
        self.model: Model = model
        self.data_model:dict = self.model.data_model
        self.db: TinyDB = self.db_init.db
        self.table: Table = self.db_init.table
        self.local_query = Query()
    
    def create(self, data_model) -> None:
        self.table.insert(data_model)
    
    def read(self) -> list[Document]:
        return self.table.all()
    
    def delete(self, doc_id: int) -> None:
        self.table.remove(self.local_query.id == doc_id)
    
    def update(self, doc_id: int, data_model) -> None:
        self.table.update(data_model, self.local_query.id == doc_id)
        
    def get(self, id:int) -> Document |list[Document]:
        item: Document | list[Document] | None = self.table.get(self.local_query.id == id)
        
        if item is None:
            return []
        
        return item

    def get_filtered(self, filter: str, value: str) -> list[Document]:
        return self.table.search(where(filter) == value)