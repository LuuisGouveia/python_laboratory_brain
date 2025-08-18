export function configurarEventosPrices() {
  
  load_select_clients();
    
  load_prices();

  const btn = document.getElementById("new_price");
  if (btn) {
    btn.addEventListener("click", () => {
      window.pywebview.api.windows.register_modal('register_prices.html');
      
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
      window.pywebview.api.windows.register_modal('edit_dentist.html', dentist.id_dentist);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "🗑️ Excluir";
    deleteBtn.classList.add("btn", "btn-delete");
    deleteBtn.addEventListener("click", async () => {
      if (confirm(`Tem certeza que deseja excluir o dentista "${dentist.name}"?`)) {
        await window.pywebview.api.dentists.delete_price(dentist.id_dentist);
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
      window.pywebview.api.windows.register_modal('edit_dentist.html', dentist.id_dentist);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "🗑️ Excluir";
    deleteBtn.classList.add("btn", "btn-delete");
    deleteBtn.addEventListener("click", async () => {
      if (confirm(`Tem certeza que deseja excluir o dentista "${dentist.name}"?`)) {
        await window.pywebview.api.dentists.delete_price(dentist.id_dentist);
        load_prices(); 
      }
    });

    td5.append(editBtn, deleteBtn);
    tr.append(td1, td2, td3, td4, td5);
    table.appendChild(tr);
  });
}