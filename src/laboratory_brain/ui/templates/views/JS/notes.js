export function configurarEventosNotes() {
  
  load_select_clients()
  load_all_notes()
  const btn = document.getElementById("new_note");
  if (btn) {
    btn.addEventListener("click", () => {
      window.pywebview.api.windows.register_modal('register_notes.html');
    });
  }
  const btnSearch = document.getElementById("search_btn");
  if (btnSearch) {
    const input = document.getElementById('notes_ID_search');
    btnSearch.addEventListener('click', ()=>{
      search_note(input.value);
    })
  }
 
}



async function load_select_clients(){

  const select = document.getElementById('note_client');
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
  select.addEventListener('change', ()=>{
    const table = document.getElementById('noteTable');
    table.innerHTML = '';
    load_notes_by_client(select.value);
  })
  
}

async function load_all_notes(){
  const table = document.getElementById('noteTable');
  const notes = await window.pywebview.api.search.search_all_notes()
  console.log(notes);
  notes.forEach(note =>{
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.innerText = note.id;
    const td2 = document.createElement('td');
    td2.innerText = note.id_client;
    const td3 = document.createElement('td');
    td3.innerText = note.client_name;
    const td4 = document.createElement('td');
    td4.innerText = note.total.toFixed(2);
    const td5 = document.createElement('td');
    td5.innerText = note.date;
    const td6 = document.createElement('td');

      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = "🗑️ Excluir";
      deleteBtn.classList.add("btn", "btn-delete");
      deleteBtn.addEventListener("click", () => {
        if (confirm(`Tem certeza que deseja excluir a nota? "${note.id}"?`)) {
          window.pywebview.api.deletor.delete_note(note.id).then(response =>{
          alert(response)
        }).catch(err =>{
          console.error('Erro ao excluir nota',err)
        })
          load_all_notes(); 
        }
      });
      const pdfBtn = document.createElement('button');
      pdfBtn.innerText = 'PDF';
      pdfBtn.classList.add('btn', 'btn-pdf');
      pdfBtn.addEventListener('click', ()=>{
        const obj = {
          id: note.id,
          id_client: note.id_client,
          client_name: note.client_name,
          total: note.total,
          date: note.date
        }
        window.pywebview.api.pdf.make_note(obj)
      })

      td6.append(deleteBtn, pdfBtn);
      tr.append(td1, td2, td3, td4, td5, td6);
      table.innerHTML = '';
      table.appendChild(tr);
  })

}



async function load_notes_by_client(id_client){

  const table = document.getElementById('noteTable');
  const notes = await window.pywebview.api.search.search_notes_by_client(id_client);
  if(!notes){
    return alert('Não notas para esse cliente selecionado.')
  }
  notes.forEach(note =>{
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.innerText = note.id;
    const td2 = document.createElement('td');
    td2.innerText = note.id_client;
    const td3 = document.createElement('td');
    td3.innerText = note.client_name;
    const td4 = document.createElement('td');
    td4.innerText = note.total.toFixed(2);
    const td5 = document.createElement('td');
    td5.innerText = note.date;
    const td6 = document.createElement('td');

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "🗑️ Excluir";
    deleteBtn.classList.add("btn", "btn-delete");
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Tem certeza que deseja excluir a nota? "${note.id}"?`)) {
        window.pywebview.api.deletor.delete_note(note.id).then(response =>{
          alert(response)
        }).catch(err =>{
          console.error('Erro ao excluir nota',err)
        })
        load_all_notes(); 
      }
    });
    const pdfBtn = document.createElement('button');
    pdfBtn.innerText = 'PDF';
    pdfBtn.classList.add('btn', 'btn-pdf');
    pdfBtn.addEventListener('click', ()=>{
      const obj = {
        id: note.id,
        id_client: note.id_client,
        client_name: note.client_name,
        total: note.total,
        date: note.date
      }
      window.pywebview.api.pdf.make_note(obj)
    })

    td6.append(editBtn, deleteBtn, pdfBtn);
    tr.append(td1, td2, td3, td4, td5, td6);
    table.innerHTML='';
    table.appendChild(tr);
  })

}

async function search_note(id){
  const table = document.getElementById('noteTable');
  const notes = await window.pywebview.api.search.search_notes_by_id(id);
  if(!notes){
    return alert('Não há nota com esse numero')
  }
  notes.forEach(note =>{
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.innerText = note.id;
    const td2 = document.createElement('td');
    td2.innerText = note.id_client;
    const td3 = document.createElement('td');
    td3.innerText = note.client_name;
    const td4 = document.createElement('td');
    td4.innerText = note.total.toFixed(2);
    const td5 = document.createElement('td');
    td5.innerText = note.date;
    const td6 = document.createElement('td');

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "🗑️ Excluir";
    deleteBtn.classList.add("btn", "btn-delete");
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Tem certeza que deseja excluir a nota? "${note.id}"?`)) {
        window.pywebview.api.deletor.delete_note(note.id).then(response =>{
          alert(response)
        }).catch(err =>{
          console.error('Erro ao excluir nota',err)
        })
        load_all_notes(); 
      }
    });
    const pdfBtn = document.createElement('button');
    pdfBtn.innerText = 'PDF';
    pdfBtn.classList.add('btn', 'btn-pdf');
    pdfBtn.addEventListener('click', ()=>{
      const obj = {
        id: note.id,
        id_client: note.id_client,
        client_name: note.client_name,
        total: note.total,
        date: note.date
      }
      window.pywebview.api.pdf.make_note(obj)
    })

    td6.append(deleteBtn, pdfBtn);
    tr.append(td1, td2, td3, td4, td5, td6);
    table.innerHTML='';
    table.appendChild(tr);
  })
}