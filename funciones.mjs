import {parse, join} from 'node:path';
import {readFile, writeFile} from 'node:fs/promises';
let productosObjeto;
const rutaApiV1 = join('api', 'v1' ,'productos.json')
const parsearJson = async()=>{
    try{
        const datosProductos = await readFile(rutaApiV1, 'utf-8')
        productosObjeto = JSON.parse(datosProductos) 
    }catch(err){
        console.log(err)
    }
}
parsearJson();


const gestionarProductosJson = async(respuesta)=>{
    
    try{
        respuesta.statusCode=200;
        respuesta.setHeader('Content-Type', 'application/json')
        respuesta.end(JSON.stringify(productosObjeto))
    }catch(err){
        respuesta.statusCode=404;
        respuesta.setHeader('Content-Type', 'text/plain')
        respuesta.end("Recurso no encontrado")
        console.error(err)
    }
}

const gestionarProductoId = (peticion,respuesta)=>{
    const id = parse(peticion.url).base
    const producto = productosObjeto.productos.find((producto)=>{
        return Number(producto.id) === Number(id)
    })
    if(producto){
        const respuestaProducto = JSON.stringify(producto)
        respuesta.statusCode=200;
        respuesta.setHeader('Content-Type', 'application/json')
        respuesta.end(respuestaProducto)
    }else{
        respuesta.statusCode=404;
        respuesta.setHeader('Content-Type', 'application/json')
        respuesta.end("No se encontro el recurso en el JSON")
    }
} 

const agregarProducto = (peticion, respuesta)=>{
    let datosProducto = '';
    peticion.on('data', (data)=>{
        datosProducto+= data
    })
    peticion.on('error',(error)=>{
        console.error(error)
        respuesta.statusCode=500;
        respuesta.setHeader('Content-Type', 'text/plain')
        respuesta.end("No se pudo agregar el producto")
    })
    peticion.on('end', async()=>{
        try{
            const nuevoProducto = JSON.parse(datosProducto)
            productosObjeto.productos.push(nuevoProducto)
            await writeFile(rutaApiV1, JSON.stringify(productosObjeto))
            respuesta.statusCode=201;
            respuesta.setHeader('Content-Type', 'text/plain')
            respuesta.end("Se creo el nuevo producto")
        }catch(err){
            console.error(err);
            respuesta.statusCode=500;
            respuesta.setHeader('Content-Type', 'text/plain')
            respuesta.end("No se pudo agregar el producto")
        }
    })
}
const eliminarProducto = async(peticion, respuesta)=>{
    const id = parse(peticion.url).base;
    productosObjeto.productos = productosObjeto.productos.filter((producto)=>{
        return Number(producto.id) !== Number(id)
    })
    try{
        await writeFile(rutaApiV1, JSON.stringify(productosObjeto));
        await parsearJson();
        respuesta.statusCode=201
        respuesta.setHeader('Content-Type', 'text/plain')
        respuesta.end("Producto eliminado correctamente");
    }catch(err){
        console.error(err);
        respuesta.statusCode=500
        respuesta.setHeader('Content-Type', 'text/plain')
        respuesta.end("Error al querer eliminar el producto");
    }


}

const actualizarProducto = (peticion, respuesta)=>{
     
    const id = parse(peticion.url).base;
    console.log(parse(peticion.url))
    const productoActualizar = productosObjeto.productos.find((producto)=>{
       
        return Number(id) === Number(producto.id)
    })
    if(productoActualizar){
        let datosProducto = '';
        peticion.on('data', (data)=>{
            datosProducto+= data
        })
        peticion.on('error',(error)=>{
            console.error(error)
            respuesta.statusCode=500;
            respuesta.setHeader('Content-Type', 'text/plain')
            respuesta.end("No se pudo agregar el producto")
        })
        peticion.on('end', async()=>{
            
            try{
                const nuevoProducto = JSON.parse(datosProducto)
                const productosActualizados = productosObjeto.productos.map((producto)=>{
                    if(Number(producto.id) === Number(id)){
                        return{
                            id: Number(id),
                            nombre: nuevoProducto.nombre,
                            marca: nuevoProducto.marca,
                            categoria: nuevoProducto.categoria,
                            stock: nuevoProducto.stock
                        }
                    }else{
                        return producto;
                    }
                })
                
                productosObjeto.productos = productosActualizados
                await writeFile(rutaApiV1, JSON.stringify(productosObjeto))
                respuesta.statusCode=201;
                respuesta.setHeader('Content-Type', 'text/plain')
                respuesta.end("Se actualizo el producto")
            }catch(err){
                console.error(err);
                respuesta.statusCode=500;
                respuesta.setHeader('Content-Type', 'text/plain')
                respuesta.end("No se pudo actualizar el producto")
            }
        })
    }
    
}





export {gestionarProductosJson, gestionarProductoId, parsearJson, agregarProducto, eliminarProducto, actualizarProducto}