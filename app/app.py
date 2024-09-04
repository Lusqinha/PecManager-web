from view.transaction_history import TransactionHistory
from view.transaction_form import TransactionForm
from typing import Callable
import streamlit as st


class App:
    def __init__(self) -> None:
        self.title :str = '🏦 PecManager 🏦'
        self.transaction_form = TransactionForm
        self.transaction_history = TransactionHistory

    def run(self) -> None:
        with st.sidebar.markdown(f'# {self.title}'):
            st.sidebar.markdown(f'> **{self.transaction_form().balance_display}**')
            st.sidebar.markdown('## Menu')
            menu: list[str] = ['Cadastro de transações', 'Histórico de transações']
            choice:str = st.sidebar.selectbox('Escolha uma opção', menu)
            
            options: dict[str, Callable] = {
                'Cadastro de transações': self.transaction_form,
                'Histórico de transações': self.transaction_history
            }
            
        options[choice]().screen()
    
app = App()
app.run()