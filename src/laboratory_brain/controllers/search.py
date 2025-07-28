import sqlite3
from laboratory_brain.database.connection import get_connection

class Search_API():
    
    def __init__(self):
        self.conn = get_connection()
        self.conn.row_factory = sqlite3.Row
        self.cursor = self.conn.cursor()
    
    def select_clients(self):
        self.cursor.execute('''SELECT name FROM clients''')
        clients = [row[0] for row in self.cursor.fetchall()]
    
        self.conn.close()
        return clients
    
    def search_all_clients(self):
        self.cursor.execute('''SELECT * FROM clients ''')
        rows = self.cursor.fetchall()
        clients = [dict(row) for row in rows]
        self.conn.close()
        return clients