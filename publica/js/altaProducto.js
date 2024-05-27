const formulario = document.getElementById('formulario')

formulario.addEventListener('submit', (e)=>{
    e.preventDefault()
    let datosFormulario = new FormData(formulario);
    datosDelForm = datosFormulario.entries();
    datosDelForm.forEach((asd)=>{
        console.log(asd)
    })

})