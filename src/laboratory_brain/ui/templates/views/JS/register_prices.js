
window.addEventListener('pywebviewready', () => {
    load_select_clients();
});

async function load_select_clients() {
    const select = document.getElementById('prices_client');
    
    try {
        const clients = await window.pywebview.api.search.search_all_clients();
        console.log(clients)
        clients.forEach(client => {
            const option = document.createElement('option');
            option.textContent = client.name
            option.value = client.id
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}

async function load_select_work_types() {
    const select = document.getElementById('prices_work_type');
    
    try {
        const work_types = await window.pywebview.api.search.select_clients();
        console.log(work_types)
        work_types.forEach(type => {
            const option = document.createElement('option');
            option.textContent = type
            option.value = type
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}