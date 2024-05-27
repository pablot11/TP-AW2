const formulario = document.getElementById('contenedor')

const productosJson = async()=>{
    const datos = await fetch("http://localhost:3000/productos"); 
    const productos = await datos.json();
    let html = '';
    productos.productos.forEach((producto)=>{
        html+= `
            <article>
                <h2>${producto.nombre}</h2>
                <br>
                <a href="administrar.html?=${producto.id}">Administrar</a>
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




