let fs = require('fs');

// Seteamos un array de atributos invalidos para chequear en el loop
let invalidos = ['Animal'];

// El objeto error Log será lo que contenera los errores y despues sera guardado como JSON
let errorLog = {};

fs.readFile('data.json', (err, data) => {

    // Chequeamos error y terminamos la funcion si hay uno
    if (err) throw err;

    // Obtenemos los datos del archivo en forma de buffer y lo convertimos en string
    // A ese string lo convertimos en objeto javascript con JSON.parse
    let variantesObject = JSON.parse(data.toString());

    // Definimos el numero de la primera linea para mostrar en el loop
    let i = 2;

    for (variante of variantesObject) {
        if (invalidos.includes(variante.ATRIBUTO)) {
            errorLog[`Linea ${i}`] = `Error: El atributo ${variante.ATRIBUTO} no es válido`;
        }
        i++;
    }

    let archivoErrores = JSON.stringify(errorLog);

    fs.writeFile('errores.json', archivoErrores, (err) => {
        if (err) throw err;
        console.log('El archivo de errores fue guardado');
    });

});




