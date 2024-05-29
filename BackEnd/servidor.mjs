import http from 'node:http';
import {gestionarProductosJson, gestionarProductoId, agregarProducto, eliminarProducto, actualizarProducto, gestionarPreFlight} from './funciones.mjs'
const PUERTO = 3000;
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
            respuesta.setHeader('Content-Type', 'text/plain')
            respuesta.end("No se encontro la URL")
        }
    }else if(METODO === 'PUT'){
        if(URL.match('/productos')){
            actualizarProducto(peticion, respuesta)
        }
        
    }else if (METODO === 'DELETE'){
        if(URL.match('/productos')){
            eliminarProducto(peticion, respuesta);
        }else{
            respuesta.statusCode=404;
            respuesta.setHeader('Content-Type', 'text/plain')
            respuesta.end("No se encontro la URL")
        }
    }else if(METODO === 'OPTIONS'){
        if(URL.match('/productos')){
            gestionarPreFlight(respuesta);
        }else{
            respuesta.statusCode=404;
            respuesta.setHeader('Content-Type', 'text/plain')
            respuesta.end("No se encontro la URL")
        }
    }
    else{
        respuesta.statusCode=404;
        respuesta.setHeader('Content-Type', 'text/plain')
        respuesta.end("Error en el metodo")
    }
})

servidor.listen(PUERTO)
