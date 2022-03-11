<?php include '../includes/header.php' ?>
<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid px-4">
            <div class="card mb-4">
                <div class="card-body">
                        <h1>inventario de bienes</h1>
                </div>
            </div>

            <section class="py-5">
        <div class="container" style="margin-top: 20px;">
            <div class="row gx-4 gx-lg-5 align-items-center">
                <div class="col-md-6" id="miDiv">

                  <input type="text" id="idlabel" disabled><br><br>

                  <input type="text" id="nombrelable" disabled><br><br>

                  <input type="text" id="apellidolabel" disabled><br><br>

                 

                </div>
                <div class="col-md-6">

                  <div class="dropdown">
         
                    <select class="btn btn-secondary dropdown-toggle" href="#" role="button"data-bs-toggle="dropdown" aria-expanded="false" name="proveedor" id="proveedor" onchange="app.buscarregistro(this.value)">
                    </select>
       
                  <select class="btn btn-secondary dropdown-toggle" href="#" role="button"data-bs-toggle="dropdown" aria-expanded="false"  name="cursofiltro" id="cursofiltro" onchange="app.buscarregistro(this.value)">
                   </select>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    
                 </ul>
            
                    <input id="inputbusqueda" type="search" placeholder="Search" aria-label="Search">
                        <button id="buscar" type="submit">Search</button>




                </div>


                <div class="alert alert-primary" id="msg" style="display: none;" role="alert"></div>

                <div class="col-md-3">
             <div>
               

             </div>
              

            </div>
          
    

        <!--  -->
        <table id="persona" class="table" class="table table-striped table-bordered" style="width:100%">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Last</th>
              <th scope="col">boton</th>
            </tr>
          </thead>
          <tbody id="contenidoPersonas">
           
          </tbody>
        </table>
        <div class="d-flex">
          <form >
              <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
              <button class="btn btn-outline-dark flex-shrink-0" onclick="window.location.href='RegistroFaltas.php'" type="button">
                  <i class="bi-cart-fill me-1"></i>
                  Regitrar Faltas
              </button>
              <button  id="imprimir" class="btn btn-outline-dark flex-shrink-0" type="button">
                  <i class="bi-cart-fill me-1"></i>
                  Imprimir registro
              </button>
          </form>
      </div>

  </div>
        <div class="modal fade" id="personaModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="modalTitle">Persona</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                          <label for="nombre">Nombre</label>
                          <input type="text" class="form-control" id="nombre" placeholder="Ingrese su nombre">
                          <input type="hidden" class="form-control" id="id">
                        </div>
                        <div class="form-group">
                          <label for="apellido">Apellido</label>
                          <input type="text" class="form-control" id="apellido" placeholder="Ingrese su apellido">
                        </div>
                        <div class="form-group">
                            <label for="direccion">Dirección</label>
                            <input type="text" class="form-control" id="direccion" placeholder="Ingrese su direccion">
                        </div>
                        <div class="form-group">
                            <label for="telefono">Teléfono</label>
                            <input type="text" class="form-control" id="telefono" placeholder="Ingrese su teléfono">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                  <button type="button" id="save" class="btn btn-primary">Guardar</button>
                </div>
              </div>
            </div>
        </div>  
      </div>
        </div>
    </section>
        </div>
    </main>

<?php include '../includes/footer.php' ?>