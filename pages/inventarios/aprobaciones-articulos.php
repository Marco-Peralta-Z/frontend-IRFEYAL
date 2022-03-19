<?php include '../includes/header.php' ?>
<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid px-4">
            <div class="card mb-4">
                <div class="card-body">
                    <h1>Aprobaciones</h1>
                    <p class="mb-0">
                        Aprobaciones de modulos
                    </p>
                    <div class="container p-3">
                        <h3 style=" font-weight: bold;">APROBACIONES DE INGRESE Y EGRESO DE KITS</h3>
                        <!--  -->
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Observaciones</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Detalle aprobacion</th>
                                    <th scope="col">Fecha aprobacion</th>
                                    <th scope="col">Fecha control</th>
                                    <th scope="col">Actualizar</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>

                            <tbody id="contenidoPersonas">
                                <tr>
                                    <td>ERROR DE CARGA</td>
                                </tr>
                            </tbody>
                        </table>


                        <!-- 
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-5">
                                    <div class="mb-3">
                                        <label class="form-label">DIN</label>
                                        <input type="text" class="form-control" id="dni" placeholder="ingrese su dni">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Nombre</label>
                                        <input type="text" class="form-control" id="nombre" placeholder="ingrese su nombre">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Example textarea</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <button type="button" id="guardar" class="btn btn-primary">Guardar</button>
                                        <button type="button" id="actualizar" class="btn btn-success">Actualizar</button>
                                        <button type="button" id="buscar" class="btn btn-info">Buscar</button>
                                        <button type="button" id="eliminar" class="btn btn-danger">Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        -->
                    </div>
                </div>
            </div>

        </div>
    </main>

    <?php include '../includes/footer.php' ?>
    <script src="script-mgim.js"></script>