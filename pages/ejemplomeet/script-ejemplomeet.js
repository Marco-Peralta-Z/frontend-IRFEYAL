


//se ejecuta al inicio de la plantilla-b
$(document).ready(function () {
    console.log("PRUEBA INICIO PLANTILL                    A B")
});




//boton para cargar los diferentes contenidos
$(document).ready(function () {
    $('#btnCargarSubContenidoA').click(function () {
        console.log("subcontenido")
        $("#contenedorPlantillaB").load("componenteejemplomeet.php");
    });
});




//----------------------------------------