from tinydb import TinyDB
from tinydb.table import Table

class DatabaseInitializer:
    def __init__(self, db_path:str, table:str) -> None:
        self.db: TinyDB = TinyDB(f'database/{db_path}')
        self.table: Table = self.db.table(table)