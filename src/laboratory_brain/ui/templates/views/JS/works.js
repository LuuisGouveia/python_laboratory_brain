export function configurarEventosWorks() {
  const btn = document.getElementById("new_work");
  if (btn) {
    btn.addEventListener("click", () => {
      window.pywebview.api.windows.register_modal('register_work.html');
    });
  }

 
}