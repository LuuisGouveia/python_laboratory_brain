const clinic_form = document.getElementById("clinic_form");
const dentist_form = document.getElementById("dentist_form");

//select tipo de cliente
document.getElementById("client_type").addEventListener("change", function(){
    const selected = this.value;
    console.log(selected);
    if (selected === 'dentist'){
        clinic_form.style.display = 'none';
        dentist_form.style.display = 'block';
        document.getElementById('client_submit').addEventListener("click", ()=>{
            submit_dentist();
        })
    }else if (selected === 'clinic'){
        dentist_form.style.display = 'none';
        clinic_form.style.display = 'block';
        document.getElementById('client_submit').addEventListener("click", ()=>{
            submit_clinic();
        })
    }
})

const dentist_list_box = document.getElementById("dentist_list_box");
const deleteBtn = document.getElementById("dentist_delete_clinic")

//botao de adicionar cliente ao cadastro de clinica
document.getElementById("dentist_add_clinic").addEventListener("click", () => {    
    const input_name = document.createElement("input");
    const input_telefone = document.createElement("input");
    input_name.placeholder = 'Nome Dentista';
    input_name.className = 'dentist_list_name'
    input_telefone.placeholder = 'Telefone';
    input_telefone.className = 'dentist_list_fone';
    dentist_list_box.appendChild(input_name);
    dentist_list_box.appendChild(input_telefone);
    if (deleteBtn.style.display === "none") {
        deleteBtn.style.display = "inline-block";
    }

})
deleteBtn.addEventListener("click", () => {
    const nomes = dentist_list_box.querySelectorAll(".dentist_list_name");
    const fones = dentist_list_box.querySelectorAll(".dentist_list_fone");

    if (nomes.length > 0 && fones.length > 0) {
        dentist_list_box.removeChild(nomes[nomes.length - 1]);
        dentist_list_box.removeChild(fones[fones.length - 1]);
    }

    if (dentist_list_box.querySelectorAll(".dentist_list_name").length === 0) {
        deleteBtn.style.display = "none";
    }
});


function submit_clinic(){
    const name = document.getElementById("client_name_clinic").value;
    const cpf = document.getElementById("client_cpf_clinic").value;
    const address = document.getElementById("client_address_clinic").value;
    const fone = document.getElementById("client_fone_clinic").value;
    const email = document.getElementById("client_email_clinic").value;

    const dentist_list = [];

    const nomes = document.querySelectorAll("#dentist_list_box .dentist_list_name");
    const telefones = document.querySelectorAll("#dentist_list_box .dentist_list_fone");

    nomes.forEach((input, index) => {
        const nome = input.value;
        const telefone = telefones[index].value;
        if (nome) {
            dentist_list.push({ nome, telefone });
        }
    });

    const obj_client = {
        data: 'client',
        name: name,
        cpf: cpf,
        address: address,
        fone: fone, 
        email: email,
    }

    console.log(obj_client, dentist_list)
    window.pywebview.api.register(obj_client, dentist_list).then(response => {
        alert(response);
        }
    ).catch(err => {
        console.error('Erro:', err)
    });
}

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
    window.pywebview.api.register(obj_client).then(response => {
        alert(response);
    }).catch(err => {
        console.error('Erro:', err);
    })
}
