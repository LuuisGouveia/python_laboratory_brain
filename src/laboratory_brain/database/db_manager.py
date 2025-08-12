from .connection import get_connection

conn = get_connection()
cursor = conn.cursor()

def register_clients_db(client):
    cursor.execute(''' INSERT INTO clients (name, cpf_cnpj, address, phone, email)
                   VALUES (?,?,?,?,?)
                   ''', (client.get('name'),
                        client.get('cpf_cnpj'),
                        client.get('address'),
                        client.get('phone'),
                        client.get('email'))
                   )
    conn.commit()
    conn.close()

def register_dentist_db(dentist_list):
    cursor.execute(''' INSERT INTO dentist_list (id_client, name, phone)
                   VALUES (?,?,?)
                   ''', (dentist_list.get('id_client'),
                        dentist_list.get('name'),
                        dentist_list.get('phone'))
                   )
    conn.commit()
    conn.close()
    
def register_work_types_db(work_type):
    cursor.execute('''INSERT INTO work_types (description) VALUES (?)''',
                   (work_type.get('description'),))
    conn.commit()
    conn.close()
    
def register_prices_db(price):
    cursor.execute('''INSERT INTO price_list (id_client, work_type_id, unit_price) VALUES (?,?,?)''',
                   (price.get('id_client'),
                   price.get('work_type_id'),
                   price.get('unit_price')))
    conn.commit()
    conn.close()
    
def register_works_db(work):
    cursor.execute('''INSERT INTO works (id_client, client_name, dentist, pacient, work_type_id, work_description, tooth, quantity, unit_price, total_price, date)
                   VALUES (?,?,?,?,?,?,?,?,?,?,?)''',
                   (work.get('id_client'),
                   work.get('client_name'),
                   work.get('dentist'),
                   work.get('pacient'),
                   work.get('work_type_id'),
                   work.get('work_description'),
                   work.get('tooth'),
                   work.get('quantity'),
                   work.get('unit_price'),
                   work.get('total_price'),
                   work.get('date')))
    conn.commit()
    conn.close()
    
def register_notes_db(note):
    cursor.execute('''INSERT INTO notes (id_client, client_name, works, total, date)
                   VALUES (?,?,?,?,?)''',
                   (note.get('id_client'),
                   note.get('client_name'),
                   note.get('works'),
                   note.get('total'),
                   note.get('date')))
    conn.commit()
    conn.close()
    
