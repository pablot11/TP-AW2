const formulario = document.getElementById('contenedor')
const botonEliminar = document.getElementById('boton-eliminar')
const productosJson = async()=>{
    const datos = await fetch("http://localhost:3000/productos"); 
    const productos = await datos.json();
    renderizar(productos)
    
}

const renderizar = (productos)=>{
     let html = '';
    productos.productos.forEach((producto)=>{
        html+= `
            <article>
                <h2>${producto.nombre}</h2>
                <br>
                <a href="administrar.html?id=${producto.id}">Administrar</a>
                <br>
                <p>${producto.marca}</p>
                <br>
                <p>${producto.categoria}</p>
                <br>
                <p>${producto.stock}</p>
            </article>
        `
    })
    formulario.innerHTML=html;
}
productosJson()




