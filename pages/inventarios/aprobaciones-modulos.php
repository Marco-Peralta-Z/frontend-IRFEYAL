<?php include '../includes/header.php' ?>
<div id="layoutSidenav_content">
    <style>
        .modal--show {
            opacity: 1;
            pointer-events: unset;
        }
    </style>
    <main>
        <div class="container-fluid px-4">
            <div class="card mb-4">
                <div class="card-body">
                    <h1>Aprobaciones</h1>
                    <p class="mb-0">
                        Aprobaciones de modulos
                    </p>
                    <div>
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <div class="container-fluid">
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Mantenimiento modulos
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a class="dropdown-item" href="#">Action</a></li>
                                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                                <li>
                                                    <hr class="dropdown-divider">
                                                </li>
                                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </nav>
                    </div>



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
                                    <th scope="col">Detalles</th>
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

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    ...
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>





                </div>
            </div>
        </div>
    </main>

    <?php include '../includes/footer.php' ?>

    <script src="script-inventarios.js"></script>