export function configurarEventosClients() {
  load_clients();
  
  const btn = document.getElementById("new_client");
  if (btn) {
    btn.addEventListener("click", () => {
      window.pywebview.api.windows.register_modal('register_client.html');
    });
  }

}

async function load_clients(){
  const table = document.getElementById('clientTable');
  table.innerHTML = '';
  const clients = await window.pywebview.api.search.search_all_clients();
  console.log(clients);

  clients.forEach(client => {
  const tr = document.createElement('tr');

  const td1 = document.createElement('td');
  td1.innerText = client.id;

  const td2 = document.createElement('td');
  td2.innerText = client.name;

  const td3 = document.createElement('td');
  td3.innerText = client.cpf_cnpj;

  const td4 = document.createElement('td');
  td4.innerText = client.address;

  const td5 = document.createElement('td');
  td5.innerText = client.phone;

  const td6 = document.createElement('td');
  td6.innerText = client.email;

  const td7 = document.createElement('td');
  // Botões de configuração
  const editBtn = document.createElement('button');
  editBtn.innerText = "✏️ Editar";
  editBtn.classList.add("btn", "btn-edit");
  editBtn.addEventListener("click", () => {
    edit_client(client.id);
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = "🗑️ Excluir";
  deleteBtn.classList.add("btn", "btn-delete");
  deleteBtn.addEventListener("click", async () => {
    if (confirm(`Tem certeza que deseja excluir o cliente "${client.name}"?`)) {
      await window.pywebview.api.clients.delete_client(client.id_client);
      load_clients(); // recarrega tabela após exclusão
    }
  });

  td7.append(editBtn, deleteBtn);

  tr.append(td1, td2, td3, td4, td5, td6, td7);
  table.appendChild(tr);
  });
}

async function edit_client(id_client){
  const clients = await window.pywebview.api.search.get_client(id_client);
  console.log(clients);
  // const container = document.getElementById('content_box');
  const box = document.getElementById('content_box');
  box.innerHTML = `
    <div class="modal_edit">
       <input type="text" id="name">
       <input type="number" id="cpf">
       <input type="text" id="address">
       <input type="text" id="phone">
       <input type="text" id="email">
        <div>
         <button type="button" id="save">
            Salvar Alterações
         </button>
         <button type="button" id="cancel">
            Cancelar
         </button>
        </div>
    </div>
    
  `
  container.appendChild(box);

  const name = document.getElementById('name')

  const cpf = document.getElementById('cpf')

  const address = document.getElementById('address')

  const phone = document.getElementById('phone')

  const email = document.getElementById('email')


  clients.forEach(client =>{
    name.value = client.name;
    cpf.value = client.cpf_cnpj,
    address.value = client.address,
    phone.value = client.phone,
    email.value = client.email
  })

  document.getElementById('save').addEventListener('click', ()=>{
    const obj = {
      name : name.value,
      cpf_cnpj : cpf.value,
      address : address.value,
      phone : phone.value,
      email : email.value
    }
    window.pywebview.api.editor.edit_client(id_client, obj).then(response =>{
      alert(response);
    }).catch(err=>{
      console.log('Erro ao editar dados', err);
    })
  })
  document.getElementById('cancel').addEventListener('click', ()=>{
    box.remove();
  })
}