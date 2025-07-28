export function configurarEventosPrices() {
  const btn = document.getElementById("new_price");
  if (btn) {
    btn.addEventListener("click", () => {
      window.pywebview.api.windows.register_modal('register_prices.html');
    });
  }
}

export function load_select_clients() {
    
    const select = document.getElementById("prices_client").addEventListener('DOMContentLoaded' , () =>{
      window.pywebview.api.search.select_clients().then(clientes => {
    
        clientes.forEach(cliente => {
        const option = document.createElement("option");
        option.value = cliente.id;
        option.textContent = cliente.name;
        select.appendChild(option);
    });
    }).catch(error => {
      console.error("Erro ao carregar clientes:", error);
    });
    })
    
}