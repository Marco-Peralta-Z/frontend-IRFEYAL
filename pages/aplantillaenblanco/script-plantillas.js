
//se ejecuta al inicio de la plantilla-b
$(document).ready(function () {
    console.log("PRUEBA INICIO PLANTILLA B")
});
//boton para cargar los diferentes contenidos
$(document).ready(function () {
    $('#btnCargarSubContenidoA').click(function () {
        console.log("subcontenido")
        $("#contenedorPlantillaB").load("subcontenidouno.php");
    });
});
$(document).ready(function () {
    $('#btnCargarSubContenidoB').click(function () {
        console.log("subcontenido")
        $("#contenedorPlantillaB").load("subcontenidodos.php");
    });
});


//----------------------------------------