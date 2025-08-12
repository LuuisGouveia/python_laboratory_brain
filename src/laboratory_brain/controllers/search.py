# import sqlite3
# from laboratory_brain.database.connection import get_connection

# class Search_API():
    
#     def __init__(self):
#         self.conn = get_connection()
#         self.conn.row_factory = sqlite3.Row
#         self.cursor = self.conn.cursor()
    
#     def select_clients(self):
#         self.cursor.execute('''SELECT name FROM clients''')
#         clients = [row[0] for row in self.cursor.fetchall()]
    
#         self.conn.close()
#         return clients
    
#     def search_all_clients(self):
#         self.cursor.execute('''SELECT * FROM clients ''')
#         rows = self.cursor.fetchall()
#         clients = [dict(row) for row in rows]
#         self.conn.close()
#         return clients
    
#     def search_all_work_types(self):
#         self.cursor.execute('SELECT * FROM work_types')
#         rows = self.cursor.fetchall()
#         types = [dict(row) for row in rows]
#         self.conn.close()
#         return types
    
#     def search_prices(self, id_client, work_type_id):
#         self.cursor.execute('''SELECT unit_price FROM price_list 
#                             WHERE id_client=? AND work_type_id=?''', 
#                             (id_client, work_type_id))
#         price = self.cursor.fetchone()
#         self.conn.close()
#         return price 

import sqlite3
from laboratory_brain.database.connection import get_connection

class Search_API:
    
    def select_clients(self):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT name FROM clients')
            clients = [row[0] for row in cursor.fetchall()]
            return clients
    
    def search_all_clients(self):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM clients')
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
    
    def search_all_work_types(self):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM work_types')
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
    
    def search_prices(self, id_client, work_type_id):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('''
                SELECT unit_price 
                FROM price_list 
                WHERE id_client = ? AND work_type_id = ?
            ''', (id_client, work_type_id))
            price = cursor.fetchone()
            return price[0] if price else None
    def search_dentists_by_client(self, id_client):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('''
                           SELECT (id, name) FROM dentist_list WHERE id_client = ?''', (id_client))
            rows = cursor.fetchall()
            return [dict(row) for row in rows]