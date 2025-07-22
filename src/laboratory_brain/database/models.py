from .connection import get_connection

def create_tables():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
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
        id_client INTEGER NOT NULL,
        client_name TEXTE NOT NULL,
        dentist TEXT,
        pacient TEXT,
        work_type_id INTEGER NOT NULL,
        work_description TEXT NOT NULL,
        tooth TEXT,
        quantity INTEGER NOT NULL,
        unit_price REAL NOT NULL,
        total_price REAL NOT NULL,
        date TEXT,
        charged INTEGER DEFAULT 1
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
        id_client INTEGER,
        work_type_id INTEGER,
        unit_price REAL
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_client INTEGER NOT NULL,
        client_name TEXT NOT NULL,
        works TEXT NOT NULL,
        total REAL NOT NULL,
        date TEXT
    )
    ''')
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS dentist_list (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_client INTEGER NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL
    )
    ''')
    
    

    conn.commit()
    conn.close()
