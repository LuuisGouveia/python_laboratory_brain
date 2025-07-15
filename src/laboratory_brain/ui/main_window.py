import webview
import os
from laboratory_brain.ui.api import Api

def start_window():
    
    api = Api()
    
    base_path = os.path.abspath(os.path.dirname(__file__))
    html_path = os.path.join(base_path, "templates", 'index.html')
    file_url = f'file:///{html_path.replace("\\", "/")}'
    
    webview.create_window("Laboratory Brain", file_url, js_api=api)
    webview.start(gui='edgechromium', debug=True)