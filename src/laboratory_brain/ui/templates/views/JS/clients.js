const btn = document.getElementById("new_client");
btn.addEventListener("click", () => {
    window.pywebview.api.windows.register_client_modal();
})





