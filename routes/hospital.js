var express = require('express');
var router = express.Router();
var fs = require('fs');
var readline = require('readline');

// route -> /hospital

var fileDBHospital = "/dbfiles/altaHospitalDB.txt";

router.get('/', function(req, res,) {
  	res.send('Rutas hospital /');
});

router.get('/registro', function(req, res, next) { 
	var solicitudAltaHospital = "Hola solicitud de alta del hospital";  //req.body;
   	// --
	var {nombre, apellido1, apellido2, numDNI, numSS, fecha, nDolenciasCHK, Dias, ultimoingreso} = req.query;
	var uuid = crearUUID();
	var reg = uuid + "^" + nombre + "^" + apellido1 + "^" + apellido2 + "^" + numDNI + "^" + numSS + "^" + fecha + "^" + nDolenciasCHK + "^" + Dias + "^" + ultimoingreso;
	fs.appendFile(fileDBHospital, reg, function (err) {
  		if (err) throw err;
  		console.log('Agregado registro');
	});
	// --
  	res.send(solicitudAltaHospital);
});

router.post('/registro', function(req, res, next) { 
	var solicitudAltaHospital = "Hola solicitud de alta del hospital";  //req.body;
   	// --
	var {nombre, apellido1, apellido2, numDNI, numSS, fecha, nDolenciasCHK, Dias, ultimoingreso} = req.body;
	var uuid = crearUUID();
	var reg = uuid + "^" + nombre + "^" + apellido1 + "^" + apellido2 + "^" + numDNI + "^" + numSS + "^" + fecha + "^" + nDolenciasCHK + "^" + Dias + "^" + ultimoingreso;
	fs.appendFile(fileDBHospital, reg, function (err) {
  		if (err) throw err;
  		console.log('Agregado registro');
	});
	// --
  	res.send(solicitudAltaHospital);
});

////////////////////////////////    Aux Ini   /////////////////////////

function crearUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function leeNumRegistros(archivo) {

fs.open(archivo, 'rs', function(error, fd) {

	// --
	var rlinea = readline.createInterface({
	  input: fs.createReadStream(archivo);
	});

	var numlineas = 0;
	rlinea.on('line', function (linea) {
	  numlineas++;
	  console.log('Line number ' + numlineas + ': ' + linea);
	});
	// --
}

	return numlineas;
}


////////////////////////////////   Aux Fin   /////////////////////////
module.exports = router;