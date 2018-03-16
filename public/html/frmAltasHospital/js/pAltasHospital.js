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
  function numeroDolencias() {
    var numDolencias = 0;
    var x = document.getElementsByName("nDolenciasCHK");
    for (var i = 0; i < x.length; i++) {
      if (x[i].type == "checkbox") {
        if (x[i].checked == true) {
          ++numDolencias;
        }
      }
    }
    return numDolencias;
  }

  function resetDolencias() {
    var x = document.getElementsByName("nDolenciasCHK");
    for (var i = 0; i < x.length; i++) {
      if (x[i].type == "checkbox") {
        var id = x[i].id;
        document.getElementById(id).checked = false;
        document.getElementById(id).removeAttribute('checked');
      }
    }
    document.getElementById("idnumSS").focus;
  }
/////////////////////////////////////////////////////////////////////////
  function actualizaDiasIngresado(nss) {
    var numDias = 0;
    var cp = validaNumSS(nss); 
    if (cp > 0) {
      numDolencias = numeroDolencias();
      if (numDolencias > 0) {
        if (cp == 24) {
          document.getElementById("idDias").value = numDolencias * 2 + 1;
          document.getElementById("msjidDias").textContent = "";
        } else {
           document.getElementById("idDias").value = numDolencias * 2;
           document.getElementById("msjidDias").textContent = "";
        }
      } else {
        document.getElementById("idDias").value = 0;
        document.getElementById("msjidDias").textContent = "Aviso: Debe indicar alguna dolencia";
      }
    } else {
      document.getElementById("idDias").value = 0;
      document.getElementById("msjidDias").textContent = "Aviso (NSS): Sin un NSS válido no es posible calcular días";
    }
  }
  //////////////////////////////////////////////////////////////////////////

  function compruebaDias(numDias) {
    var respuesta = false;

    if (numDias == 0) {
      document.getElementById("msjidDias").textContent = "Error: No ha indicado dolencias";
      respuesta = false;
    } else {
      document.getElementById("msjidDias").textContent = "";
      respuesta = true;
    }
    return respuesta;
  }

  ///////////////////////////////////////////////////////////////////////
  function alEnviarAlta() {
    var respuesta = false;
    var dias = document.getElementById("idDias").value;
    respuesta = compruebaDias(dias);
    return respuesta;
  }


//////////////////////////////////////////////////////////////////////////

  function paginaCargada() {
    ponerFechaActual();
  }

  function validaNombre(nombre, origen) {
    var respuesta = true;
    if (nombre != "") {
      if (nombre.length<=1) {
        document.getElementById("msj" + origen).textContent = "Error (nombre/apellidos): Mínimo dos caracteres";
        respuesta = false;
      } else {
        document.getElementById("msj" + origen).textContent = "";
        respuesta = true; 
      }
    } else {
      document.getElementById("msj" + origen).textContent = "";
      respuesta = true;
    }
    return respuesta;
  }
//////////////////////////////////////////////////////////////////////////////////////////////
  function validaNumDNI(dni, origen) {
    var respuesta = true;
    dni = dni.toString().trim();
    if (dni != "") {
      if (dni.length<8 || dni.length>10) {
        document.getElementById("msj" + origen).textContent = "Error (DNI): Mínimo 8, máximo 10 caracteres";
        respuesta = false;
      } else {
        var letra = dni.charAt(dni.length - 1);
        //var letras = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
        var letras = "TRWAGMYFPDXBNJZSQVHLCKET";
        letra = letra.toUpperCase();
        if (letras.indexOf(letra) == -1) {
          document.getElementById("msj" + origen).textContent = "Error (DNI): Falta la letra al final o no es válida";
          respuesta = false;
        } else {
          var numero = dni.substring(0, dni.length-1);
          numero = parseInt(numero);
          if (typeof(numero) == 'number') {
            document.getElementById("msj" + origen).textContent = "";
            respuesta = true; 
          } else {
            document.getElementById("msj" + origen).textContent = "Error (DNI): Formato no válido";
            respuesta = false;
          }
        }
      }
    } else {
      document.getElementById("msj" + origen).textContent = "";
      respuesta = true;
    }
    return respuesta;
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  function validaNumSS(nss) {
    var origen = "idnumSS";
    var codnumprov = 0;
    if (nss === undefined) {
      document.getElementById("msj" + origen).textContent = "";
      return codnumprov;
    }
    nss = nss.toString().trim();
    if (nss == "") {
      document.getElementById("msj" + origen).textContent = "";
      resetDolencias();
    } else {
      if (Number.isNaN(nss) === true) {
        document.getElementById("msj" + origen).textContent = "Error (SS): Debe tener 12 caracteres numéricos";
        resetDolencias();
      } else {
        if (nss.length != 12) {
          document.getElementById("msj" + origen).textContent = "Error (SS): Debe tener 12 caracteres numéricos";
          resetDolencias();
        } else {
          var codprov = nss.substring(0,2);
          codnumprov = parseInt(codprov);
          if (codnumprov > 52 || codnumprov < 1) {
            document.getElementById("msj" + origen).textContent = "Error (CP): Un código de provincia válido está entre 01 y 52";
            resetDolencias();
          } else {
            document.getElementById("msj" + origen).textContent = "";
          }
        }
      } 
    }
    return codnumprov;
  }

///////////////////////////////////////////////////////////////////////

function testP1() {

  document.getElementById("idnombre").value = "Alfredo";
  document.getElementById("idapellido1").value = "Martínez";
  document.getElementById("idapellido2").value = "López";
  document.getElementById("idnumDNI").value = "44123123K";
  document.getElementById("idnumSS").value = "241231231230";
  ponerFechaActual();
  
  document.getElementById("idnumSS").focus;
  document.getElementById("idnombre").focus;
  
  document.getElementById('msjidnombre').textContent = "";
  document.getElementById('msjidapellido1').textContent = "";
  document.getElementById('msjidapellido2').textContent =  "";
  document.getElementById('msjidnumDNI').textContent = "";
  document.getElementById('msjidnumSS').textContent = "";
  document.getElementById("msjidDias").textContent = "";

}
///////////////////////////////////////////////////////////////////////
function ponerFechaActual() {
  dd = new Date();
  document.getElementById("idfecha").value = miliseg70aISO(dd.getTime(),"-");
  document.getElementById("idhora").value = miliseg70aHoraMin(dd.getTime(),":");
}
//////////////////////////////////////////////////////////////////////
function resetForm() {
  document.getElementById('msjidnombre').textContent = "";
  document.getElementById('msjidapellido1').textContent = "";
  document.getElementById('msjidapellido2').textContent =  "";
  document.getElementById('msjidnumDNI').textContent = "";
  document.getElementById('msjidnumSS').textContent = "";
  document.getElementById("msjidDias").textContent = "";
  document.getElementById('frmAltas').reset();
  ponerFechaActual();
}
///////////////////////////////////////////////////////////////////////

