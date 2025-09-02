export async function configurarEventosDentists() {

    load_select_clients();
    
    const select = document.getElementById('client_select');
    select.addEventListener("change", (e) => {
    console.log("Cliente selecionado:", e.target.value);
    load_dentists(e.target.value);
    });

  const btn = document.getElementById("new_dentist");
  if (btn) {
    btn.addEventListener("click", () => {
      register_dentist();
    });
  }
}

async function load_select_clients() {

  const select = document.getElementById('client_select');
  console.log("Elemento select:", select);
  select.innerHTML = ''; 

  try {
    const clients = await window.pywebview.api.search.search_all_clients();
    console.log(clients);

    
    const placeholder = document.createElement('option');
    placeholder.textContent = "Selecione um cliente";
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    clients.forEach(client => {
      const option = document.createElement('option');
      option.textContent = client.name;
      option.value = client.id; 
      select.appendChild(option);
    });
  } catch (error) {
    alert("Erro ao carregar clientes:", error);
  }
  

}

async function load_dentists(clientId) {
  const table = document.getElementById("dentistTable");

  if (!table) {
    alert("Elemento #dentistTable não encontrado no HTML.");
    return;
  }

  // limpa a tabela antes de preencher de novo
  table.innerHTML = "";

  try {
    const dentists = await window.pywebview.api.search.search_dentists_by_client(clientId);
    console.log(dentists);

    if (dentists.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 6;
      td.innerText = "Nenhum dentista cadastrado para este cliente.";
      tr.appendChild(td);
      table.appendChild(tr);
      return;
    }

    dentists.forEach(dentist => {
      const tr = document.createElement('tr');

      const td1 = document.createElement('td');
      td1.innerText = dentist.id;

      const td2 = document.createElement('td');
      td2.innerText = dentist.id_client;

      const td3 = document.createElement('td');
      td3.innerText = dentist.name;

      const td4 = document.createElement('td');
      td4.innerText = dentist.phone;

      const td5 = document.createElement('td');
      const editBtn = document.createElement('button');
      editBtn.innerText = "✏️ Editar";
      editBtn.classList.add("btn", "btn-edit");
      editBtn.addEventListener("click", () => {
        edit_dentist(dentist.id)
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = "🗑️ Excluir";
      deleteBtn.classList.add("btn", "btn-delete");
      deleteBtn.addEventListener("click", () => {
        if (confirm(`Tem certeza que deseja excluir o dentista "${dentist.name}"?`)) {
          window.pywebview.api.deletor.delete_dentist(dentist.id).then(response =>{
            alert(response)
          }).catch(err =>{
            console.error('Erro ao excluir dentista',err)
          })
          load_dentists(clientId); 
        }
      });

      td5.append(editBtn, deleteBtn);

      tr.append(td1, td2, td3, td4, td5);
      table.appendChild(tr);
    });
  } catch (error) {
    alert("Erro ao carregar dentistas:", error);
  }
}

async function edit_dentist(id_dentist){
  const dentists = await window.pywebview.api.search.get_dentist(id_dentist);
  console.log(dentists);
  const container = document.getElementById('content_box');
  const box = document.createElement('div');
  box.classList.add('modal_edit');
  box.innerHTML = `
        <input type="text" id="name">
        <input type="text" id="phone">
        <div>
         <button type="button" id="save">
            Salvar Alterações
         </button>
         <button type="button" id="cancel">
            Cancelar
         </button>
        </div>
    
  `
  container.appendChild(box);

  const name = document.getElementById('name')

  const phone = document.getElementById('phone')

  dentists.forEach(dentist =>{
    name.value = dentist.name,
    phone.value = dentist.phone
  })

  document.getElementById('save').addEventListener('click', ()=>{
    const obj = {
      name : name.value,
      phone : phone.value,
    }
    window.pywebview.api.editor.edit_dentist(id_client, obj).then(response =>{
      alert(response);
    }).catch(err=>{
      alert('Erro ao editar dados', err);
    })
  })
  document.getElementById('cancel').addEventListener('click', ()=>{
    box.remove();
  })
}

async function register_dentist(){
  
  const container = document.getElementById('content_box');
  const box = document.createElement('div');
  box.classList.add('modal_edit');
  box.innerHTML = `
        <header>
        <select name="register_select" id="register_select">
            <option value="">Selecione o Cliente</option>
        </select>
        </header>

        <div id="dentist_form" class="dentist_form">
            <input type="text" id="dentist_name" placeholder="Nome do Dentista">
            <input type="text" id="dentist_fone" placeholder="Telefone">
        </div>
        
        <footer>
            <button type="button" class="btn" id="dentist_submit">Cadastrar Cliente</button>
            <button type="button" class="btn" id="dentist_cancel">Cancelar</button>
        </footer>
    
  `
  container.appendChild(box);
  const clientSelect = document.getElementById('register_select');
  const clients = await window.pywebview.api.search.search_all_clients();
    clients.forEach(client =>{
      const option = document.createElement('option');
      option.value = client.id;
      option.text = client.name;
      clientSelect.appendChild(option);
    })
  
  const saveBtn = document.getElementById('dentist_submit');
  saveBtn.addEventListener('click', ()=>{
    const dentistName = document.getElementById('dentist_name').value;
    const dentistFone = document.getElementById('dentist_fone').value;

    const dentistData = {
        data: 'dentist',
        id_client: clientSelect.value,
        name: dentistName,
        phone: dentistFone
      };

    console.log(dentistData);
    window.pywebview.api.register.register(dentistData).then(response => {
      alert(response);
      box.remove();
      }).catch(err =>{
          alert('Erro:', err)
      });
  })
  const cancel = document.getElementById('dentist_cancel');
  cancel.addEventListener('click', () =>{
    box.remove();
  })
  
    

}