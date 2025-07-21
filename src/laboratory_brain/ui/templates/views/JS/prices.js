export function configurarEventosPrices() {
  const btn = document.getElementById("new_client");
  if (btn) {
    btn.addEventListener("click", () => {
      window.pywebview.api.windows.register_client_modal();
    });
  }

 
}