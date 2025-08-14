export async function configurarEventosDentists() {
    load_select_clients();
     const btn = document.getElementById("new_dentist");
     if (btn) {
        btn.addEventListener("click", () => {
        window.pywebview.api.windows.register_modal('register_dentist.html');
        });
        }
}

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