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
            <p>${producto.marca}</p>
            <p>${producto.categoria}</p>
            <p>${producto.stock}</p>
            <a href="administrar.html?id=${producto.id}">Administrar</a>
            <button type="submit" value="${producto.id}" class="boton-eliminar">Eliminar</button>
            </article>
        `
    })
    formulario.innerHTML=html;
    const botonEliminar = document.querySelectorAll('.boton-eliminar')
    botonEliminar.forEach((boton)=>{
        
        boton.addEventListener('click', (e)=>{
        e.preventDefault()
       eliminarProducto(e.target.value)
    })
    })
    

}

async function eliminarProducto(producto){
    const productoPeticion = fetch(`http://localhost:3000/productos/${producto}`,
    {
        method:'DELETE'

    })
    window.location.href='./'
}


productosJson()




