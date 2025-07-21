


class Register_API():
    def register_client(self, first_data, second_data):

        
        print('Cliente recebido: ', first_data, second_data)
        if first_data['data'] == 'client':
            print('dados de um cliente')

        return 'Cliente cadastrado com sucesso'