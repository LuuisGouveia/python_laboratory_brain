window.addEventListener('pywebviewready', () => {
    load_select_clients();

    const saveBtn = document.getElementById('dentist_submit');
    if (saveBtn) {
        saveBtn.addEventListener('click', buildDentistObject);
    }
});


async function load_select_clients() {
    const select = document.getElementById('client_select');
    
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
}


function buildDentistObject() {
    const clientSelect = document.getElementById('client_select');
    const dentistName = document.getElementById('dentist_name').value;
    const dentistFone = document.getElementById('dentist_fone').value;

    const dentistData = {
        data: 'dentist',
        id_client: clientSelect.value,
        name: dentistName,
        phone: dentistFone
    };

    console.log(dentistData);
    window.pywebview.api.register.register(dentistData).then(response => {
        alert(response);
    }).catch(err =>{
        console.error('Erro:', err)
    });
    
}
