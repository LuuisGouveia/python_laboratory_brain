export function configurarEventosNotes() {
  
  load_select_clients()
  load_all_notes()
  const btn = document.getElementById("new_note");
  if (btn) {
    btn.addEventListener("click", () => {
      register_note();
    });
  }
  const btnPaid = document.getElementById("new_paid");
  if (btnPaid) {
    btnPaid.addEventListener("click", () => {
      register_paid();
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
  table.innerHTML='';
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
          table.innerHTML='';
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
      table.appendChild(tr);
  })

}



async function load_notes_by_client(id_client){

  const table = document.getElementById('noteTable');
  table.innerHTML='';
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
        table.innerHTML='';
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
        table.innerHTML='';
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

async function register_note(){
  const container = document.getElementById('content_box');
  const box = document.createElement('div');
  box.classList.add('modal_edit');
  box.innerHTML = `
        <div id="note_form">
            <select name="note_client" id="register_select">
                <option value="">Selecione o Cliente</option>
            </select>
            <input type="number" id="desconto" placeholder="Digite o desconto">
            <button type="button" class="btn" id="note_submit">Fechar Nota</button>
            <button type="button" class="btn" id="note_cancel">Cancelar</button>
        </div>
        <div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>ID Cliente</th>
                    <th>Cliente</th>
                    <th>Dentista</th>
                    <th>Paciente</th>
                    <th>ID Tipo</th>
                    <th>Tipo de Trabalho</th>
                    <th>Nº do Dente</th>
                    <th>Quantidade</th>
                    <th>Valor Unitário</th>
                    <th>Valor Total</th>
                    <th>Data</th>
                    <th>Cobrança</th>
                    <th>Configurações</th>
                </tr>
                <tbody id="register_notes_table">

                </tbody>
            </table>
            
        </div>
    
  `
  container.appendChild(box)
  const clients = await window.pywebview.api.search.search_all_clients();
  console.log(clients);
  const select = document.getElementById('register_select');

  clients.forEach(client => {
    const option = document.createElement('option');
    option.value = client.id;
    option.text = client.name;
    select.appendChild(option);
  });


  select.addEventListener("change", async () => {
    const clientId = select.value;
    const clientName = select.options[select.selectedIndex].text;

    const notesTable = document.getElementById('register_notes_table');
    notesTable.innerHTML = ""; 

    let currentWorks = await window.pywebview.api.search.search_works_by_client(clientId);

    currentWorks.forEach(work => {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${work.id}</td>
          <td>${work.id_client}</td>
          <td>${work.client_name}</td>
          <td>${work.dentist}</td>
          <td>${work.pacient}</td>
          <td>${work.work_type_id}</td>
          <td>${work.work_description}</td>
          <td>${work.tooth || ""}</td>
          <td>${work.quantity}</td>
          <td>${work.unit_price.toFixed(2)}</td>
          <td>${work.total_price.toFixed(2)}</td>
          <td>${work.date}</td>
          <td>${work.charged}</td>
          <td><button class="btn-remove">Remover</button></td>
      `;

      row.querySelector(".btn-remove").addEventListener("click", () => {
        row.remove();
        currentWorks = currentWorks.filter(w => w.id !== work.id);
      });

      notesTable.appendChild(row);
    });

    let total = currentWorks.reduce((sum, w) => sum + w.total_price, 0);
    const desconto = parseFloat(document.getElementById('desconto').value) || 0;
    if (desconto > 0) {
      total -= desconto;
    }


    

    document.getElementById('note_submit').onclick = () => {
      const note = {
      data: 'note',
      id_client: clientId,
      client_name: clientName,
      works: currentWorks,
      total: total,
      date: new Date().toISOString().split("T")[0]
      };
      window.pywebview.api.register.register(note).then(response => {
        alert(response);
        box.remove();
      }).catch(err => {
        alert('Erro ao salvar nota', err);
      });
    };
    document.getElementById('note_cancel').onclick = () => {box.remove()};
  });

}

async function register_paid(){
  const container = document.getElementById('content_box');
  const box = document.createElement('div');
  box.classList.add('modal_edit');
  box.innerHTML = `
        <div id="note_form">
            <select name="note_paid" id="note_paid">
                <option value="">Selecione a nota</option>
            </select>
            <button type="button" class="btn" id="paid_submit">Registrar Pagamento</button>
            <button type="button" class="btn" id="paid_cancel">Cancelar</button>
        </div>
        <div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>ID Cliente</th>
                    <th>Cliente</th>
                    <th>Dentista</th>
                    <th>Paciente</th>
                    <th>ID Tipo</th>
                    <th>Tipo de Trabalho</th>
                    <th>Nº do Dente</th>
                    <th>Quantidade</th>
                    <th>Valor Unitário</th>
                    <th>Valor Total</th>
                    <th>Data</th>
                    <th>Cobrança</th>
                    <th>Configurações</th>
                </tr>
                <tbody id="register_paid_table">

                </tbody>
            </table>
            
        </div>
    
  `
  container.appendChild(box)
  load_select_notes();
  document.getElementById('paid_submit').addEventListener('click', () => {
    make_paid();
    box.remove();
  });
  document.getElementById('paid_cancel').onclick = () => {box.remove()};
}

async function load_select_notes(){
    const select = document.getElementById('note_paid');
    const notes = await window.pywebview.api.search.search_all_notes();
    console.log(notes)
    notes.forEach(note => {
        const option = document.createElement('option');
        option.value = note.id;
        option.text = note.id;
        select.appendChild(option);
    })
    select.addEventListener('change', ()=>{
        load_works(select.value);
    })
}

let currentWorks = [];


async function load_works(id_note){
    const paidTable = document.getElementById('register_paid_table')
    paidTable.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

        currentWorks = await window.pywebview.api.search.search_work_in_notes(id_note);

        currentWorks.forEach(work => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${work.id}</td>
                <td>${work.id_client}</td>
                <td>${work.client_name}</td>
                <td>${work.dentist}</td>
                <td>${work.pacient}</td>
                <td>${work.work_type_id}</td>
                <td>${work.work_description}</td>
                <td>${work.tooth || ""}</td>
                <td>${work.quantity}</td>
                <td>${work.unit_price.toFixed(2)}</td>
                <td>${work.total_price.toFixed(2)}</td>
                <td>${work.date}</td>
                <td>${work.charged}</td>
                <td><button class="btn-remove">Remover</button></td>
            `;

            // evento para remover a linha da tabela e do array
            row.querySelector(".btn-remove").addEventListener("click", () => {
                row.remove();
                currentWorks = currentWorks.filter(w => w.id !== work.id);
            });
            paidTable.innerHTML = '';
            paidTable.appendChild(row);});
}

async function make_paid(){
    try {
        await Promise.all(
            currentWorks.map(work => window.pywebview.api.edit.edit_charged(work.id))
        );
        alert("Pagamentos registrados com sucesso!");
    } catch (err) {
        console.error("Erro ao registrar pagamentos", err);
        alert("Ocorreu um erro ao registrar os pagamentos.");
    }
}