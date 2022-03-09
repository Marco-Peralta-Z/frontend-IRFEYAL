
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