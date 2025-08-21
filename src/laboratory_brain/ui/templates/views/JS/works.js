export function configurarEventosWorks() {
  

  load_works()
  load_select_clients()

  const btn = document.getElementById("new_work");
  if (btn) {
    btn.addEventListener("click", () => {
      window.pywebview.api.windows.register_modal('register_work.html');
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

