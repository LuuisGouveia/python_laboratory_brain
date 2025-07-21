import { configurarEventosClients } from './views/JS/clients.js';
import { configurarEventosWorks } from './views/JS/works.js';
import { configurarEventosPrices } from './views/JS/prices.js';
import { configurarEventosNotes } from './views/JS/notes.js';
import { configurarEventosWorkTypes } from './views/JS/work_types.js';

const content = document.getElementById("content");

document.getElementById("works").addEventListener("click", () => load_content("./views/tables/works.html"));
document.getElementById("clients").addEventListener("click", () => load_content("./views/tables/clients.html"));
document.getElementById("prices").addEventListener("click", () => load_content("./views/tables/prices.html"));
document.getElementById("notes").addEventListener("click", () => load_content("./views/tables/notes.html"));
document.getElementById("work_types").addEventListener("click", () => load_content("./views/tables/work_types.html"));

function load_content(html_path) {
  fetch(html_path)
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar a página " + response.status);
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
  if (html_path.includes('clients.html')) configurarEventosClients();
  if (html_path.includes('works.html')) configurarEventosWorks();
  if (html_path.includes('prices.html')) configurarEventosPrices();
  if (html_path.includes('notes.html')) configurarEventosNotes();
  if (html_path.includes('work_types.html')) configurarEventosWorkTypes();
}
