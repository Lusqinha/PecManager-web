from services.transaction_history_service import TransactionHistoryService
import streamlit as st

class TransactionHistory():
    
    def __init__(self) -> None:
        self.service: TransactionHistoryService = TransactionHistoryService()
    

    def screen(self) -> None:
        st.title('Histórico de transações')

        df = self.service.formatted_data()
        
        if not df.empty:        
            st.dataframe(
                        df, 
                        hide_index=True, 
                        on_select='ignore', 
                        use_container_width=True
                        )
        else:
            st.write('Sem dados para exibir')
            
        st.markdown('---')
        
        bar_chart_df = self.service.line_chart_date_value()
        
        if bar_chart_df is not None:
            st.title('Gráfico de Barras')
            st.bar_chart(bar_chart_df.set_index('Data'), 
                         use_container_width=True,
                         x_label='Data',
                         y_label='Lucro',
                         color='#663399'
                        )
        
        
        