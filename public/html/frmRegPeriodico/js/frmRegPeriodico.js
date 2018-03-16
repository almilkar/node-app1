/*
*	function cuantasOcurrenciasHay(cadena, letra)
*	cadena:  cadena de texto a analizar
*	letra:   letra que se contabiliza
*
*	Contabiliza el numero de apariciones de un caracter en una cadena
*
*/
	function cuantasOcurrenciasHay(cadena, letra) {
		cuenta = 0;
		posicion = cadena.indexOf(letra);
		while ( posicion != -1 ) {
   			cuenta++;
   			posicion = cadena.indexOf(letra, posicion+1);
		}
		return cuenta;
	}

/*
*	alEnviarRegistro()
*	
*	Valida los campos antes de realizar el envío del formulario
*/
	function alEnviarRegistro() {
	    var respuesta = true;
	    
	    var email = document.getElementById("email").value;
	    var alias = document.getElementById("alias").value;
	    var password = document.getElementById("password").value;
	    var repassword = document.getElementById("repassword").value;
	    var respuesta = document.getElementById("respuesta").value;

	    if (validarEmail(email, "msjEmail", true) == false) return false;
	    if (validarAlias(alias, "msjAlias", true) == false) return false;
	    if (validarPassword(password, "msjPassword", true) == false) return false;
	    if (validarRepassword(repassword, "msjRepassword", true) == false) return false;
	    if (validarRespuesta(respuesta, "msjRespuesta", true) == false) return false;

	    return respuesta;
	  }

/*
*	function validarEmail(valor, msj, esSummit)
*		valor:  cadena dirección email
*		msj:    mensaje de validación
*	Retorno: booleano, válido (true), no válido (false) 
*
*	Valida dirección de email
*/
	function validarEmail(valor, msj, esSummit) {
		var res = false;
		valor = valor.trim();
		longitud = valor.length;

		if (esSummit == false) {
			if (longitud == 0) {
				return true;
			}
		}

		if (longitud >= 5) {
			if (cuantasOcurrenciasHay(valor,".")>1) {
				document.getElementById(msj).textContent = "Aviso formato e-mail: x@y.z"
				return false;
			}
			if (cuantasOcurrenciasHay(valor,"@")>1) {
				document.getElementById(msj).textContent = "Aviso formato e-mail: x@y.z"
				return false;
			}
			var posArroba = valor.indexOf("@");
			var posPunto = valor.indexOf(".");
			if ((posPunto - posArroba >= 2) && (posPunto <= longitud - 2) && (posArroba > 0)) {
				res = true;
				document.getElementById(msj).textContent = ""
			} else {
				res = false;
				document.getElementById(msj).textContent = "Aviso formato e-mail: x@y.z"
			}
		} else {
			res = false;
			document.getElementById(msj).textContent = "Aviso formato e-mail: x@y.z"
		}
		return res;	
	}

/*
*	function validarEmail(valor, msj, esSummit)
*		valor:  cadena dirección email
*		msj:    mensaje de validación
*	Retorno: booleano, válido (true), no válido (false) 
*
*	Valida dirección de email
*/
	function validarAlias(valor, msj, esSummit) {
		var res = false;
		var cadena = valor.trim();
		var longitud = cadena.length;

		if (esSummit == false) {
			if (longitud == 0) {
				return true;
			}
		}
		if (longitud > 0) {
			res = true;
			document.getElementById(msj).textContent = "";
		} else {
			res = false;
			document.getElementById(msj).textContent = "Aviso: Es necesario indicar un alias. Gracias";
		}
		return res;
	}

/*
*	function validarPassword(valor, msj, esSummit)
*		valor:  cadena password
*		msj:    mensaje de validación
*	Retorno: booleano, válido (true), no válido (false) 
*
*	Valida password
*/
	function validarPassword(valor, msj, esSummit) {
		var res = false;
		var cadena = valor.trim();
		var longitud = cadena.length;

		if (esSummit == false) {
			if (longitud == 0) {
				return true;
			}
		}
		if (longitud > 0) {
			res = true;
			document.getElementById(msj).textContent = "";
		} else {
			res = false;
			document.getElementById(msj).textContent = "Aviso: Es necesario indicar contraseña. Gracias";
		}
		return res;
	}

/*
*	function validarRepassword(valor, msj, esSummit)
*		valor:  cadena repetir password
*		msj:    mensaje de validación
*	Retorno: booleano, válido (true), no válido (false) 
*
*	Valida repite password
*/
	function validarRepassword(valor, msj, esSummit) {
		var res = false;

		var password = document.getElementById("password").value.trim();
		var repassword = document.getElementById("repassword").value.trim();

		if (password.length > 0 && password == repassword) {
			res = true;
			document.getElementById(msj).textContent = "";
		} else {
			res = false;
			document.getElementById(msj).textContent = "No coinciden los valores de contraseña";
		}

		return res;	
	}

/*
*	function validarPreguntas()
*
*	Retorno: booleano, válido (true), no válido (false) 
*
*	Si el elemento "preguntas" es mayor que cero se habilita el botón emitir
*/
	function validarPreguntas() {
		var res = false;
		var opt = document.getElementById("preguntas").value;
		if (opt > 0) {
			document.getElementById("emitir").removeAttribute('disabled');
			res = true;
		} else {
			document.getElementById("emitir").setAttribute('disabled','disabled');
			res = false;
		}
		return res;	
	}

/*
*	function validarRespuesta(valor, msj, esSummit)
*		valor:  respuesta
*		msj:    mensaje de validación
*	Retorno: booleano, válido (true), no válido (false) 
*
*	Valida respuesta a la pregunta de paso
*/
	function validarRespuesta(valor, msj, esSummit) {
		var res = false;
		var cadena = valor.trim();
		var longitud = cadena.length;

		if (esSummit == false) {
			if (longitud == 0) {
				return true;
			}
		}
		if (longitud > 0) {
			res = true;
			document.getElementById(msj).textContent = "";
		} else {
			res = false;
			document.getElementById(msj).textContent = "Aviso: Es necesario contestar la pregunta. Gracias";
		}
		return res;	
	}

