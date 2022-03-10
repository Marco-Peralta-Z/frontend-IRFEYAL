<?php include '../includes/header.php' ?>
<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid px-4">
            <div class="card mb-4">
                <div class="card-body">
                    <h1>GESTION DE INVENTARIO DE MODULOS</h1>
                    <p class="mb-0">
                        This page is an example of using static navigation. By removing the
                        <code>.sb-nav-fixed</code>
                        class from the
                        <code>body</code>
                        , the top navigation and side navigation will become static on scroll. Scroll down this page to see an example.
                    </p>
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <a class="navbar-brand" href="#">Navbar</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav">
                                <li class="nav-item active">
                                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Features</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Pricing</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Dropdown link
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
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


                        <!-- -->
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
                    </div>
                </div>
            </div>

        </div>
    </main>

    <?php include '../includes/footer.php' ?>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery.js"></script>
    <script src="script-mgim.js"></script>