<?php include '../includes/header.php' ?>
<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid px-4">
            <div class="card mb-4">
                <div class="card-body">
                       <!--INSERTAR EL CODIGO EN ESTA SECCION-->
                        <h1>PLANTILLA A</h1>

                        <body>
    <section id="datos busqueda">
        <div class="container-sm">
            <div class="row pt-5">
                <div class="col-lg">
                    <div class="card">
                        <div class="card-header">
                            <div class="container">
                                <div class="row">
                                    <div class="col-2"></div>
                                    <div class="col-8 text-center">
                                        <p>REGISTRO DE ACTIVIDADES</p>
                                    </div>
                                    <div class="col-2"></div>
                                </div>
                            </div>
                        </div>
                        <form action="">
                            <br>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-1"></div>
                                    <div class="col-4">
                                        <label for="periodoEscolar"> Periodo</label>
                                        <select class="form-control-sm" name="periodoEscolar">
                      <option value="value1" selected>Seleccionar</option>
                      <option value="value2">TSD Septiembre - Junio - 2021/2022</option>
                      <option value="value3">TSD Septiembre - Junio - 2020/2021</option>
                    </select>
                                    </div>
                                    <div class="col-4">
                                        <label for="curso">Curso</label>
                                        <select class="form-control-sm" name="curso">
                      <option value="value1" selected>Seleccionar</option>
                      <option value="value2">Básica Superior Intensiva</option>
                      <option value="value3">Bachillerato Superior Intensiva</option>
                    </select>
                                    </div>
                                    <div class="col-3">
                                        <button type="submit" class="btn btn-primary mb-3" onclick="listar();">LISTAR</button>
                                        <button type="submit" class="btn btn-primary mb-3" onclick="limpiar();">LIMPIAR</button>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-1"></div>
                                    <div class="col-4">
                                        <label for="paralelo">Paralelo</label>
                                        <select class="form-control-sm" name="paralelo">
                      <option value="value1" selected>Seleccionar</option>
                      <option value="value2">2A</option>
                      <option value="value3">3A</option>
                    </select>
                                    </div>
                                    <div class="col-4">
                                        <label for="modalidad">Modalidad</label>
                                        <select class="form-control-sm" name="modalidad">
                      <option class="form-control-sm" value="value1" selected>Seleccionar</option>
                      <option value="value2">Semi Presencial Intensiva</option>
                      <option value="value3">Semi Presencial No Intensiva</option>
                    </select>
                                    </div>
                                    <div class="col-3">
                                        <button type="submit" class="btn btn-primary mb-3" onclick="regresar();">REGRESAR</button>
                                    </div>
                                </div>
                            </div>
                            <br>
                        </form>
                        <div class="form-group">
                            <div class="row">
                                <!---- codigo para generar la tabla. ------>
                                <br>
                                <div class="row">
                                    <div class="col-sm-12 col-md-1"></div>
                                    <div class="col-sm-12 col-md-5">
                                        <div class="dataTables bs-select">
                                            <label for="number">Listar</label>
                                            <select class="form-control-sm" aria-controls="dtBasicExample" for="" id="number">
                        <option value="10" selected>10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-5">
                                        <div class="dataTables_filter">
                                            <label>
                        Buscar:
                        <input type="search" class="form-control form-control-sm" placeholder=""
                          aria-controls="dtBasicExample" name="" id="">
                      </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-1"></div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-sm-12 col-md-1"></div>
                                    <div class="col-sm-12 col-md-10">
                                        <table id="dtBasicExample" class="table table-striped table-bordered table-sm dataTable" role="grid" style="width: 100%;" cellspacing="0" width="100%">
                                            <thead>
                                                <tr>
                                                    <th class="th-sm">ID
                                                    </th>
                                                    <th class="th-sm">CEDULA
                                                    </th>
                                                    <th class="th-sm">NOMBRES
                                                    </th>
                                                    <th class="th-sm">APELLIDOS
                                                    </th>
                                                    <th class="th-sm">APORTE 1
                                                    </th>
                                                    <th class="th-sm">APORTE 2
                                                    </th>
                                                    <th class="th-sm">APORTE 3
                                                    </th>
                                                    <th class="th-sm">APORTE 4
                                                    </th>
                                                    <th class="th-sm">EVALUACION 1
                                                    </th>
                                                    <th class="th-sm">APORTE 5
                                                    </th>
                                                    <th class="th-sm">APORTE 6
                                                    </th>
                                                    <!-- CAMPOS FALTANTES
                                                    <th class="th-sm">APORTE 7
                                                    </th>
                                                    <th class="th-sm">APORTE 8
                                                    </th>
                                                    <th class="th-sm">APORTE 9
                                                    </th>
                                                    <th class="th-sm">EVALUACION 2
                                                    </th>
                                                    <th class="th-sm">EXAMEN FINAL
                                                    </th>
                                                    <th class="th-sm">PROMEDIO FINAL
                                                    </th>
                                                    <th class="th-sm">EXAMEN SUPLETORIO
                                                    </th>
                                                    <th class="th-sm">PROMEDIO SUPLETORIO
                                                    </th>
                                                    <th class="th-sm">EXAMEN REMEDIAL
                                                    </th>
                                                    <th class="th-sm">PROMEDIO REMEDIAL
                                                    </th>
                                                    <th class="th-sm">EXAMEN GRACIA
                                                    </th>
                                                    <th class="th-sm">PROMEDIO GRACIA
                                                    </th>
                                                    <th class="th-sm">COMPORTAMIENTO
                                                    </th>
                                                -->
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>E01</td>
                                                    <td>0134304216</td>
                                                    <td>JUAN DANIEL </td>
                                                    <td>URGILES PEREZ</td>
                                                    <td>8.00</td>
                                                    <td>10.00</td>
                                                    <td>0.00</td>
                                                    <td>0.00</td>
                                                    <td>0.00</td>
                                                    <td>3.6</td>
                                                    <td>10</td>
                                                </tr>
                                                <tr>
                                                    <td>E02</td>
                                                    <td>010385965</td>
                                                    <td>DIEGO SAMUEL</td>
                                                    <td>RAMIREZ ORTEGA</td>
                                                    <td>7.00</td>
                                                    <td>10.00</td>
                                                    <td>0.00</td>
                                                    <td>0.00</td>
                                                    <td>0.00</td>
                                                    <td>3.4</td>
                                                    <td>10</td>

                                                </tr>
                                                <tr>
                                                    <td>E03</td>
                                                    <td>020352809</td>
                                                    <td>SAMANTHA ESTEFANIA</td>
                                                    <td>LOPEZ LEMA</td>
                                                    <td>10.00</td>
                                                    <td>4.00</td>
                                                    <td>0.00</td>
                                                    <td>0.00</td>
                                                    <td>0.00</td>
                                                    <td>2.8</td>
                                                    <td>10</td>

                                                </tr>
                                                <tr>
                                                    <td>E04</td>
                                                    <td>010732566</td>
                                                    <td>JOSELINE ANDREA</td>
                                                    <td>CAPON DOMINGUEZ</td>
                                                    <td>10.00</td>
                                                    <td>7.00</td>
                                                    <td>0.00</td>
                                                    <td>0.00</td>
                                                    <td>0.00</td>
                                                    <td>3.4</td>
                                                    <td>10</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-sm-12 col-md-1"></div>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-12 col-md-1"></div>
                            <div class="col-sm-12 col-md-4">
                                <div id="" class="dataTables_info" role="status" aria-live="polite">Página 1 de 1</div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="dataTables_paginate paging_simple_numbers">
                                    <ul class="pagination">
                                        <li id="dtBasicExample_previous" class="paginate_button page-item previous">
                                            <a href="#" class="page-link" aria-controls="dtBasicExample" data-dt-idx="0" tabindex="0">Anterior</a>
                                        </li>
                                        <li class="paginate_button page-item">
                                            <a href="#" class="page-link" aria-controls="dtBasicExample" data-dt-idx="4" tabindex="0">1</a>
                                        </li>
                                        <li class="paginate_button page-item">
                                            <a href="#" class="page-link" aria-controls="dtBasicExample" data-dt-idx="4" tabindex="0">2</a>
                                        </li>
                                        <li class="paginate_button page-item">
                                            <a href="#" class="page-link" aria-controls="dtBasicExample" data-dt-idx="4" tabindex="0">3</a>
                                        </li>
                                        <li class="paginate_button page-item">
                                            <a href="#" class="page-link" aria-controls="dtBasicExample" data-dt-idx="4" tabindex="0">4</a>
                                        </li>
                                        <li class="paginate_button page-item">
                                            <a href="#" class="page-link" aria-controls="dtBasicExample" data-dt-idx="5" tabindex="0">5</a>
                                        </li>
                                        <li id="dtBasicExample_next" class="paginate_button page-item next">
                                            <a href="#" class="page-link" aria-controls="dtBasicExample" data-dt-idx="7" tabindex="0">Siguiente</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-1"></div>
                        </div>
                        <br>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-8">
                                </div>
                                <div class="col-4 text-center">
                                    <button class="btn btn-primary mb-3" onclick="generarN();">GENERAR CUADRO DE NOTAS</button>
                                </div>
                            </div>
                        </div>
                        <br>
                    </div>
                </div>
                <script>
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
                </script>
            </div>
        </div>
    </section>
</body>                
                </div>
            </div>

        </div>
    </main>

<?php include '../includes/footer.php' ?>