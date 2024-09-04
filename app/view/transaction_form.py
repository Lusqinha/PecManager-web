from services.transaction_form_service import TransactionFormService
from utils.display import DisplayTools
import streamlit as st

class TransactionForm:
    
    def __init__(self) -> None:
        self.service: TransactionFormService = TransactionFormService()
        self.display_tools: DisplayTools = DisplayTools()
        
        self.service.total_balance(self.service.read())
        
        self.balance_display :str = f'💵 R$' 
        self.balance_display = self.display_tools.update_balance_display(self.balance_display, self.service.balance)


    def screen(self) -> None:
        
        with st.form(key='transaction_form', clear_on_submit=True):
                        
            left_col, right_col = st.columns(2)
            
            with left_col:
                value: float = st.number_input('Valor', value=0.00, step=1.0, format='%.2f', help='Ex.: 100.00')
            with right_col:
                categoria: str = st.radio('Categoria', ['Entrada', 'Saída'], horizontal=True)
                
            descricao: str = st.text_input('Descrição', '', help='Ex.: Venda')
            

            submit_button: bool = st.form_submit_button(label='Cadastrar')
            
            if submit_button:
                self.service.compute_submit(value, categoria, descricao)
                self.balance_display = self.display_tools.update_balance_display(self.balance_display, self.service.balance)
                
                st.success('Transação cadastrada com sucesso!')
                
                
            