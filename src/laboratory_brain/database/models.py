from .connection import get_connection

def create_tables():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT, -- dentist ou clinic
        pronoun TEXT,
        name TEXT NOT NULL,
        cpf_cnpj TEXT NOT NULL,
        address TEXT,
        phone TEXT,
        email TEXT
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS works (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        entry_id INTEGER,
        client_id INTEGER,
        work_type_id INTEGER,
        work_description TEXT,
        unit_price REAL,
        quantity INTEGER,
        total_price REAL,
        entry_date TEXT,
        delivery_date TEXT,
        charged INTEGER DEFAULT 0
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS work_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS price_list (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        work_type_id INTEGER,
        unit_price REAL
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS invoices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        issue_date TEXT,
        total_value REAL
    )
    ''')

    conn.commit()
    conn.close()
