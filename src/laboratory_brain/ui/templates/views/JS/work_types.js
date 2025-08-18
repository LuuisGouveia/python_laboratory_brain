export function configurarEventosWorkTypes() {
  
  load_work_types();

  const btn = document.getElementById("new_work_type");
  if (btn) {
    btn.addEventListener("click", () => {
      window.pywebview.api.windows.register_modal('register_work_types.html');
    });
  }
 
}

async function load_work_types(){
  const table = document.getElementById('typeTable')
  const types = await window.pywebview.api.search.search_work_types();
  console.log(types)
  types.forEach(type => {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.innerText = type.id;
    
    const td2 = document.createElement('td');
    td2.innerText = type.description;

    const td3 = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.innerText = "✏️ Editar";
    editBtn.classList.add("btn", "btn-edit");
    editBtn.addEventListener("click", () => {
      //aqui ficarara funcao de modal de edição
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "🗑️ Excluir";
    deleteBtn.classList.add("btn", "btn-delete");
    deleteBtn.addEventListener("click", async () => {
      if (confirm(`Tem certeza que deseja excluir o tipo de trabalho? "${dentist.name}"?`)) {
        // aqui ficara função de deletar
        load_work_types(); 
      }
    });

    td3.append(editBtn, deleteBtn);
    tr.append(td1, td2, td3);
    table.appendChild(tr);

  });
}
