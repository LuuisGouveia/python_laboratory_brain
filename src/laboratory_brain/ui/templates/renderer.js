

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

  if (html_path.includes('work_types.html')) {
    const work_type_Btn = document.getElementById("new_work_type");
    if (work_type_Btn) {
      work_type_Btn.addEventListener("click", () => {
        window.pywebview.api.windows.register_work_types_modal();
      });
    }
  }

  if (html_path.includes('prices.html')) {
    const prices_Btn = document.getElementById("new_prices");
    if (prices_Btn) {
      prices_Btn.addEventListener("click", () => {
        window.pywebview.api.windows.register_prices_modal();
      });
    }
  }

  if (html_path.includes('notes.html')) {
    const note_Btn = document.getElementById("new_note");
    if (note_Btn) {
      note_Btn.addEventListener("click", () => {
        window.pywebview.api.windows.register_notes_modal();
      });
    }
  }
  
  if (html_path.includes('works.html')) {
    const works_Btn = document.getElementById("new_work");
    if (works_Btn) {
      works_Btn.addEventListener("click", () => {
        window.pywebview.api.windows.register_works_modal();
      });
    }
  }

 
}
