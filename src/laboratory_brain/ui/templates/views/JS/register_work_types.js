document.getElementById("work_type_submit").addEventListener("click", () =>{
    const description = document.getElementById("description").value
    const work_type_obj = {description: description};

    console.log(work_type_obj);
})