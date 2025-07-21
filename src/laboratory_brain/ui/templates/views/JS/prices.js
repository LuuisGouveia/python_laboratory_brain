export function configurarEventosPrices() {
  const btn = document.getElementById("new_price");
  if (btn) {
    btn.addEventListener("click", () => {
      window.pywebview.api.windows.register_modal('register_prices.html');
    });
  }

 
}