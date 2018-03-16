var express = require('express');
var router = express.Router();


// route -> /hospital

router.get('/', function(req, res,) {
  	res.send('Rutas hospital /');
});

router.get('/registro', function(req, res, next) { 
	var solicitudAltaHospital = "Hola solicitud de alta del hospital";  //req.body; 
   	//clase.convocatoria = req.params.convocatoria;
  	//res.render('altaHospitalRealizada', solicitudAltaHospital);
  	res.send(solicitudAltaHospital);
});

module.exports = router;