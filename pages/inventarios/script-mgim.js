/* 
Trabajo con JQuey, arrow function Y Ajax para consumir la API REST
*/

/* Atrapo los campos de texto del front */
var id = $("#dni");
var nombre = $("#nombre");
var tarea = $("#exampleTextarea");
/* Atrapo la Tabla */
var tbody = $("#contenidoPersonas");
/* Atrapo los botones */
var guardar = $("#guardar");
var actualizar = $("#actualizar");
var buscar = $("#buscar");
var eliminar = $("#eliminar");

/* Lo primero que ejecuta al cargar la pagina */
$(document).ready(() => {
  /* Envio la tabla a la funcion */
  cargarTabla(tbody);
});
/*  */
/* EVENTO PARA GUARDAR */
/*  */
guardar.click(() => {
  /* Atrapo los datos ingresados desde el fron en las variables*/
  let idValue = id.val().trim();
  let n = nombre.val().trim();

  $.ajax({
    /* Link publicado desde el backend para guardar */
    url: "http://localhost:7070/personas",
    /* Metodo para guardar */
    type: "Post",
    /* SIEMPRE que tengo datos ingresados por teclado poner esta estructura de JSON*/
    /* En (data) almaceno todos los ingreso por teclado para actualizar */
    data: JSON.stringify({
      /* idPersona es la columna de la BD y idValue es la variable que contiene el nuevo ingreso desde el front */
      idPersona: idValue,
      nombre: n,
      /* ... */
    }),
    contentType: "application/json; charset=utf-8",
    /* Si se guarda correctamente ingresa aqui */
    success: function (data) {
      alert("Registro aregado exitosamente !!!");
      cargarTabla(tbody);
    },

    failure: function (data) {
      alert("Failure");
    },
    /* si no se guarda ingresa aqui */
    error: function (data) {
      alert("Error");
    },
  });
});
/*  */
/* EVENTO PARA ACTUALIZAR */
/*  */
actualizar.click(() => {
  /* Atrapo los nuevos datos ingresados desde el fron en las variables*/
  let idValue = id.val().trim();
  let n = nombre.val().trim();

  $.ajax({
    /* Link publicado desde el backend para actualizar */
    url: "http://localhost:7070/personas",
    /* PUT para actualizar */
    type: "Put",
    /* SIEMPRE que tengo datos ingresados por teclado poner esta estructura de JSON*/
    /* En (data) almaceno todos los ingreso por teclado para actualizar */
    data: JSON.stringify({
      /* idPersona es la columna de la BD y idValue es la variable que contiene el nuevo ingreso desde el front */
      idPersona: idValue,
      nombre: n,
      /* .... */
    }),
    /*  */
    contentType: "application/json; charset=utf-8",
    /* Si actualiza correctamente ingresa aqui */
    success: function (data) {
      alert("Acualizado");
      cargarTabla(tbody);
    },
    failure: function (data) {
      alert("Failure");
    },
    /* En caso de error */
    error: function (data) {
      alert("Error");
    },
  });
});
/*  */
/* EVENTO PARA BUSCAR POR ID */
/*  */
buscar.click(() => {
  /* Atrapo en una variable el id del front */
  let idValue = id.val().trim();
  $.ajax({
    type: "GET",
    /* Concateno el id al link publicado desde el backend */
    url: "http://localhost:7070/personas/" + idValue,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    /* En caso de que funcione (traiga info) entra aqui*/
    success: function (data) {
      /* data: toma toda la informacion traida del link publicado */
      /* nombre es la caja de texto del front, le envio la info que quiero mostrar siempre con (data.)*/
      nombre.val(data.nombre);
      /* ejm: 
            xtApellido.val(data.apellido);
            txtCedula.val(data.dni);
            siquiero mas info en una caja de texto puedo concatenar tambien, en este caso yo solo saco el nombre
             */
    },
    failure: function (data) {
      alert("Failure");
    },
    error: function (data) {
      alert("error");
    },
  });
});
/*  */
/* EVENTO PARA ELIMINAR */
/*  */
eliminar.click(() => {
  /* Atrapo en una variable el id del front */
  let idValue = id.val().trim();
  $.ajax({
    type: "Delete",
    /* Concateno el id al link publicado desde el backend */
    url: "http://localhost:7070/personas/" + idValue,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      alert("Registro Eliminado");
      cargarTabla(tbody);
    },
    failure: function (data) {
      alert("Failure");
    },
    error: function (data) {
      alert("error");
    },
  });
});
/*  */
/* FUNCION PARA CARGAR LA TABLA */
/*  */
function cargarTabla(tbody) {
  const btn = '<td><button type="+"""+"button"+"""+"        >Success</button></td>';
  $.ajax({
    /* GET para traer informacion de la BD */
    type: "GET",
    /* Link que publico desde el Backend */
    url: "http://localhost:8080/aprobacion/list",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    /* En caso de que funcione entra aqui */
    success: function (data) {
      /* Limpio la tabla */
      tbody.html("");
      /* recorro */
      $.each(data, function (i, item) {
        /* cargo la info en tr */
        var tr = $("<tr></tr>").append(
          /* item, toma el nombre de la columna de la BD; en este caso solo saco el id y el nombre*/
          td(item.aprobacionId),
          td(item.observacionAproba),
          td(item.estadoAproba),
          td(item.detalleControl),
          td(item.fechaAprobacion),
          td(item.fechaControl),
          '<td style="padding:0;" ><button type="button" id="btnActulizar" class="btn btn-success"'+ 
          'style="background-color:green; color:white; ">Actualizar</button></td>',
          '<td style="padding:0;" ><button type="button" id="btnActulizar" class="btn btn-danger"'+ 
          'style="background-color:red; color:white; ">Eliminar</button></td>',
          /* ejm
           td(item.cedula)
           td(item.rol)
           td(item.fechanacimiento)*/
        );
        /* cargo a la tabla la fila */
        tbody.append(tr);
      });
    },
    /* En caso de error entra aqui */
    error: function (data) {
      alert("error");
    },
  });
}
/* FUNCION QUE USO SIMPRE PARA TRABAJAR CON TABLAS */
var td = function (texto) {
  return $("<td></td>").text(texto);
};

$(document).ready(function () {
    $('#btnAprobaciones').click(function () {
        $("#contenidoMGIM").load("aprobaciones.php");
        console.log("aprobaciones")
    });
});
$(document).ready(function () {
    $('#btnModulos').click(function () {
        $("#contenidoMGIM").load("modulos.php");
        console.log("modulos")
    });
});
$(document).ready(function () {
    $('#btnKits').click(function () {
        $("#contenidoMGIM").load("kits.php");
        console.log("modulos")
    });
});
$(document).ready(function () {
    $('#btnEntregaKits').click(function () {
        $("#contenidoMGIM").load("entrega-kit.php");
        console.log("modulos")
    });
});
$(document).ready(function () {
    $('#btnReportes').click(function () {
        $("#contenidoMGIM").load("reporte-mgim.php");
        console.log("modulos")
    });
});