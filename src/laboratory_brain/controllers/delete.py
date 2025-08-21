from laboratory_brain.database.connection import get_connection

class Deletor_API():
    def delete_client(self, id_client):
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    '''
                    DELETE FROM clients
                    WHERE id = ?
                    ''',
                    (id_client,)
                )
                conn.commit()

                if cursor.rowcount > 0:
                    return "Cliente excluído com sucesso!"
                else:
                    return "Nenhum cliente encontrado com esse ID."

        except Exception as e:
            return print(f"Erro ao excluir cliente: {str(e)}")

    def delete_work_type(self, id_type):
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    '''
                    DELETE FROM work_types
                    WHERE id = ?
                    ''',
                    (id_type,)
                )
                conn.commit()

                if cursor.rowcount > 0:
                    return "Tipo de Trabalho excluído com sucesso!"
                else:
                    return "Nenhum tipo encontrado com esse ID."

        except Exception as e:
            return print(f"Erro ao excluir Tipo: {str(e)}")
      
    def delete_price(self, id_price):
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    '''
                    DELETE FROM price_list
                    WHERE id = ?
                    ''',
                    (id_price,)
                )
                conn.commit()

                if cursor.rowcount > 0:
                    return "Preço excluído com sucesso!"
                else:
                    return "Nenhum preço encontrado com esse ID."

        except Exception as e:
            return print(f"Erro ao excluir preço: {str(e)}")
    
    def delete_dentist(self, id_dentist):
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    '''
                    DELETE FROM dentist_list
                    WHERE id = ?
                    ''',
                    (id_dentist,)
                )
                conn.commit()

                if cursor.rowcount > 0:
                    return "Dentista excluído com sucesso!"
                else:
                    return "Nenhum dentista encontrado com esse ID."

        except Exception as e:
            return print(f"Erro ao excluir dentista: {str(e)}")
        
    def delete_work(self, id_work):
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    '''
                    DELETE FROM works
                    WHERE id = ?
                    ''',
                    (id_work,)
                )
                conn.commit()

                if cursor.rowcount > 0:
                    return "Trabalho excluído com sucesso!"
                else:
                    return "Nenhum trabalho encontrado com esse ID."

        except Exception as e:
            return print(f"Erro ao excluir trabalho: {str(e)}")
        
    def delete_note(self, id_note):
        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    '''
                    DELETE FROM notes
                    WHERE id = ?
                    ''',
                    (id_note,)
                )
                conn.commit()

                if cursor.rowcount > 0:
                    return "Nota excluída com sucesso!"
                else:
                    return "Nenhuma nota encontrado com esse ID."

        except Exception as e:
            return print(f"Erro ao excluir nota: {str(e)}")
        