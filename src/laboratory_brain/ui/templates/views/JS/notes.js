export function configurarEventosNotes() {
  const btn = document.getElementById("new_note");
  if (btn) {
    btn.addEventListener("click", () => {
      window.pywebview.api.windows.register_modal('register_notes.html');
    });
  }

 
}