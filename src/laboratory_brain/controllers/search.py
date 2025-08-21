import sqlite3
from laboratory_brain.database.connection import get_connection
import json

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
    
    def get_client(self, id_client):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('''
                SELECT * 
                FROM clients 
                WHERE id = ?
            ''', (id_client,))
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
    
    def search_prices_by_client(self, id_client):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('''
                SELECT * 
                FROM price_list 
                WHERE id_client = ?
            ''', (id_client))
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
        
    def get_price(self, id_price):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('''
                SELECT * 
                FROM price_list
                WHERE id = ?
            ''', (id_price,))
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
    
    def search_all_prices(self):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('''
                SELECT * FROM price_list''')
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
        
    def search_dentists_by_client(self, id_client):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('''
                           SELECT * FROM dentist_list WHERE id_client = ?''', (id_client))
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
        
    def get_dentist(self, id_dentist):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('''
                SELECT * 
                FROM dentist_list 
                WHERE id = ?
            ''', (id_dentist,))
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
        
    def search_work_types(self):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM work_types")
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
    
    def get_type(self, id_type):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('''
                SELECT * 
                FROM work_types
                WHERE id = ?
            ''', (id_type,))
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
        
    def search_all_works(self):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM works")
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
        
    def search_works_by_client(self, id_client):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM works WHERE id_client = ? AND charged = 1", id_client)
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
        
    def search_all_notes(self):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT id, id_client, client_name, total, date FROM notes')
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
    
    def search_notes_by_client(self, id_client):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT id, id_client, client_name, total, date FROM notes WHERE id_client = ?', id_client)
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
    
    def search_notes_by_id(self, id):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT id, id_client, client_name, total, date FROM notes WHERE id = ?', id)
            note = cursor.fetchone();
            return note[0] if note else None
    
    def search_work_in_notes(self, note_id: int):
        with get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT works FROM notes WHERE id = ?', (note_id,))
            row = cursor.fetchone()

            if row and row["works"]:
                try:
                    
                    works = json.loads(row["works"])
                    return works
                except json.JSONDecodeError:
                    return []
            return []