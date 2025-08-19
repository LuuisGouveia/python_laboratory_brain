from laboratory_brain.database.db_manager import register_notes_db, register_clients_db, register_dentist_db, register_prices_db, register_work_types_db, register_works_db
import sqlite3
import json

class Register_API():
    def register(self, first_data, second_data=None):

        
        print('Dados recebidos: ', first_data, second_data)
        
        if first_data['data'] == 'client':
            print('dados de um cliente')
            client = {
                'name': first_data['name'],
                'cpf_cnpj': first_data['cpf_cnpj'],
                'address' : first_data['address'],
                'phone' : first_data['fone'],
                'email' : first_data['email']
            }
            try:
                register_clients_db(client)
            except Exception as e:
                return print('Erro ao cadastrar Cliente: ', e)
            else:
                return 'Dados cadastrados com sucesso'
        
        elif first_data['data'] == 'prices':
            print('dados de um preço')
            price = {'id_client':first_data['id_client'],
                      'work_type_id':first_data['work_type_id'],
                      'unit_price': first_data['unit_price']}
            try:
                register_prices_db(price)
            except Exception as e:
                return print('Erro ao cadastrar preço', e)
            else:
                return 'Dados cadastrados com sucesso'
        
        elif first_data['data'] == 'work_type':
            print('dados de um tipo de trabalho')
            work_type = {'description' : first_data['description']}
            try:
                register_work_types_db(work_type)
            
            except sqlite3.ProgrammingError as e:
                return(f"Erro ao cadastrar Tipo de Trabalho: ${str(e)}")

            except Exception as e:
                return (f"Erro ao cadastrar Tipo de Trabalho: ${str(e)}")            
            
            else:
                return 'Dados cadastrados com sucesso'
        
        elif first_data['data'] == 'work':
            print('dados de um trabalho')
            work = {
                'id_client': first_data['id_client'], 
                'client_name': first_data['client_name'],
                'dentist': first_data['dentist'],
                'pacient': first_data['pacient'],
                'work_type_id': first_data['work_type_id'],
                'work_description': first_data['work_description'],
                'tooth': first_data['tooth'],
                'quantity': first_data['quantity'],
                'unit_price': first_data['unit_price'],
                'total_price': first_data['total_price'],
                'date': first_data['date']
            }
            try:
                register_works_db(work)
            except Exception as e:
                return print("Erro ao cadastrar trabalho: ", e)
            else:
                return 'Dados cadastrados com sucesso'
        
        elif first_data['data'] == 'note':
            print('dados de uma nota')
            works_json = json.dumps(first_data.get("works", []), ensure_ascii=False)
            note = {
                'id_client': first_data['id_client'],
                'client_name': first_data['client_name'],
                'works': works_json,
                'total': first_data['total'],
                'date': first_data['date']
            }
            
            try:
                register_notes_db(note)
            except Exception as e:
                return print(f'Erro ao salvar nota: ${str(e)}')
            
            return 'Dados cadastrados com sucesso'
        
        elif first_data['data'] == 'dentist':
            print('dados de um dentista')
            dentist = {
                'id_client': first_data['id_client'],
                'name': first_data['name'],
                'phone': first_data['phone']
            }
            try:
                register_dentist_db(dentist)
            except Exception as e:
                return print("Erro ao cadastrar dentista", e)
            else:
                return 'Dados cadastrados com sucesso'