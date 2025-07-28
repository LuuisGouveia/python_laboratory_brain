export function configurarEventosClients() {
  const btn = document.getElementById("new_client");
  if (btn) {
    btn.addEventListener("click", () => {
      window.pywebview.api.windows.register_modal('register_client.html');
    });
  }

}

export async function load_all_clients() {
  const clients = await window.pywebview.api.search.search_all_clients(); 
  console.log(clients);
}

