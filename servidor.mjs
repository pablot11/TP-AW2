import http from 'node:http';
import {gestionarProductosJson, gestionarProductoId, agregarProducto, eliminarProducto} from './funciones.mjs'
import path from 'node:path'
const PUERTO = 3000;
const parsearJson = async()=>{
    try{
        const datosProductos = await readFile(rutaApiV1, 'utf-8')
        return JSON.parse(datosProductos) 
    }catch(err){
        console.log(err)
    }
}
parsearJson();
const servidor = http.createServer((peticion, respuesta)=>{
    const METODO = peticion.method;
    const URL = peticion.url;
    if(METODO === 'GET'){
        if(URL === '/productos'){
            gestionarProductosJson(respuesta)
        }else if(URL.match('/productos')){
            gestionarProductoId(peticion,respuesta)
        }
    }else if(METODO === 'POST'){
        if(URL === "/productos"){
            agregarProducto(peticion,respuesta);
        }else{
            respuesta.statusCode=404;
            respuesta.setHeader('Content-Type', 'application/json')
            respuesta.end("No se encontro la URL")
        }
    }else if(METODO === 'PUT'){

    }else if (METODO === 'DELETE'){
        if(URL.match('/productos')){
            eliminarProducto(peticion, respuesta);
        }else{
            respuesta.statusCode=404;
            respuesta.setHeader('Content-Type', 'application/json')
            respuesta.end("No se encontro la URL")
        }
    }else{
        respuesta.statusCode=404;
        respuesta.setHeader('Content-Type', 'text/plain')
        respuesta.end("Error en el metodo")
    }
})

servidor.listen(PUERTO)
export {parsearJson}