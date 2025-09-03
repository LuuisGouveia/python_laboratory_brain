export function configurarEventosWorks() {
  

  load_works()
  load_select_clients()

  const btn = document.getElementById("new_work");
  if (btn) {
    btn.addEventListener("click", () => {
      register_work();
    });
  }

 
}

async function load_select_clients() {

  const select = document.getElementById('client_works');
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
    console.error("Erro ao carregar clientes:", error);
  }
  select.addEventListener("change", (e) => {
  console.log("Cliente selecionado:", e.target.value);
  filter_works_by_client(e.target.value);
  });

}

async function load_works(){
  const table = document.getElementById("worksTable");
  table.innerHTML = '';
  const works = await window.pywebview.api.search.search_all_works();
  console.log(works)
  works.forEach(work => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.innerText = work.id;
    const td2 = document.createElement('td');
    td2.innerText = work.id_client;
    const td3 = document.createElement('td');
    td3.innerText = work.client_name;
    const td4 = document.createElement('td');
    td4.innerText = work.dentist
    const td5 = document.createElement('td');
    td5.innerText = work.pacient;
    const td6 = document.createElement('td');
    td6.innerText = work.work_type_id;
    const td7 = document.createElement('td');
    td7.innerText = work.work_description;
    const td8 = document.createElement('td');
    td8.innerText = work.tooth;
    const td9 = document.createElement('td');
    td9.innerText = work.quantity;
    const td10 = document.createElement('td');
    td10.innerText = work.unit_price;
    const td11 = document.createElement('td');
    td11.innerText = work.total_price;
    const td12 = document.createElement('td');
    td12.innerText = work.date;
    const td13 = document.createElement('td');
    td13.innerText = work.charged;
    const td14 = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.innerText = "✏️ Editar";
    editBtn.classList.add("btn", "btn-edit");
    editBtn.addEventListener("click", () => {
      edit_work(work.id);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "🗑️ Excluir";
    deleteBtn.classList.add("btn", "btn-delete");
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Tem certeza que deseja excluir o trabalho? "${work.id}"?`)) {
        window.pywebview.api.deletor.delete_work(work.id).then(response =>{
            alert(response)
          }).catch(err =>{
            console.error('Erro ao excluir trabalho',err)
          })
        load_works(); 
      }
    });

    td14.append(editBtn, deleteBtn);
    tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9, td10, td11, td12, td13, td14);
    table.appendChild(tr);
  });
}

async function filter_works_by_client(id_client){
  const table = document.getElementById("worksTable");
  table.innerHTML = '';
  const works = await window.pywebview.api.search.search_works_by_client(id_client);
  console.log(works)
  works.forEach(work => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.innerText = work.id;
    const td2 = document.createElement('td');
    td2.innerText = work.id_client;
    const td3 = document.createElement('td');
    td3.innerText = work.client_name;
    const td4 = document.createElement('td');
    td4.innerText = work.dentist
    const td5 = document.createElement('td');
    td5.innerText = work.pacient;
    const td6 = document.createElement('td');
    td6.innerText = work.work_type_id;
    const td7 = document.createElement('td');
    td7.innerText = work.work_description;
    const td8 = document.createElement('td');
    td8.innerText = work.tooth;
    const td9 = document.createElement('td');
    td9.innerText = work.quantity;
    const td10 = document.createElement('td');
    td10.innerText = work.unit_price;
    const td11 = document.createElement('td');
    td11.innerText = work.total_price;
    const td12 = document.createElement('td');
    td12.innerText = work.date;
    const td13 = document.createElement('td');
    td13.innerText = work.charged;
    const td14 = document.createElement('td');

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "🗑️ Excluir";
    deleteBtn.classList.add("btn", "btn-delete");
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Tem certeza que deseja excluir o trabalho? "${work.id}"?`)) {
        window.pywebview.api.deletor.delete_work(work.id).then(response =>{
            alert(response)
          }).catch(err =>{
            console.error('Erro ao excluir trabalho',err)
          })
        load_works(); 
      }
    });

    td14.append(deleteBtn);
    tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9, td10, td11, td12, td13, td14);
    table.appendChild(tr);
  });
}

async function register_work(){
  const container = document.getElementById('content_box');
  const box = document.createElement('div');
  box.classList.add('modal_edit');
  box.innerHTML = `
         <div id="work_form">
        <select name="work_client" id="work_client">
            <option value="">Selecione o Cliente</option>
        </select>

        <select name="work_dentist" id="work_dentist">
        <option value="">Selecione o Dentista</option>
        </select>

        
        <input type="text" placeholder="Nome do Paciente">

      
        <select name="work_type" id="work_type">
            <option value="">Selecione o Tipo de Trabalho</option>
        </select>
        
        <label for="tooth">Nº do Dente:</label>
        <input type="text" id="tooth">

        <label for="quantity">Quantidade:</label>
        <input type="number" id="quantity">
        

        <label for="unit">Valor Unitário:</label>
        <input type="number" id="unit">
        

        <label for="total">Valor Total:</label>
        <input type="number" id="total">
        
        <label for="date">Data</label>
        <input type="date" id="date">
        
        </div>
        <footer>
            <button class="btn" type="button" id="work_submit">Cadastrar Trabalho</button>
            <button class="btn" type="button" id="work_cancel">Cancelar</button>
        </footer>

    
  `
  container.appendChild(box);
  const clients = await window.pywebview.api.search.search_all_clients();
  const clientSelect = document.getElementById('work_client');
  clients.forEach(client =>{
    const option = document.createElement('option');
    option.value = client.id;
    option.text = client.name;
    clientSelect.appendChild(option);
  })
  clientSelect.addEventListener('change', async () =>{
    const dentists = await window.pywebview.api.search.search_dentists_by_client(clientSelect.value);
    const dentistSelect = document.getElementById('work_dentist');
    if (dentists.length === 0) {
      dentistSelect.disabled = true;
    } else {
      dentistSelect.disable = false;
      dentists.forEach(dentist => {
      const option = document.createElement('option');
      option.value = dentist.id;
      option.text = dentist.name;
      dentistSelect.appendChild(option);
  })
  }
  })
  
  const types = await window.pywebview.api.search.search_work_types();
  const typesSelect = document.getElementById('work_type');

  if (!Array.isArray(types)) {
        if (typeof types === "string") {
            types = JSON.parse(types);
        } else {
            types = Object.values(types);
        }
    }
  types.forEach(type => {
    const option = document.createElement('option');
    option.value = type.id;
    option.text = type.description;
    typesSelect.appendChild(option);
  })

  const unit = document.getElementById('unit');
  typesSelect.addEventListener('change', async () =>{
    const unit_price = await window.pywebview.api.search.search_prices(clientSelect.value, typesSelect.value);
    unit.value = unit_price;
  })

  const quantity = document.getElementById('quantity');
  const total = document.getElementById('total');
  quantity.addEventListener('change', ()=>{
    total.value = (unit.value * quantity.value).toFixed(2);
  })
  

  document.getElementById('work_submit').addEventListener('click', ()=>{

    const tooth = document.getElementById('tooth').value;
    const pacientName = document.querySelector('#work_form input[placeholder="Nome do Paciente"]').value.trim();
    const date = document.getElementById('date').value;
    const dentistSelect = document.getElementById('work_dentist');
    const typesSelect = document.getElementById('work_type');


    const workData = {
        data: 'work',
        id_client: clientSelect.value,
        client_name: clientSelect.options[clientSelect.selectedIndex]?.text || '',
        dentist: dentistSelect.options[dentistSelect.selectedIndex]?.text || '',
        pacient: pacientName,
        work_type_id: typesSelect.value,
        work_description: typesSelect.options[typesSelect.selectedIndex]?.text || '',
        tooth: tooth,
        quantity: quantity.value,
        unit_price: unit.value,
        total_price: total.value,
        date: date
    };

    console.log(workData);
    window.pywebview.api.register.register(workData).then(response =>{
        alert(response);
        box.remove();
    }).catch(err =>{
        alert('Erro ao cadastrar trabalho: ', err)
    })
    })
  document.getElementById('work_cancel').addEventListener('click', () =>{
    box.remove();
  })

}

