import sqlite3
import sys
import os

def resource_path(relative_path: str) -> str:
    """
    Retorna o caminho absoluto de um recurso.
    Funciona tanto no dev quanto no executável.
    """
    try:
        # Quando rodando como .exe (PyInstaller)
        base_path = sys._MEIPASS  
    except AttributeError:
        # Quando rodando em dev (normal)
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)


def get_connection():
    db_path = resource_path("database.db")
    return sqlite3.connect(db_path, check_same_thread=False)
