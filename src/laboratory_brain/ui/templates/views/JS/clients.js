export function configurarEventosClients() {
  const btn = document.getElementById("new_client");
  if (btn) {
    btn.addEventListener("click", () => {
      window.pywebview.api.windows.register_modal('register_client.html');
    });
  }

 
}
