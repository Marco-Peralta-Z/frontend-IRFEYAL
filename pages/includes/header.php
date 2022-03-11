<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>IRFEYAL</title>
    <script src="../../css/all.min.js" crossorigin="anonymous"></script>
    <link href="../../css/bootstrap.min.css" rel="stylesheet">
    <link href="../../css/styles.css" rel="stylesheet" />
</head>

<body>
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand-->
        <a class="navbar-brand ps-3" href="../home/index-home.php" id="btnHome">IRFEYAL</a>
        <!-- Sidebar Toggle-->
        <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
        <!-- Navbar Search-->
        <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div class="input-group">
                <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
            </div>
        </form>
        <!-- Navbar-->
        <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdownUser" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="true"><i class="fas fa-user fa-fw"></i></a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownUser">
                    <li><a class="dropdown-item" href="#!">Configuración</a></li>
                    <li><a class="dropdown-item" href="#!">Perfil</a></li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li><a class="dropdown-item" href="../../">Salir</a></li>
                </ul>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">Administracion</div>
                        <a class="nav-link" href="../home/index-home.php" id="btnHome2">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Inicio
                        </a>
                        <div class="sb-sidenav-menu-heading">Opciones</div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                            Layouts
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="layout-static.html">Static Navigation</a>
                                <a class="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                            </nav>
                        </div>
                        <!-- ---------   pages  ------------->
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                            Pages
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                    Authentication
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                    <nav class="sb-sidenav-menu-nested nav">
                                        <a class="nav-link" href="login.html">Login</a>
                                        <a class="nav-link" href="register.html">Register</a>
                                        <a class="nav-link" href="password.html">Forgot Password</a>
                                    </nav>
                                </div>
                                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                    Error
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                    <nav class="sb-sidenav-menu-nested nav">
                                        <a class="nav-link" href="401.html">401 Page</a>
                                        <a class="nav-link" href="404.html">404 Page</a>
                                        <a class="nav-link" href="500.html">500 Page</a>
                                    </nav>
                                </div>
                            </nav>
                        </div>


                        <!-- /.nav-collapse ------------------------------------------------------------------------->
                        <!-- /.nav-collapse ------------------------------------------------------------------------->
                        <!-- /.nav-collapse ------------------------------------------------------------------------->
                        <!--INICIO NUEVAS LINKS IRFEYAL-------------------------------------------------------------->
                        <!-- INICIO COLLAPSE PLANTILLA-------------------------------------------------------------->
                        <a class="nav-link collapsed"  href="#" data-bs-toggle="collapse" data-bs-target="#PLANTILLA" aria-expanded="false" aria-controls="PLANTILLA">
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                            PLANTILLA
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="PLANTILLA" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="../aplantillaenblanco/plantilla-a.php" >Plantilla A</a>
                                <a class="nav-link" href="../aplantillaenblanco/plantilla-b.php" >Plantilla B</a>
                                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePLANTILLAB" aria-expanded="false" aria-controls="pagesCollapseAprobacion">
                                    COLLAPSE 2 PLANTILLA
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="collapsePLANTILLAB" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPLANTILLAB">
                                    <nav class="sb-sidenav-menu-nested nav">
                                        <a class="nav-link" href="../aplantillaenblanco/plantilla-a.php" id="btnIngresoKit">PLANTILLA A</a>
                                        <a class="nav-link" href="../aplantillaenblanco/plantilla-b.php">PLANTILL B</a>
                                    </nav>
                                </div>
                            </nav>
                        </div>
                        <!-- FIN COLLAPSE PLANTILLA-------------------------------------------------------------->
                        <!-- INICIO COLLAPSE MODULO GESTION DE INVENTARIO-------------------------------------------------------------->
                        <a class="nav-link collapsed" id="btnMGIM" href="#" data-bs-toggle="collapse" data-bs-target="#collapseMGIM" aria-expanded="false" aria-controls="collapseMGIM">
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                            Inventario de Modulos
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="collapseMGIM" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="../gestiondekits/aprobaciones.php" id="btnModulos">Aprobaciones</a>
                                <a class="nav-link" href="../gestiondekits/modulos.php" id="btnModulos">Modulos</a>
                                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAprobacion" aria-expanded="false" aria-controls="pagesCollapseAprobacion">
                                    Kits de modulos
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>
                                <div class="collapse" id="pagesCollapseAprobacion" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionAprobacion">
                                    <nav class="sb-sidenav-menu-nested nav">
                                        <a class="nav-link" href="../gestiondekits/ingreso-kits.php" id="btnIngresoKit">Ingresos de kits</a>
                                        <a class="nav-link" href="../gestiondekits/reportes.php">Reportes</a>
                                    </nav>
                                </div>
                            </nav>
                        </div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseMGI" aria-expanded="false" aria-controls="collapseMGI">
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                            Gestion de Inventario
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="collapseMGI" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="layout-static.html">Todos los articulos</a>
                                <a class="nav-link" href="layout-sidenav-light.html">Ingreso de nuevo articulo</a>
                            </nav>
                        </div>
                        <!-- FIN COLLAPSE MODULO GESTION DE INVENTARIO-------------------------------------------------------------->


                        <!--FIN NUEVAS LINKS IRFEYAL---------------------------------------------------------->






                        <!-- END collapse------------------------------------------------------------------------->

                        <div class="sb-sidenav-menu-heading">Addons</div>
                        <a class="nav-link" href="charts.html">
                            <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                            Charts
                        </a>
                        <a class="nav-link" href="tables.html">
                            <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                            Tables
                        </a>
                    </div>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="small">Logged in as:</div>
                    Start Bootstrap
                </div>
            </nav>
        </div>