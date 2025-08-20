const btn = document.getElementById('client_submit')
    btn.addEventListener('click', ()=>{
        submit_dentist();
    })

function submit_dentist(){
    const name = document.getElementById("client_name_dentist").value;
    const cpf = document.getElementById("client_cpf_dentist").value;
    const address = document.getElementById("client_address_dentist").value;
    const fone = document.getElementById("client_fone_dentist").value;
    const email = document.getElementById("client_email_dentist").value;

    const obj_client = {
        data: 'client',
        name: name,
        cpf_cnpj: cpf,
        address: address,
        fone: fone, 
        email: email,
    }

    console.log(obj_client)
    window.pywebview.api.register.register(obj_client).then(response => {
        alert(response);
    }).catch(err => {
        console.error('Erro:', err);
    })
}
