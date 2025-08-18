window.addEventListener('pywebviewready', ()=> {
    load_select_clients();

})

async function load_select_clients() {
    const select = document.getElementById('note_client');
    
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