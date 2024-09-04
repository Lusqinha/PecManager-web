class DisplayTools:
    def __init__(self) -> None:
        ...
        
    def update_balance_display(self, text:str, saldo:float) -> str:
        text_to_display:str = text + f'{saldo:.2f}'
        return text_to_display