export function configurarEventosPrices() {
  
  load_select_clients();
    
  load_prices();

  const btn = document.getElementById("new_price");
  if (btn) {
    btn.addEventListener("click", () => {
      register_prices();
      
    });
  }
  
}

async function load_select_clients() {

  const select = document.getElementById('client_prices');
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
  filter_prices(e.target.value);
  });

}

async function load_prices(){
  const table = document.getElementById('priceTable');
  table.innerHTML = '';
  const prices = await window.pywebview.api.search.search_all_prices();
  console.log(prices)
  prices.forEach(price => {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.innerText = price.id

    const td2 = document.createElement('td');
    td2.innerText = price.id_client

    const td3 = document.createElement('td');
    td3.innerText = price.work_type_id
    
    const td4 = document.createElement('td');
    td4.innerText = price.unit_price

    const td5 = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.innerText = "✏️ Editar";
    editBtn.classList.add("btn", "btn-edit");
    editBtn.addEventListener("click", () => {
      edit_price(price.id);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "🗑️ Excluir";
    deleteBtn.classList.add("btn", "btn-delete");
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Tem certeza que deseja excluir o dentista "${price.id}"?`)) {
        window.pywebview.api.deletor.delete_price(price.id).then(response =>{
            alert(response)
          }).catch(err =>{
            console.error('Erro ao excluir preço',err)
          })
        load_prices(); 
      }
    });

    td5.append(editBtn, deleteBtn);
    tr.append(td1, td2, td3, td4, td5);
    table.appendChild(tr);
  });
}

async function filter_prices(id_client){
  const table = document.getElementById('priceTable');
  table.innerHTML = '';
  const prices = await window.pywebview.api.search.search_prices_by_client(id_client);
  console.log(prices)
  prices.forEach(price => {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.innerText = price.id

    const td2 = document.createElement('td');
    td2.innerText = price.id_client

    const td3 = document.createElement('td');
    td3.innerText = price.work_type_id
    
    const td4 = document.createElement('td');
    td4.innerText = price.unit_price

    const td5 = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.innerText = "✏️ Editar";
    editBtn.classList.add("btn", "btn-edit");
    editBtn.addEventListener("click", () => {
      edit_price(price.id);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "🗑️ Excluir";
    deleteBtn.classList.add("btn", "btn-delete");
    deleteBtn.addEventListener("click", async () => {
      if (confirm(`Tem certeza que deseja excluir o dentista "${price.id}"?`)) {
        await window.pywebview.api.dentists.delete_price(dentist.id_dentist);
        load_prices(); 
      }
    });

    td5.append(editBtn, deleteBtn);
    tr.append(td1, td2, td3, td4, td5);
    table.appendChild(tr);
  });
}

async function edit_price(id_price){
  const prices = await window.pywebview.api.search.get_price(id_price);
  console.log(prices);
  const container = document.getElementById('content_box');
  const box = document.createElement('div');
  box.classList.add('modal_edit');
  box.innerHTML = `
        <input type="number" id="price">
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

  const price = document.getElementById('price')

  price.forEach(price =>{
    price.value = price.unit_price;
  })

  document.getElementById('save').addEventListener('click', ()=>{
    const obj = {
      unit_price: price.value
    }
    window.pywebview.api.editor.edit_price(id_price, obj).then(response =>{
      alert(response);
    }).catch(err=>{
      console.log('Erro ao editar dados', err);
    })
  })
  document.getElementById('cancel').addEventListener('click', ()=>{
    box.remove();
  })
}

async function register_prices(){
  const container = document.getElementById('content_box');
  const box = document.createElement('div');
  box.classList.add('modal_edit');
  box.innerHTML = `
        <div id="prices_form">
        <select name="prices_client" id="prices_client">
            <option value="">Selecione o Cliente</option>
        </select>
        <select name="prices_work_type" id="prices_work_type">
            <option value="">Selecione o Trabalho</option>
        </select>
        <label for="prices_unit">Valor Unitário:</label>
        <input type="number" id="prices_unit">
        </div>
        <footer>
            <button type="button" class="btn" id="prices_submit">Cadastrar Novo Preço</button>
            <button type="button" class="btn" id="prices_cancel">Cancelar</button>
        </footer>
    
  `
  container.appendChild(box);
  const clientSelect = document.getElementById('prices_client');
  const clients = await window.pywebview.api.search.search_all_clients();
    clients.forEach(client =>{
      const option = document.createElement('option');
      option.value = client.id;
      option.text = client.name;
      clientSelect.appendChild(option);
    })
  const typesSelect = document.getElementById('prices_work_type');
  let types = await window.pywebview.api.search.search_work_types();
  console.log(types)
  if (!Array.isArray(types)) {
        if (typeof types === "string") {
            types = JSON.parse(types);
        } else {
            types = Object.values(types);
        }
    }
  types.forEach(type =>{
    const option = document.createElement('option');
    option.value = type.id;
    option.text = type.description;
    typesSelect.appendChild(option);
  })
  const priceInput = document.getElementById('prices_unit');
  const priceData = {
      data: 'prices',
      id_client: clientSelect.value,
      client_name: clientSelect.options[clientSelect.selectedIndex].text,
      work_type_id: typesSelect.value,
      work_type_description: typesSelect.options[typesSelect.selectedIndex].text,
      unit_price: priceInput.value
  };

  
  const submit = document.getElementById('prices_submit');
  submit.addEventListener('click', ()=>{
      console.log(priceData);
      window.pywebview.api.register.register(priceData).then(response => {
      alert(response);
      box.remove()
    }).catch(err =>{
        alert('Erro:', err)
    });
  })
  document.getElementById('prices_cancel').addEventListener('click', () =>{
    box.remove();
  })
  
}