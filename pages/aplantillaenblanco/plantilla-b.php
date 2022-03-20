<?php include '../includes/header.php' ?>
<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid px-4">
            <div class="card mb-4">
                <div class="card-body">
                    <!--INSERTAR EL CODIGO EN ESTA SECCION-->
                    <div>
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <div class="container-fluid">
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li class="nav-item">
                                            <a class="nav-link active" aria-current="page" href="#" id="btnCargarSubContenidoA">Subcontenidos a</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" id="btnCargarSubContenidoB">Subcontenido b</a>
                                        </li>
                                        <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Lista
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
                                        <li class="nav-item">
                                            <a class="nav-link disabled">Disabled</a>
                                        </li>
                                        
                                    </ul>
                                    <form class="d-flex">
                                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                        <button class="btn btn-outline-success" type="submit">Search</button>
                                    </form>
                                </div>
                            </div>
                        </nav>


                    </div>
                    <h1>EJEMPLO PLANTILLA B(NO MODIFICAR)</h1>

                    <div id="contenedorPlantillaB">

                    </div>


                    <!-- --------------------------------- -->
                </div>
            </div>

        </div>
    </main>

    <?php include '../includes/footer.php' ?>
    <script src="script-plantillas.js"></script>
