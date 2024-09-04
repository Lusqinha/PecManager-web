from controllers.transaction_controller import TransactionController
from tinydb.table import Document
from pandas import DataFrame
from datetime import datetime

class TransactionHistoryService(TransactionController):
    def __init__(self) -> None:
        TransactionController.__init__(self)
        
    def formatted_data(self, saldo:bool=False) -> DataFrame:
        """
        Format data to be displayed in the streamlit table
        
        Returns:
            list[dict]: list of dictionaries with the data to be
        """
        data: list[Document] = self.read()
        
        if not data:
            return DataFrame()
        
        formatted_data: list[dict] = []
        
        for item in data:
            formatted_data.append({
                'Data': datetime.strptime(item['date'], '%d-%m-%Y').strftime('%d/%m/%Y'),
                'Descrição': item['description'],
                'Valor': item['value']*-1 if item['category'] == 'Saída' and saldo else item['value'],
                'Categoria': item['category']
            })           
            
        df: DataFrame = DataFrame(formatted_data)
        
        return df

    def line_chart_date_value(self) -> DataFrame | None:
        
        formatted_data = self.formatted_data(saldo=True)
        
        if formatted_data.empty:
            return None
        
        df: DataFrame = formatted_data.groupby('Data')['Valor'].sum().reset_index()
        
        return df
        