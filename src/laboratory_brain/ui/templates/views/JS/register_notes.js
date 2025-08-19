window.addEventListener('pywebviewready', ()=> {
    load_select_clients();

    const btnNoteSubmit = document.getElementById("note_submit");
    btnNoteSubmit.addEventListener('click', ()=> {
        buildNoteObject();
    });
    

})

const notesTable = document.getElementById('register_notes_table')
let currentWorks = [];
const select = document.getElementById('note_client');

async function load_select_clients() {
    
    
    try {
        const clients = await window.pywebview.api.search.search_all_clients();
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
        notesTable.innerHTML = '';
        load_works(select.value);
    })
}



async function load_works(id_client){
    notesTable.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

        currentWorks = await window.pywebview.api.search.search_works_by_client(id_client);

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

            notesTable.appendChild(row);});
}

function buildNoteObject(){
    const clientId = select.value;
    const clientName = select.options[select.selectedIndex].text;

    const total = currentWorks.reduce((sum, w) => sum + w.total_price, 0);

    const note = {
        data: 'note',
        id_client: clientId,
        client_name: clientName,
        works: currentWorks,
        total: total,
        date: new Date().toISOString().split("T")[0]
    };

    window.pywebview.api.register.register(note).then(response =>{
        alert(response);
    }).catch(err =>{
        console.error('Erro ao salvar nota', err);
    })

}