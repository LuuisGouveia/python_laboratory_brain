export function configurarEventosWorkTypes() {
  const btn = document.getElementById("new_work_type");
  if (btn) {
    btn.addEventListener("click", () => {
      window.pywebview.api.windows.register_modal('register_work_types.html');
    });
  }

 
}