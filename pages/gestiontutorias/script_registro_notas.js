$(document).ready(function() {

    $('#tablascroll').DataTable({
        "scrollX": true
    });
    $('.dataTables_length').addClass('bs-select');


    // function obtener_datos() {
    //    $.ajax({
    //      url: "registro.php",
    //    method: "POST",
    //  success: function(data) {
    //    $("#result").html(data)
    //}
    //})
    //}

    //obtener_datos();

});

function generarN() {
    alert("Generar cruadro de notas");
}

function listar() {
    alert("Listar Alumnos");
}

function regresar() {
    alert("Regresar al index");
}

function limpiar() {
    alert("Limpiar");
}

/* var app = {
    backend: 'http://localhost:8080/api/v1',
    table : null,
    init: function() {
        app.initDatatable('#registro');

        $("#save").click(function(){
            app.save({
                id: $('#id').val(),
                nombre : $('#nombre').val(),
                apellido: $('#apellido').val(),
                aporte1: $('#aporte1').val(),
                aporte2: $('#aporte2').val()
                aporte3: $('#aporte3').val()
                aporte4: $('#aporte4').val()
                evaluacion1: $('#evaluacion1').val()
                aporte5: $('#aporte5').val()
                aporte6: $('#aporte6').val()
                aporte7: $('#aporte7').val()
                aporte8: $('#aporte8').val()
                evaluacionfinal: $('#evaluacionfinal').val()
                examenfinal: $('#examenfinal').val()
                promediofinal: $('#promediofinal').val()
                examensupletorio: $('#examensupletorio').val()
                promediosupletorio: $('#promediosupletorio').val()
                examenremedial: $('#examenremedial').val()
                promedioremedial: $('#promedioremedial').val()
                examengracia: $('#examengracia').val()
                promediogracia: $('#promediogracia').val()
                comportamiento: $('#comportamiento').val()
        });
    },
    initDatatable : function(id) {
        app.table = $(id).DataTable({
            ajax : {
                url : app.backend + '/all',
                dataSrc : function(json) {
                    return json;
                }
            },
            dom: 'Bfrtip',
            columns : [
                {data : "id"},
                {data : "nombre"},
                {data : "aporte1"},
                {data : "aporte2"},
                {data : "aporte3"},
                {data : "aporte4"},
                {data : "evaluacion1"},
                {data : "aporte5"},
                {data : "aporte6"},
                {data : "aporte7"},
                {data : "aporte8"},
                {data : "evaluacionfinal"},
                {data : "examenfinal"},
                {data : "promediofinal"},
                {data : "examensupletorio"},
                {data : "promediosupletorio"},
                {data : "examenremedial"},
                {data : "promedioremedial"},
                {data : "examengracia"},
                {data : "promediogracia"},
                {data : "comportamiento"},
                
                
            ],
            buttons: [
                {
                    text : 'Editar',
                    action : function(e, dt, node, config) {
                        var data = dt.rows('.table-active').data()[0];
                        app.setDataToModal(data);
                        $('#registroModal').modal();
                    }
                }
            ]
        });

        $('#personas tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')) {
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                $(this).addClass('table-active');
            }
        });
    },
    setDataToModal : function(data) {
        $('#id').val(data.id);
        $('#nombre').val(data.nombre);
        $('#apellido').val(data.apellido);
        $('#aporte1').val(data.aporte1);
        $('#aporte2').val(data.aporte2);
        $('#aporte3').val(data.aporte3);
        $('#aporte4').val(data.aporte4);
        $('#evaluacion1').val(data.evaluacion1);
        $('#aporte5').val(data.aporte5);
        $('#aporte6').val(data.aporte6);
        $('#aporte7').val(data.aporte7);
        $('#aporte8').val(data.aporte8);
        $('#evaluacionfinal').val(data.evaluacionfinal);
        $('#examenfinal').val(data.examenfinal);
        $('#promediofinal').val(data.promediofinal);
        $('#examensupletorio').val(data.examensupletorio);
        $('#promediosupletorio').val(data.promediosupletorio);
        $('#examenremedial').val(data.examenremedial);
        $('#promedioremedial').val(data.promedioremeial);
        $('#examengracia').val(data.examengracia);
        $('#promediogracia').val(data.promediogracia);
        $('#comportamiento').val(data.comportamiento);
        
    },
    save : function(data) {
        $.ajax({
            url: app.backend + '/save',
            data : JSON.stringify(data),
            method: 'POST',
            dataType : 'json',
            contentType: "application/json; charset=utf-8",
            success : function(json) {
                $("#msg").text('Registro guardado correctamente');
                $("#msg").show();
                $('#personaModal').modal('hide');
                app.table.ajax.reload();
            },
            error : function(error) {

            }
        })
    }
};

$(document).ready(function(){
    app.init();
}); */