document.getElementById("work_type_submit").addEventListener("click", () =>{
    const description = document.getElementById("description").value
    const work_type_obj = {data: 'work_type', description: description};

    console.log(work_type_obj);
    window.pywebview.api.register.register(work_type_obj).then(response => {
        alert(response);
    }).catch(err =>{
        console.error('Erro:', err)
    });
})