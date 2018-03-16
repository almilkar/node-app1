var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/clase/:convocatoria', function(req, res, next) { 
	clase =	{ 	convocatoria: null,
				titulo: 'Aulas de Formación',
  				academia: 'Acción Laboral',
  				clase: 'Informática',
  				curso: 'Desarrollo con Tecnologías Web'
   			}
   	clase.convocatoria = req.params.convocatoria;
  	res.render('clase', clase);
});


module.exports = router;
