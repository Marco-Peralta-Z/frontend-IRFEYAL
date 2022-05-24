import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanunidadService } from './../../../Servicio/documentacion_academica/planunidadServices/planunidad.service';
import { UnidadService } from './../../../Servicio/documentacion_academica/unidadServices/unidad.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-generar-planunidad',
  templateUrl: './generar-planunidad.component.html',
  styleUrls: ['./generar-planunidad.component.scss']
})
export class GenerarPlanunidadComponent implements OnInit {
  generar_planunidadForm: FormGroup = this.fb.group({});
  //variables para listar
  unidades: any;
  asignaturas: any;
  modalidades: any;
  periodos: any;
  planunidadaprobados: any;
  planunidadrechazados: any;
  cursos: any;
  paralelos: any;

  aprobado: String = "Aprobado";
  rechazado: String = "Rechazado";

  id: any;
  id_empleado: number = 1;
  autoResize: boolean = true;

  mostrarFormGenerar: boolean = true;
  mostrarAprobados: boolean = false;
  mostrarRechazados: boolean = false;
  mostrarBotonEnviar: boolean = true;
  mostrarCambiosEditar: boolean = false;
  mostrarbtnTodos: boolean = true;
  mostrarbtnMisPlanes: boolean = false;
  // Variables para capturar el select de Unidad
  opcionSelectUnidad: any;
  verSelectUnidad: any;
  // Variables para capturar el select de Modalidades
  opcionSelectModalidad: any;
  verSelectModalidad: any;
  // Variables para capturar el select de Asignaturas
  opcionSelectAsig: any;
  verSelectAsigId: any;
  verSelectAsigNom: any;
  // Variables para capturar el select de Periodos
  opcionSelectPeriodo: any;
  verSelectPeriodoMalla: any;
  // Variables para capturar el select de cursos
  opcionSelectCurso: any;
  verSelectCurso: any;
  // Variables para capturar el select de paralelo
  opcionSelectParalelo: any;
  verSelectParalelo: any;

  constructor(
    public fb: FormBuilder,
    public planunidadService: PlanunidadService,
    public unidadService: UnidadService,
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos() {
    this.generar_planunidadForm = this.fb.group({
      id_plan_unidad: ['', Validators.required],
      titulo_unidad: ['', Validators.required],
      objetivos: ['', Validators.required],
      contenidos: ['', Validators.required],
      criterios_evaluacion: ['', Validators.required],
      destrezas: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      estado: ['', Validators.required],
      unidad: ['', Validators.required],
      empleado: ['', Validators.required],
      asignatura: ['', Validators.required],
      curso: ['', Validators.required],
      paralelo: ['', Validators.required],
      modalidad: ['', Validators.required],
      periodo: ['', Validators.required],
    });

    this.unidadService.getAllUnidades().subscribe(resp => {
      this.unidades = resp;
    },
      error => { console.error(error) }
    );

    this.planunidadService.getAllModalidad().subscribe(resp => {
      this.modalidades = resp;
    },
      error => { console.error(error) }
    );

    this.planunidadService.getAllPeriodo().subscribe(resp => {
      this.periodos = resp;
    },
      error => { console.error(error) }
    );
    //Cargando datos en las tablas por estado y empleado
    this.cargarPlanesUnidadEmpleado(this.aprobado);
    this.cargarPlanesUnidadEmpleado(this.rechazado);

    //Captura los cambios en el select de periodo para luego mostrar la asignaturar de acuerdo a la Malla
    this.generar_planunidadForm.get("periodo")?.valueChanges.subscribe(value => {
      if (value != null && value != 0) {
        this.planunidadService.getAllAsignaturasMalla(value.malla.id_malla).subscribe(resp => {
          this.asignaturas = resp;
        },
          error => { console.error(error) }
        );
      } else if (value == 0) {
        this.asignaturas = null;
        this.opcionSelectAsig = 0;
      }
    });

    this.planunidadService.getAllCurso().subscribe(resp => {
      this.cursos = resp;
    },
      error => { console.error(error) }
    );

    this.planunidadService.getAllParalelo().subscribe(resp => {
      this.paralelos = resp;
    },
      error => { console.error(error) }
    );
  }

  capturarSelectUnidad() {
    // Pasamos el valor seleccionado a la variable verSeleccionUnidad
    this.verSelectUnidad = this.opcionSelectUnidad.idUnidad;
  }
  capturarSelectModalidad() {
    // Pasamos el valor seleccionado a la variable verSeleccionUnidad
    this.verSelectModalidad = this.opcionSelectModalidad.descripcion;
  }

  capturarSelectAsig() {
    // Pasamos el id y descripcion del valor seleccionado a la variable verSeleccion verSelectAsigId y verSelectAsigNom
    this.verSelectAsigId = this.opcionSelectAsig.id_asignatura;
    this.verSelectAsigNom = this.opcionSelectAsig.descripcion;
  }

  capturarSelectPeriodo() {
    // Pasamos el valor seleccionado a la variable verSeleccionPeriodoMalla
    if (this.opcionSelectPeriodo != '0') {
      this.verSelectPeriodoMalla = this.opcionSelectPeriodo.malla.descripcion;
    }
  }

  capturarSelectCurso() {
    // Pasamos el valor seleccionado a la variable verSeleccionUnidad
    this.verSelectCurso = this.opcionSelectCurso.descripcion;
  }

  capturarSelectParalelo() {
    // Pasamos el valor seleccionado a la variable verSeleccionUnidad
    this.verSelectParalelo = this.opcionSelectParalelo.descripcion;
  }

  verFormGenerar() {
    this.mostrarFormGenerar = true;
    this.mostrarAprobados = false;
    this.mostrarRechazados = false;
  }

  verTablaAprobados() {
    this.mostrarFormGenerar = false;
    this.mostrarAprobados = true;
    this.mostrarRechazados = false;
  }

  verTablaRechazados() {
    this.mostrarFormGenerar = false;
    this.mostrarAprobados = false;
    this.mostrarRechazados = true;
  }

  enviar(): void {
    if (this.generar_planunidadForm.get("fecha_inicio")?.value == "" ||
      this.generar_planunidadForm.get("fecha_fin")?.value == "" ||
      this.generar_planunidadForm.get("titulo_unidad")?.value == "" ||
      this.generar_planunidadForm.get("objetivos")?.value == "" ||
      this.generar_planunidadForm.get("contenidos")?.value == "" ||
      this.generar_planunidadForm.get("criterios_evaluacion")?.value == "" ||
      this.generar_planunidadForm.get("destrezas")?.value == "") {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Plan de Unidad No Enviado, llene todos los campos',
        showConfirmButton: false,
        timer: 2500
      })
    } else {
      //Id empleado -provicional
      this.generar_planunidadForm.value.empleado = "1";

      this.generar_planunidadForm.value.estado = "Pendiente";
      this.planunidadService.savePlanUnidad(this.generar_planunidadForm.value).subscribe(resp => {
        //Receteamos el formulario
        this.generar_planunidadForm.reset();
        //Receteamos los Etiquetas
        this.opcionSelectUnidad = 0;
        this.opcionSelectModalidad = 0;
        this.opcionSelectAsig = 0;
        this.opcionSelectPeriodo = 0;
        this.opcionSelectCurso = 0;
        this.opcionSelectParalelo = 0;
        this.opcionSelectAsig = 0;
        //Alerta success
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Plan de Unidad Enviado con exito!',
          showConfirmButton: false,
          timer: 2500
        })
      },
        error => {
          console.error(error)
          //Alerta error
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Plan de Unidad No Enviado, llene todos los campos',
            showConfirmButton: false,
            timer: 2500
          })
        }
      )
    }
  }

  guardaredit() {
    this.generar_planunidadForm.value.estado = "Pendiente";
    this.planunidadService.updatePlanUnidad(this.id, this.generar_planunidadForm.value).subscribe(resp => {
      this.generar_planunidadForm.reset();
      //Receteamos los Etiquetas
      this.opcionSelectUnidad = 0;
      this.opcionSelectModalidad = 0;
      this.opcionSelectAsig = 0;
      this.opcionSelectPeriodo = 0;
      this.opcionSelectCurso = 0;
      this.opcionSelectParalelo = 0;
      this.opcionSelectAsig = 0;
      //Mostramos el btn Enviar y ocultamos btn Guardar Cambios y  btn Cancelar
      this.mostrarBotonEnviar = true;
      this.mostrarCambiosEditar = false;
      this.mostrarFormGenerar = false;
      this.mostrarRechazados = true;
      //Actualizar tablas
      this.cargarDatos();
      //Alerta success
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Plan de Unidad modificado con exito!',
        showConfirmButton: false,
        timer: 2500
      })
    },
      error => {
        console.error(error)
        //Alerta error
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Plan de Unidad no modificado, ocurrio un error',
          showConfirmButton: false,
          timer: 2500
        })
      }
    )
  }

  cancelaredit() {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Cancelar edicion de Plan de Unidad!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Cancelar!',
      cancelButtonText: 'No, Seguir editando'
    }).then((result) => {
      if (result.isConfirmed) {
        //Receteamos el formulario
        this.generar_planunidadForm.reset();
        //Receteamos los Etiquetas
        this.opcionSelectUnidad = 0;
        this.opcionSelectModalidad = 0;
        this.opcionSelectAsig = 0;
        this.opcionSelectPeriodo = 0;
        this.opcionSelectCurso = 0;
        this.opcionSelectParalelo = 0;
        this.opcionSelectAsig = 0;
        //Mostramos el btn Enviar y ocultamos btn Guardar Cambios y  btn Cancelar
        this.mostrarBotonEnviar = true;
        this.mostrarCambiosEditar = false;
        this.mostrarFormGenerar = false;
        this.mostrarRechazados = true;
      }
    })
  }

  abrir(plan_unidad: any) {
    //Cargamos los datos de la base en los imput
    this.generar_planunidadForm.setValue({
      id_plan_unidad: plan_unidad.id_plan_unidad,
      titulo_unidad: plan_unidad.titulo_unidad,
      objetivos: plan_unidad.objetivos,
      contenidos: plan_unidad.contenidos,
      criterios_evaluacion: plan_unidad.criterios_evaluacion,
      destrezas: plan_unidad.destrezas,
      fecha_inicio: plan_unidad.fecha_inicio,
      fecha_fin: plan_unidad.fecha_fin,
      estado: plan_unidad.estado,
      unidad: plan_unidad.unidad,
      empleado: plan_unidad.empleado,
      asignatura: plan_unidad.asignatura,
      curso: plan_unidad.curso,
      paralelo: plan_unidad.paralelo,
      modalidad: plan_unidad.modalidad,
      periodo: plan_unidad.periodo
    });
    //Pasamos el id del plan a la variable (id) 
    this.id = plan_unidad.id_plan_unidad;
    //ngModel de los select
    this.opcionSelectUnidad = plan_unidad.unidad;
    this.opcionSelectModalidad = plan_unidad.modalidad;
    this.opcionSelectAsig = plan_unidad.asignatura;
    this.opcionSelectPeriodo = plan_unidad.periodo;
    this.opcionSelectCurso = plan_unidad.curso;
    this.opcionSelectParalelo = plan_unidad.paralelo;
    //Cargamos los labels
    this.verSelectUnidad = plan_unidad.unidad.idUnidad;
    this.verSelectModalidad = plan_unidad.modalidad.descripcion;
    this.verSelectPeriodoMalla = plan_unidad.periodo.malla.descripcion;
    this.verSelectAsigNom = plan_unidad.asignatura.descripcion;
    this.verSelectAsigId = plan_unidad.asignatura.id_asignatura;
    this.verSelectCurso = plan_unidad.curso.descripcion;
    this.verSelectParalelo = plan_unidad.paralelo.descripcion;
    //Mostramos el btn Guardar Cambios y ocultamos btn Enviar
    this.mostrarCambiosEditar = true;
    this.mostrarBotonEnviar = false;
    this.mostrarFormGenerar = true;
    this.mostrarRechazados = false;
  }


  eliminar(planunidad: any) {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Eliminar Plan: Unidad " + planunidad.unidad.idUnidad +
        ' de ' + planunidad.asignatura.descripcion,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.planunidadService.deletePlanUnidad(planunidad.id_plan_unidad).subscribe(resp => {
          //Actualizar tablas
          this.cargarDatos();
        });
        Swal.fire({
          icon: 'success',
          title: 'Eliminado!',
          text: 'El Plan de unidad ha sido eliminado.',
          showConfirmButton: false,
          timer: 2500
        })
      }
    })
  }

  // validaciones de campos del formulario
  validarCampo(valor: string): boolean {
    return this.generar_planunidadForm.controls[valor].errors!
      && this.generar_planunidadForm.controls[valor].touched
  }

  cargarTodosPlanesUnidadAprobados() {
    this.planunidadService.getAllPlanUnidadesAprobados().subscribe(resp => {
      this.planunidadaprobados = resp;
      this.mostrarbtnTodos = false;
      this.mostrarbtnMisPlanes = true;
    },
      error => { console.error(error) }
    );
  }

  cargarPlanesUnidadEmpleado(estado: String) {
    this.planunidadService.getAllPlanUnidadesByEmpleado(this.id_empleado, estado).subscribe(resp => {
      if (estado == "Aprobado") {
        this.planunidadaprobados = resp;
        this.mostrarbtnTodos = true;
        this.mostrarbtnMisPlanes = false;
      } else if (estado == "Rechazado") {
        this.planunidadrechazados = resp;
      }
    },
      error => { console.error(error) }
    );
  }


}
