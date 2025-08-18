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
    window.pywebview.api.windows.register_modal('edit_client.html', client.id_client);
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