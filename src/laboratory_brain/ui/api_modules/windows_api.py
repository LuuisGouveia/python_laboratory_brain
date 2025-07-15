import webview
import os


class Windows_Api:
    
    def register_client_modal(self):
        print("Criação de modal ativada")
        base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        html_path = os.path.join(base_path, 'templates', 'views', 'registers', 'register_client.html')
        file_url = f'file:///{html_path.replace("\\", "/")}'
        webview.create_window(
            "Novo Cliente",
            file_url,
            width=500,
            height=600,
            resizable=False,
            modal=True
        )