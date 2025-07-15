

const content = document.getElementById("content");

// Botões do menu lateral
document.getElementById("works").addEventListener("click", () => load_content("./views/tables/works.html"));
document.getElementById("clients").addEventListener("click", () => load_content("./views/tables/clients.html"));
document.getElementById("prices").addEventListener("click", () => load_content("./views/tables/prices.html"));
document.getElementById("notes").addEventListener("click", () => load_content("./views/tables/notes.html"));
document.getElementById("work_types").addEventListener("click", () => load_content("./views/tables/work_types.html"));

// Função para carregar conteúdo e configurar eventos específicos de cada página
function load_content(html_path) {
  fetch(html_path)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao carregar a página " + response.status);
      }
      return response.text();
    })
    .then(html => {
      content.innerHTML = html;
      configurar_eventos_da_pagina(html_path);
    })
    .catch(error => {
      console.log(error);
      content.innerHTML = '<p>Erro ao carregar a página!</p>';
    });
}


function configurar_eventos_da_pagina(html_path) {
  if (html_path.includes('clients.html')) {
    const btn = document.getElementById("new_client");
    if (btn) {
      btn.addEventListener("click", () => {
        window.pywebview.api.windows.register_client_modal();
      });
    }
  }

  
  if (html_path.includes('works.html')) {
    const workBtn = document.getElementById("add_work");
    if (workBtn) {
      workBtn.addEventListener("click", () => {
        console.log("Cadastrar trabalho");
        // Aqui futura chamada do PyWebview API ou modal
      });
    }
  }
  if (html_path.includes('work_types.html')) {
    const workBtn = document.getElementById("add_work");
    if (workBtn) {
      workBtn.addEventListener("click", () => {
        console.log("Cadastrar trabalho");
        // Aqui futura chamada do PyWebview API ou modal
      });
    }
  }
  if (html_path.includes('prices.html')) {
    const workBtn = document.getElementById("add_work");
    if (workBtn) {
      workBtn.addEventListener("click", () => {
        console.log("Cadastrar trabalho");
        // Aqui futura chamada do PyWebview API ou modal
      });
    }
  }
  if (html_path.includes('notes.html')) {
    const workBtn = document.getElementById("add_work");
    if (workBtn) {
      workBtn.addEventListener("click", () => {
        console.log("Cadastrar trabalho");
        // Aqui futura chamada do PyWebview API ou modal
      });
    }
  }

 
}
