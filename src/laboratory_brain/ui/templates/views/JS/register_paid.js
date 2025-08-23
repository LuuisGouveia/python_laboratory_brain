window.addEventListener('pywebviewready', ()=>{
    load_select_notes()
    const btn = document.getElementById('paid_submit')
    btn.addEventListener('click', ()=>{
        register_paid();
    })
})

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

            paidTable.appendChild(row);});
}

async function register_paid(){
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