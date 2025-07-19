import webview
import os
from laboratory_brain.controllers.register import Register_API

class Windows_Api:
    
    
    
    def register_client_modal(self):
        api = Register_API()
        print("Criação de modal ativada")
        base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        html_path = os.path.join(base_path, 'templates', 'views', 'registers', 'register_client.html')
        file_url = f'file:///{html_path.replace("\\", "/")}'
        webview.create_window(
            "Novo Cliente",
            file_url,
            js_api=api,
            width=500,
            height=600,
            resizable=False
        )
        
    def register_work_types_modal(self):
        print("Criação de modal ativada")
        base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        html_path = os.path.join(base_path, 'templates', 'views', 'registers', 'register_work_types.html')
        file_url = f'file:///{html_path.replace("\\", "/")}'
        webview.create_window(
            "Novo Tipo de Trabalho",
            file_url,
            width=500,
            height=600,
            resizable=False
        )
        
    def register_prices_modal(self):
        print("Criação de modal ativada")
        base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        html_path = os.path.join(base_path, 'templates', 'views', 'registers', 'register_prices.html')
        file_url = f'file:///{html_path.replace("\\", "/")}'
        webview.create_window(
            "Novo Preço",
            file_url,
            width=500,
            height=600,
            resizable=False
        )
    
    def register_notes_modal(self):
        print("Criação de modal ativada")
        base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        html_path = os.path.join(base_path, 'templates', 'views', 'registers', 'register_notes.html')
        file_url = f'file:///{html_path.replace("\\", "/")}'
        webview.create_window(
            "Nova Nota",
            file_url,
            width=500,
            height=600,
            resizable=False
        )
    
    def register_works_modal(self):
        print("Criação de modal ativada")
        base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        html_path = os.path.join(base_path, 'templates', 'views', 'registers', 'register_work.html')
        file_url = f'file:///{html_path.replace("\\", "/")}'
        webview.create_window(
            "Novo Trabalho",
            file_url,
            width=500,
            height=600,
            resizable=False
        )