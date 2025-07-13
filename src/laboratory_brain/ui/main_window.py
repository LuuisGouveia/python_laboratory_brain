import webview
import os
def start_window():
    
    base_path = os.path.abspath(os.path.dirname(__file__))
    html_path = os.path.join(base_path, "templates", 'index.html')
    file_url = f'file:///{html_path.replace("\\", "/")}'
    
    webview.create_window("Laboratory Brain", file_url)
    webview.start()