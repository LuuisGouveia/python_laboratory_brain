import webview
import os
import sys
from laboratory_brain.ui.api import Api


def resource_path(relative_path: str) -> str:
    """Retorna o caminho absoluto do recurso, compatível com dev e executável .exe"""
    # Quando rodar pelo PyInstaller, os arquivos ficam dentro de _MEIPASS
    base_path = getattr(sys, '_MEIPASS', os.path.abspath(os.path.dirname(__file__)))
    return os.path.join(base_path, relative_path)


def start_window():
    api = Api()

    # agora usamos resource_path para buscar o index.html
    html_path = resource_path(os.path.join("templates", "index.html"))
    file_url = f'file:///{html_path.replace("\\", "/")}'

    webview.create_window("Laboratory Brain", file_url, js_api=api)
    webview.start(gui='edgechromium', debug=True)
