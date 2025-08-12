
window.addEventListener('pywebviewready', () => {
    load_select_clients();
    load_select_work_types();

    const saveBtn = document.getElementById('prices_submit');
    if (saveBtn) {
        saveBtn.addEventListener('click', buildPriceObject);
    }
});

async function load_select_clients() {
    const select = document.getElementById('prices_client');
    
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

async function load_select_work_types() {
    const select = document.getElementById('prices_work_type');
    
    try {
        const work_types = await window.pywebview.api.search.search_all_work_types();
        console.log(work_types)
        work_types.forEach(type => {
            const option = document.createElement('option');
            option.textContent = type.description;
            option.value = type.id;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar tipos de trabalho:", error);
    }
}

function buildPriceObject() {
    const clientSelect = document.getElementById('prices_client');
    const workTypeSelect = document.getElementById('prices_work_type');
    const priceInput = document.getElementById('prices_unit');

    const priceData = {
        data: 'prices',
        id_client: clientSelect.value,
        client_name: clientSelect.options[clientSelect.selectedIndex].text,
        work_type_id: workTypeSelect.value,
        work_type_description: workTypeSelect.options[workTypeSelect.selectedIndex].text,
        unit_price: priceInput.value
    };

    console.log(priceData);
    window.pywebview.api.register.register(priceData).then(response => {
        alert(response);
    }).catch(err =>{
        console.error('Erro:', err)
    });
    
}
