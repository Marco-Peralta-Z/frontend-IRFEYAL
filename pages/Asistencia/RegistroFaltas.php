<?php include '../includes/header.php' ?>
<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid px-4">
            <div class="card mb-4">
                <div class="card-body">
                        <h1>Registrar  asistencia</h1>
                </div>
                <section class="py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">

                <div id="page-inner">
                    <div class="dropdown">
                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Cursos
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">

                        </ul>



                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            modalidad
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">

                        </ul>


                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Periodo
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">

                        </ul>

                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Paralelo
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">

                        </ul>
                        <input  type="search" placeholder="Search" aria-label="Search">
                            <button type="submit">Search</button>




                    </div>


                    <div class="row">


                        <div class="col-md-12">
                            <!-- Advanced Tables -->
                            <div class="card">
                                <div class="card-action">
                                    Advanced Tables
                                </div>
                                <div class="card-content">
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                            <thead>
                                                <tr>
                                                    <th>Nombre </th>
                                                    <th>Apelldio</th>
                                                    <th> <input type="date" id="start" name="trip-start"></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="odd gradeX">
                                                    <td>Esteban</td>
                                                    <td>Garcia</td>
                                                    <td><input type="checkbox" id="cbox2" value="second_checkbox"></td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                            <!--End Advanced Tables -->
                        </div>
                    </div>





                    <div class="d-flex">
                        <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
                        <button class="btn btn-outline-dark flex-shrink-0" type="button">
                            <i class="bi-cart-fill me-1"></i>
                            Regitrar Faltas
                        </button>

                    </div>
                </div>
            </div>
        </div>
        <button  onclick="window.location.href='ListadoAsistencia.php'" class="btn btn-outline-dark flex-shrink-0" type="button">
                            <i class="bi-cart-fill me-1"></i>Regresar</button>
    </section>

            </div>

        </div>
    </main>


<?php include '../includes/footer.php' ?>