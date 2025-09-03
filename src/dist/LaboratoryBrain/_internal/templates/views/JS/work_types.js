export function configurarEventosWorkTypes() {
  
  load_work_types();

  const btn = document.getElementById("new_work_type");
  if (btn) {
    btn.addEventListener("click", () => {
      register_work_type();
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
      edit_type(type.id)
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "🗑️ Excluir";
    deleteBtn.classList.add("btn", "btn-delete");
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Tem certeza que deseja excluir o tipo de trabalho? "${type.description}"?`)) {
        window.pywebview.api.deletor.delete_work_type(type.id).then(response =>{
            alert(response)
          }).catch(err =>{
            console.error('Erro ao excluir tipo',err)
          })
        table.innerHTML = '';
        load_work_types(); 
      }
    });

    td3.append(editBtn, deleteBtn);
    tr.append(td1, td2, td3);
    table.appendChild(tr);

  });
}

async function edit_type(id_type){
  const types = await window.pywebview.api.search.get_type(id_type);
  console.log(types);
  const container = document.getElementById('content_box');
  const box = document.createElement('div');
  box.classList.add('modal_edit');
  box.innerHTML = `
        <input type="text" id="name">
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

  const description = document.getElementById('name')

  types.forEach(type =>{
    description.value = type.description;
  })

  document.getElementById('save').addEventListener('click', ()=>{
    const obj = {
      description: description.value
    }
    window.pywebview.api.editor.edit_client(id_type, obj).then(response =>{
      alert(response);
    }).catch(err=>{
      alert('Erro ao editar dados', err);
    })
  })
  document.getElementById('cancel').addEventListener('click', ()=>{
    box.remove();
  })
}

async function register_work_type(){
  const container = document.getElementById('content_box');
  const box = document.createElement('div');
  box.classList.add('modal_edit');
  box.innerHTML = `
         <div id="work_types_form">
        <input type="text" id="description" placeholder="Descrição do Tipo de Trabalho">
        </div>
        <footer>
            <button type="button" class="btn" id="type_submit">Cadastrar Tipo de Trabalho</button>
            <button type="button" class="btn" id="type_cancel">Cancelar</button>
        </footer>
    
  `
  container.appendChild(box);
  

  document.getElementById('type_submit').addEventListener('click', ()=>{
    const description = document.getElementById("description").value
    const work_type_obj = {data: 'work_type', description: description};
    console.log(work_type_obj);
    window.pywebview.api.register.register(work_type_obj).then(response => {
        alert(response);
        box.remove();
    }).catch(err =>{
        alert('Erro:', err)
    });
  })
  document.getElementById('type_cancel').addEventListener('click', ()=>{
    box.remove();
  })
}