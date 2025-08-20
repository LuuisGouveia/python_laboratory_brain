import sqlite3
from laboratory_brain.database.connection import get_connection

class Editor_API():
    
    def edit_client(self, id_client, clientData):
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    '''
                    UPDATE clients 
                    SET name = ?, cpf_cnpj = ?, address = ?, phone = ?, email = ? 
                    WHERE id = ?
                    ''',
                    (
                        clientData.get('name'),
                        clientData.get('cpf_cnpj'),
                        clientData.get('address'),
                        clientData.get('phone'),
                        clientData.get('email'),
                        id_client
                    )
                )
                conn.commit()

                if cursor.rowcount > 0:
                    return "Cliente atualizado com sucesso!"
                else:
                    return "Nenhum cliente encontrado com esse ID."

        except Exception as e:
            return print(f"Erro ao atualizar cliente: {str(e)}")

    def edit_work_type(self, id_type, typeData):
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    '''
                    UPDATE work_types 
                    SET description = ?
                    WHERE id = ?
                    ''',
                    (
                        typeData.get('description'),
                        id_type
                    )
                )
                conn.commit()

                if cursor.rowcount > 0:
                    return "Tipo de Trabalho atualizado com sucesso!"
                else:
                    return "Nenhum tipo encontrado com esse ID."

        except Exception as e:
            return print(f"Erro ao atualizar Tipo: {str(e)}")
      
    def edit_price(self, id_price, priceData):
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    '''
                    UPDATE price_list 
                    SET unit_price = ?
                    WHERE id = ?
                    ''',
                    (
                        priceData.get('unit_price'),
                        id_price
                    )
                )
                conn.commit()

                if cursor.rowcount > 0:
                    return "Preço atualizado com sucesso!"
                else:
                    return "Nenhum preço encontrado com esse ID."

        except Exception as e:
            return print(f"Erro ao atualizar preço: {str(e)}")
    
    def edit_dentist(self, id_dentist, dentistData):
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    '''
                    UPDATE dentist_list 
                    SET name = ?, phone = ?
                    WHERE id = ?
                    ''',
                    (
                        dentistData.get('name'),
                        dentistData.get('phone'),
                        id_dentist
                    )
                )
                conn.commit()

                if cursor.rowcount > 0:
                    return "Dentista atualizado com sucesso!"
                else:
                    return "Nenhum dentista encontrado com esse ID."

        except Exception as e:
            return print(f"Erro ao atualizar dentista: {str(e)}")
        
    def edit_work(self, id_work, workData):
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    '''
                    UPDATE works 
                    SET id_client = ?, client_name = ?, dentist = ?, pacient = ?, work_type_id = ?, work_description = ?, tooth = ?, quantity = ?, unit_price = ?, total_price = ?, date = ?
                    WHERE id = ?
                    ''',
                    (
                        workData.get('id_client'),
                        workData.get('client_name'),
                        workData.get('dentist'),
                        workData.get('pacient'),
                        workData.get('work_type_id'),
                        workData.get('work_description'),
                        workData.get('tooth'),
                        workData.get('quantity'),
                        workData.get('unit_price'),
                        workData.get('total_price'),
                        workData.get('date'),
                        id_work
                    )
                )
                conn.commit()

                if cursor.rowcount > 0:
                    return "Trabalho atualizado com sucesso!"
                else:
                    return "Nenhum trabalho encontrado com esse ID."

        except Exception as e:
            return print(f"Erro ao atualizar trabalho: {str(e)}")
        
    def edit_charged(self, id_work):
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    '''
                    UPDATE works 
                    SET charged = 0
                    WHERE id = ?
                    ''',
                    (id_work,)
                )
                conn.commit()

                if cursor.rowcount > 0:
                    return "Baixa realizada com sucesso!"
                else:
                    return "Nenhum trabalho encontrado com esse ID."

        except Exception as e:
            return print(f"Erro ao atualizar trabalho: {str(e)}")
        
