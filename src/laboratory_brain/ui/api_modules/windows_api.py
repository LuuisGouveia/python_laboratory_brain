import webview
import os
from laboratory_brain.controllers.register import Register_API

class Windows_Api:
    
    
    
    def register_modal(self, path):
        api = Register_API()
        print("Criação de modal ativada")
        base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        html_path = os.path.join(base_path, 'templates', 'views', 'registers', path)
        file_url = f'file:///{html_path.replace("\\", "/")}'
        webview.create_window(
            "Modal de Cadastro",
            file_url,
            js_api=api,
            width=500,
            height=600,
            resizable=False
        )
    