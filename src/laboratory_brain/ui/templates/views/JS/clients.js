const btn = document.getElementById("new_client");
btn.addEventListener("click", () => {
    alert("botao funcionando")
    window.pywebview.api.windows.register_client_modal();
})





