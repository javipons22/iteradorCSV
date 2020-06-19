// Modulos
const fs = require('fs');
const util = require('util');

// Variables funcionales
let archivoInput = 'data.json';
let archivoSalida = 'errores.json';
let atributosInvalidos = ['Animal'];
let errorLog = {};

// Funciones
const leerJSON = util.promisify(fs.readFile);

const crearArchivoErrores = util.promisify(fs.writeFile);

const objetoDesdeJSON = buffer => {
    objetoJSON = buffer.toString();
    return JSON.parse(objetoJSON);
};

const agregarErrorAlLog = (atributo, linea) => {
    errorLog[`Linea ${linea}`] = `Error: El atributo ${atributo} no es válido`;
};

const validarAtributos = objeto => {
    let lineaActual = 2;
    for (variante of objeto) {
        if (atributosInvalidos.includes(variante.ATRIBUTO)) {
            agregarErrorAlLog(variante.ATRIBUTO, lineaActual);
        }
        lineaActual++;
    }
}

const JSONDesdeObjeto = objeto => {
    let erroresJSON = JSON.stringify(objeto);
    return erroresJSON;
}

// Ejecuccion
leerJSON(archivoInput)
    .then( buffer => {
        return objetoDesdeJSON(buffer);
    })
    .then( objeto => {
        validarAtributos(objeto);
    })
    .then( () => {
        return JSONDesdeObjeto(errorLog);
    })
    .then( errorLogJSON => {
        crearArchivoErrores(archivoSalida, errorLogJSON);
    })
    .catch(error => console.log(error.message)); 