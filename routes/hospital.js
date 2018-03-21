var express = require('express');
var router = express.Router();

// route -> /hospital

router.get('/', function(req, res,) {
  	res.send('Rutas hospital /');
});

// http://localhost:3000/html/frmAltasHospital/pAltasHospital.html?
router.get('/registro', function(req, res, next) { 
	var solicitudAltaHospital = "Hola solicitud de alta del hospital";  //req.body; 
   	
	var {nombre, apellido1, apellido2, numDNI, numSS, fecha, nDolenciasCHK, Dias, ultimoingreso} = req.query;

	console.log(nombre);
	console.log(apellido1);
	console.log(apellido2);
	console.log(numDNI);
	console.log(numSS);
	console.log(fecha);
	console.log(nDolenciasCHK);
	console.log(Dias);
	console.log(ultimoingreso);

  	res.send(solicitudAltaHospital);
});

router.post('/registro', function(req, res, next) { 
	var solicitudAltaHospital = "Hola solicitud de alta del hospital";  //req.body; 
   	
	var {nombre, apellido1, apellido2, numDNI, numSS, fecha, nDolenciasCHK, Dias, ultimoingreso} = req.body;

	console.log(nombre);
	console.log(apellido1);
	console.log(apellido2);
	console.log(numDNI);
	console.log(numSS);
	console.log(fecha);
	console.log(nDolenciasCHK);
	console.log(Dias);
	console.log(ultimoingreso);

  	res.send(solicitudAltaHospital);
});


module.exports = router;