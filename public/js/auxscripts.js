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
  function miliseg70aHoraMinSeg(milisegundos70, sepHora) {
    var d = new Date(milisegundos70);
    var cad = [d.getHours(), sepHora,
    ("" + (d.getMinutes() + 100) + "").substring(1,3),
    sepHora,
    ("" + (d.getSeconds() + 100) + "").substring(1,3)];
    return cad.join("");
  }
  function miliseg70aHoraMin(milisegundos70, sepHora) {
    var d = new Date(milisegundos70);
    var cad = [d.getHours(), sepHora,
    ("" + (d.getMinutes() + 100) + "").substring(1,3)];
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
  
