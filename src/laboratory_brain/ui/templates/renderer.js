

const content = document.getElementById("content");

const works_btn = document.getElementById("works");
works_btn.addEventListener("click", ()=>{
  load_content("./views/tables/works.html");
})

const clients_btn = document.getElementById("clients");
clients_btn.addEventListener("click", ()=>{
  load_content("./views/tables/clients.html");
})

const prices_btn = document.getElementById("prices");
prices_btn.addEventListener("click", ()=>{
  load_content("./views/tables/prices.html");
})

const notes_btn = document.getElementById("notes");
notes_btn.addEventListener("click", ()=>{
  load_content("./views/tables/notes.html");
})

const work_types_btn = document.getElementById("work_types");
work_types_btn.addEventListener("click", () => {
  load_content("./views/tables/work_types.html");
})


function load_content(html_path){
  fetch(html_path)
    .then(response => {
      if (!response.ok){
        throw new Error("Erro ao carregar a pagina" + response.status);
      }
      return response.text();
    })
    .then(html => {
      content.innerHTML=html;
    })
    .catch(error => {
      console.log(error);
      content.innerHTML='<p>Erro ao carregar a pagina!</p>';
    });
}
