


class Register_API():
    def register(self, first_data, second_data=None):

        
        print('Dados recebidos: ', first_data, second_data)
        
        if first_data['data'] == 'client':
            print('dados de um cliente')
        
        elif first_data['data'] == 'prices':
            print('dados de um preço')
            
        elif first_data['data'] == 'work_type':
            print('dadsos de um tipo de trabalho')
            
        elif first_data['data'] == 'work':
            print('dados de um trabalho')
            
        elif first_data['data'] == 'note':
            print('dados de uma nota')
            
        return 'Dados cadastrado com sucesso'