const url = new URL(location.href);
const idProducto = url.searchParams.get('id');
const contenedor = document.getElementById('contenedor')
const botonEliminar = document.getElementById('boton-eliminar')
async function traerProducto(idProducto){
    try{
        const pedirProducto = await fetch(`http://localhost:3000/productos/${idProducto}`)
        const producto = await pedirProducto.json();
        cargarDatosFormulario(producto)
    }catch(err){
        console.error(err);
        throw err;
    }


}

async function cargarDatosFormulario(producto){
    let html = '';
      const categorias = ['Hardware', 'Periféricos', 'Sonido'];

        let opcionesCategoria = categorias.map(categoria => {
            if (categoria !== producto.categoria) {
                return `<option value="${categoria}">${categoria}</option>`;
            }else{
                return `<option value="${categoria}" disabled selected>${categoria}</option>`;
            }
        }).join('');
    html = `
         <form action="http://localhost:3000/productos" method="POST" id="formulario">
            <label for="">Nombre</label>
            <input type="text" name="nombre" value="${producto.nombre}" >
            <br>
            <label for="">Marca</label>
            <input type="text" name="marca" value="${producto.marca}">
            <br>
            <label for="">Categoria</label>
            <select name="categoria" id="">
                ${opcionesCategoria}
            </select>
            <label for="">Stock</label>
            <input type="number" name="stock" value="${producto.stock}">
            <br>
            <button type"submit">Modificar</button>
            <br>
  
        </form>
    `

    contenedor.innerHTML=html;
    const formulario = document.getElementById('formulario')
    formulario.addEventListener('submit', async(e)=>{
        e.preventDefault();
        let datosFormulario = new FormData(formulario);
        let datosDelForm = Object.fromEntries(datosFormulario);
        const datosCuerpo = JSON.stringify(datosDelForm)
        peticionCliente(datosCuerpo);
    })

}

async function peticionCliente(datosCuerpo){
    const peticion = await fetch(`http://localhost:3000/productos/${idProducto}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                body: datosCuerpo
            }
        )

    window.location.href='/'
}



traerProducto(idProducto)

