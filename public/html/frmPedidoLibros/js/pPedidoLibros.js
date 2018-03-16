/* -------------------------
  * OBJETO 
  *   entregaPagos
  * TIPO
  *   json
  * DESCRIPCION
  *   Tipos de entrega y formas de pago asociadas.  
  */
var entregaPagos = {
  "Normal": [
    {"cod":"tp1","val":"Contra Rembolso"},
    {"cod":"tp2","val":"Tarjeta Crédito"},
    {"cod":"tp3","val":"Tarjeta Débito"},
    {"cod":"tp4","val":"Paypal"}]
  ,
  "Preferente": [
    {"cod":"tp2","val":"Tarjeta Crédito"},
    {"cod":"tp4","val":"Paypal"}]
  ,
  "Urgente": [
    {"cod":"tp2","val":"Tarjeta Crédito"}]
  ,
  "Personalizado": [
    {"cod":"tp2","val":"Tarjeta Crédito"}]
};

/* -------------------------
  * FUNCION
  *   function creaDD(tipoEnvioDat, iSelector)
  * PARAMETROS
  *   - tipoEnvioDat: cada uno de los nodos principales del objeto JSON "entregaPagos"
  *                   ("Norma", "Preferente", ...)
  *   - iSelector: cadena de identificador del desplegable "SELECT"
  * CONTEXTO
  *   Validación de la fecha de entrega.
  *  
  * DESCRIPCION
  *     Una vez validada la fecha de entrega se carga el desplegable con las formas de
  *     pago admitidas para cada tipo de entrega.
  *  
  */
function creaDD(tipoEnvioDat, iSelector) {
  var dd = document.getElementById(iSelector);  // dropdown
  dd.length = 0;

  var defaultOption = document.createElement('option');
  defaultOption.text = 'Elija forma de pago';

  dd.add(defaultOption);
  dd.selectedIndex = 0;

  for (var i = 0; i < tipoEnvioDat.length; i++) {
          option = document.createElement('option');
          option.text = tipoEnvioDat[i].val;
          option.value = tipoEnvioDat[i].cod;
          dd.add(option);
  }
}

/* -------------------------
  * FUNCION
  *   function salidaCantidad(numControl, valor): boolean
  * PARAMETROS
  *   numControl: identifica el checkbox con respecto al input.
  *   valor: valor del input (cantidad a pedir).
  * CONTEXTO
  *  - Función asociada al evento "onchange" de un "input type number" 
  *       que recoge las cantidades a pedir de un artículo
  * DESCRIPCION
  *  - Función: valida el valor cantidad a pedir marcando/desmarcando el checkbox asociado
  *        y presentado un mensaje cuando corresponda.
  */
  function salidaCantidad(numControl, valor) {
    var respuesta = true;
    
      if ((valor<=0) || (valor>3)) {

        var msjError = (valor < 0) ? valor + ": no es una cantidad válida" : "";

        document.getElementById('idMsj' + numControl).textContent = msjError;
        document.getElementById('iLibroCHK' + numControl ).removeAttribute('checked');
        
      } else {
        document.getElementById('idMsj' + numControl).textContent = "";
        document.getElementById('iLibroCHK' + numControl ).setAttribute('checked','checked');
      }

    
    return respuesta;
  }

 /* -------------------------
  * FUNCION
  * - function validaCHK(nombreCHK, prefijoIdInput, maxTitulos, maxUnidades): boolean
  * PARAMETROS
  * - nombreCHK: Checkbox para marcar el número de títulos a pedir, asociado al "input number" 
  *               que contiene las unidades de cada título.
  * - prefijoIdInput: Identifica el "input number"
  * - maxTitulos: límite títulos
  * - maxUnidades: límite unidades totales.
  * CONTEXTO
  *   Asociar a un proceso de validación antes de envíar el formulario
  * DESCRIPCION
  *   Recorre el array de checkbox con el nombre "nombreCHK" y determina cuantos son CHECKED 
  *   y para cada CHECKED suma las unidades de los "input" asociados por el parámetro 
  *   "prefijoIdInput". Los totales obtenidos se comparan con los máximos indicados por los
  *   parámetros "maxTitulos" y "maxUnidades". El máximo de unidades por título se indica
  *   como atributo del "input number".
  *
  */
  function validaCHK(nombreCHK, prefijoIdInput, maxTitulos, maxUnidades) {
    var respuesta = true;
    var numTitulosPedidos = 0;
    var numUnidadesPedidas = 0;
    var x = document.getElementsByName("nlibroCHK");
    for (var i = 0; i < x.length; i++) {
      if (x[i].type == "checkbox") {
        if (x[i].checked == true) {
          ++numTitulosPedidos;
          nombreElemento = prefijoIdInput + (i+1);
          numUnidadesPedidas = numUnidadesPedidas + parseInt(document.getElementById(nombreElemento).value);
          console.log(nombreElemento + ": " + document.getElementById(nombreElemento).value);
        }
      }
    }
    if (numTitulosPedidos >= maxTitulos) respuesta = false;
    if (numUnidadesPedidas >= maxUnidades) respuesta = false;
    return respuesta;
  }

  /* -------------------------
  * FUNCION
  * - function ISOaMiliseg70(fechaISO) : nº de milisegundos desde 1970
  * PARAMETROS
  * - fechaISO: cadena AAAA MM DD. Acepta los separadores del contructor "Date"
  * CONTEXTO
  *   Función auxiliar
  * DESCRIPCION
  *   
  *
  */
  function ISOaMiliseg70(fechaISO) {
    var d = new Date(fechaISO);
    return d.getTime();
  }

  /* -------------------------
  * FUNCION
  * - function diasEntreFechas(fechaM70) : nº de días entre parámetro y actual.
  * PARAMETROS
  * - fechaM70: fecha en milisegundos desde 1970
  * CONTEXTO
  *   Función auxiliar
  * DESCRIPCION
  *   Calcula los días entre la fecha del parámetro y la obtenida por la función 
  *   como actual.
  *
  */
  function diasEntreFechas(fechaM70) {
    var d = new Date();
    var miliseg70 = d.getTime();
    var difseg70 = fechaM70 - miliseg70;
    var dias = -1;
    if (difseg70 >= 0) {
      dias = Math.round(difseg70/1000/60/60/24); 
    }
    return dias;
  }

/* -------------------------
  * FUNCION
  * - function sumaDias(fechaM70, numdias) : nº de miliseg desde 1970 de la nueva
  *                                          fecha obtenida
  * PARAMETROS
  * - fechaM70: fecha en milisegundos desde 1970
  * - numdias: días a sumar a la fecha anterior
  * CONTEXTO
  *   Función auxiliar
  * DESCRIPCION
  *   Calcula la fecha que se obtiene de sumar los días "numdias" a la fecha "fechaM70"
  *   y se devuelve en milisegundos desde 1970
  *
  */
	function sumaDias(fechaM70, numdias) {
		var milis = numdias * 24 * 60 * 60 * 1000;
		return fechaM70 + milis;
	}

/* -------------------------
  * FUNCION
  * - function miliseg70aISO(milisegundos70, sepFecha)
  * PARAMETROS
  * - milisegundos70: fecha en milisegundos desde 1970
  * - sepFecha: separador
  * CONTEXTO
  *   Función auxiliar
  * DESCRIPCION
  *   Convierte la fecha milisegundos desde 1970 en formato ISO
  *
  */
	function miliseg70aISO(milisegundos70, sepFecha) {
		var d = new Date(milisegundos70);
		var cad = [d.getFullYear(), sepFecha,
		("" + (d.getMonth() + 101) + "").substring(1,3),
		sepFecha,
		("" + (d.getDate() + 100) + "").substring(1,3)];
		return cad.join("");
	}


/* -------------------------
  * FUNCION
  * - function proponeFechaEntrega(diasSobreFechaPedido): cadena nueva fecha ISO
  * PARAMETROS
  * - diasSobreFechaPedido: días a sumar a la fecha del sistema.
  * CONTEXTO
  *   Función auxiliar
  * DESCRIPCION
  *   Sobre la fecha actual suma días y presenta el resultado como Fecha ISO
  *
  */
	function proponeFechaEntrega(diasSobreFechaPedido) {
    var q = new Date();
    var actual = q.getTime();
		return cadena = miliseg70aISO(sumaDias(actual,diasSobreFechaPedido),"-");
	}


/* -------------------------
  * FUNCION
  * - function modiFechaEntrega(numOpcion, idFechaEntrega)
  * PARAMETROS
  * - numOpcion: número de elemento "radio"
  * - idFechaEntrega: identificador del "input type date" 
  * CONTEXTO
  *   "onchange" en "input type radio" selector de tipos de entrega
  * DESCRIPCION
  *   Lanza las funciones de validación y asigna fecha válida
  *
  */
  function modiFechaEntrega(numOpcion, idFechaEntrega) {
    switch (parseInt(numOpcion)) {
      case 1:     // Normal + 15 dias
        document.getElementById(idFechaEntrega).value = proponeFechaEntrega(15);
        document.getElementById(idFechaEntrega).setAttribute("readonly","readonly");
        creaDD(entregaPagos['Normal'], "iFormaPago");
        break;
      case 2:     // Preferente
        document.getElementById(idFechaEntrega).value = proponeFechaEntrega(5);
        document.getElementById(idFechaEntrega).setAttribute("readonly","readonly");
        creaDD(entregaPagos['Preferente'], "iFormaPago");
        break;
      case 3:     // Urgente
        document.getElementById(idFechaEntrega).value = proponeFechaEntrega(2);
        document.getElementById(idFechaEntrega).setAttribute("readonly","readonly");
        creaDD(entregaPagos['Urgente'], "iFormaPago");
        break;
      case 4:     // Personalizado
        // la fecha la introduce el usuario
        document.getElementById(idFechaEntrega).removeAttribute("readonly");
        creaDD(entregaPagos['Urgente'], "iFormaPago");
        break;
      default:
    }
  }

 /* ---------------------------------------------
  * FUNCTION
  * - validaFechaEntrega(): 
  * PARAMETROS
  * 
  * CONTEXTO
  *  -  A lanzar con el evento "onfocusout" desde el input type="date" que propone una fecha
  *     de entrega para el pedido. 
  * DESCRIPCION
  *  -  Existe la posibilidad de indicar cuatro tipos de entrega (Urgente, Preferente, Normal y
  *     personalizada). El sistema ajusta a uno de estos cuatro tipos cuando la fecha propuesta 
  *     es menor o igual a la que propone el sistema para el tipo "Normal" y mantiene la fecha
  *     propuesta si es mayor a esta. Para cada tipo de entrega obtenida, se carga un "select"
  *     con las formas de pago permitidas.
  */
  function validaFechaEntrega() {
    var dato = document.getElementById("idFechaEntrega").value
    var dd = new Date(dato);
    var miliseg70 = dd.getTime();
    var dias = diasEntreFechas(miliseg70)
    var diasMinimo = 2;
    
    if (dias <=2 ) {          // Urgente
        document.getElementById("idTipoEnvio3").checked = true;
        modiFechaEntrega(3, "idFechaEntrega");
        document.getElementById("idFechaEntrega").setAttribute("background", "orange");
        document.getElementById("idFechaEntrega").setAttribute("readonly","readonly");
        creaDD(entregaPagos['Urgente'], "iFormaPago");
    } else {
      if (dias <= 5) {        // Preferente
        document.getElementById("idTipoEnvio2").checked = true;
        modiFechaEntrega(2, "idFechaEntrega");
        document.getElementById("idFechaEntrega").setAttribute("background", "orange");
        document.getElementById("idFechaEntrega").setAttribute("readonly","readonly");
        creaDD(entregaPagos['Preferente'], "iFormaPago");
      } else {
        if (dias <= 15) {     // Normal + 15 dias
          document.getElementById("idTipoEnvio1").checked = true;
          modiFechaEntrega(1, "idFechaEntrega");
          document.getElementById("idFechaEntrega").setAttribute("background", "orange");
          document.getElementById("idFechaEntrega").setAttribute("readonly","readonly");
          creaDD(entregaPagos['Normal'], "iFormaPago");
        } else {
          document.getElementById("idTipoEnvio4").checked = true;
          //modiFechaEntrega(4, "idFechaEntrega");
          document.getElementById("idFechaEntrega").setAttribute("background", "orange");
          document.getElementById("idFechaEntrega").removeAttribute("readonly");
          creaDD(entregaPagos['Urgente'], "iFormaPago");
        }
      }
    }

  }


  /* -------------------------
  * FUNCION
  * - function validaCodigoPostal(cp, msjCab, msjDet): 
  * PARAMETROS
  * - cp: código postal
  * - msjCab: mensaje error, título
  * - msjDet: mensaje error, descripción
  * CONTEXTO
  *   "onblur" en "input type text" Código Postal
  * DESCRIPCION
  *   Valida el formato del Código Postal
  *
  */
  function validaCodigoPostal(cp, msjCab, msjDet) {
    var codprov;
    var codnumprov;
    var vMsjCab = document.getElementById(msjCab);
    var vMsjDet = document.getElementById(msjDet);
    
    cp = cp.toString().trim();
    if (cp == "") {
      vMsjCab.textContent = ""; vMsjDet.textContent = "";
    } else {
      if (isNaN(cp) == true) {
        vMsjCab.textContent = "Error (CP)";
        vMsjCab.textContent = "Debe tener 5 caracteres numéricos";
      } else {
        if (cp.length != 5) {
          vMsjCab.textContent = "Error (CP)";
          vMsjCab.textContent = "Debe tener 5 caracteres numéricos";
        } else {
          codprov = cp.substring(0,2);
          codnumprov = parseInt(codprov);
          if (codnumprov > 52 || codnumprov < 1) {
            vMsjCab.textContent = "Error (CP)";
            vMsjCab.textContent = "Un código de provincia válido está entre 01 y 52";
          } else {
            vMsjCab.textContent = ""; vMsjDet.textContent = "";
          }
        }
      } 
    }
    return codnumprov;
  }


  /* -------------------------
  * FUNCION
  * - function validaNIF(controlTexto, strNIF): 
  * PARAMETROS
  * - controlTexto: elemento HTML para los mensajes
  * - strNIF: cadena introducida por el usuario
  * CONTEXTO
  *   "onfocusout" en "input type text" NIF
  * DESCRIPCION
  *   Valida el formato del NIF
  *
  */
  function validaNIF(controlTexto, strNIF) {
    var parteNumerica, numero, posicion
    var letra, control, texto
    var letras = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var expr_dni = /^\d{8}[a-zA-Z]$/;
    var retorno = false
    if (expr_dni.test (strNIF) == true) {
      parteNumerica = strNIF.substr(0, dni.length - 1);
      control = strNIF.substr(dni.length - 1,1);
      posicion = parteNumerica % 23;
      letra = letras.substring(posicion,posicion + 1);
      if (letra != control.toUpperCase()) {
        retorno = false;
        texto = "La letra final no es correcta";
      } else {
        retorno = true;
      }
    } else {
      retorno = false;
      texto = "NIF no válido"
    }
    document.getElementById(controlTexto).textContent = texto;
    return retorno;
  }

	/* ---------------------------------------------------------------- */

function simulaOnChange() {
  var event = new MouseEvent('change', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  var cb = document.getElementById('iLibroCHKL1'); 
  var cancelado = !cb.dispatchEvent(event);
  if (canceledo) {
    alert("Cancelado");
  } else {
    alert("No cancelado");
  }
}

function comprobarPedido() {
    var can1, can2, can3, totcan = 0;
    var respuesta = true;
    can1 = document.getElementById("idcanL1").value;
    can2 = document.getElementById("idcanL2").value;
    can3 = document.getElementById("idcanL3").value;
    totcan = can1+can2+can3;
    if (totcan > 8) {
      alert("El pedido está limitado a 8 unidades y usted ha indicado " + totcan);
      respuesta = false
    } else {
      if (totcan <= 0) {
        alert("Pedido pendiente de asignar unidades");
        respuesta = false;
      }
    }
    return respuesta;
  }