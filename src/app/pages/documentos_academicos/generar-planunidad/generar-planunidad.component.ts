import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanunidadService } from './../../../Servicio/documentacion_academica/planunidadServices/planunidad.service';
import { UnidadService } from './../../../Servicio/documentacion_academica/unidadServices/unidad.service';
import { Unidad } from '../../../Model/DocumentosAcademicos/unidad';
import { PlanUnidad } from '../../../Model/DocumentosAcademicos/plan-unidad';
import { Modalidad } from '../../../Model/Parametrizacion/Modalidad';
import { Periodo } from '../../../Model/Parametrizacion/Periodo';
import { AuthService } from './../../../Servicio/auth/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-generar-planunidad',
  templateUrl: './generar-planunidad.component.html',
  styleUrls: ['./generar-planunidad.component.scss']
})
export class GenerarPlanunidadComponent implements OnInit {
  generar_planunidadForm: FormGroup = this.fb.group({});
  id_usuario: number = 0;
  id_empleado: number = 0;
  NombreApellidoEmpleado: String = "";
  //variables para listar
  usuario: any;
  unidades: Unidad[] = [];
  asignaturas: any;
  modalidades: Modalidad[] = [];
  periodos: Periodo[] = [];
  planunidadaprobados: PlanUnidad[] = [];
  planunidadrechazados: PlanUnidad[] = [];
  planunidadpendientes: PlanUnidad[] = [];
  cursos: any;
  paralelos: any;

  aprobado: String = "Aprobado";
  rechazado: String = "Rechazado";
  pendiente: String = "Pendiente";
  id: any;

  mostrarFormGenerar: boolean = false;
  mostrarAprobados: boolean = true;
  mostrarRechazados: boolean = false;
  mostrarPendientes: boolean = false;
  mostrarBotonEnviar: boolean = true;
  mostrarCambiosEditar: boolean = false;
  mostrarObservaciones: boolean = false;
  panelEncabezado: boolean = true;
  mostrarBtnsEstados: boolean = true;
  showSelectAsig: boolean = true;
  mostrarBtnCancelGenerarPlan: boolean = false;

  // Variables para capturar el select de Unidad
  opcionSelectUnidad: any;
  verSelectUnidad: any;
  // Variables para capturar el select de Modalidades
  opcionSelectModalidad: any;
  verSelectModalidad: String = "";
  // Variables para capturar el select de Asignaturas
  opcionSelectAsig: any;
  verSelectAsigId: any;
  verSelectAsigNom: String = "";
  // Variables para capturar el select de Periodos
  opcionSelectPeriodo: any;
  verSelectPeriodoFinicio: any;
  verSelectPeriodoFfin: any;
  verSelectPeriodoMalla: String = "";
  // Variables para capturar el select de cursos
  opcionSelectCurso: any;
  verSelectCurso: String = "";
  // Variables para capturar el select de paralelos
  opcionSelectParalelo: any;
  verSelectParalelo: String = "";

  constructor(
    public fb: FormBuilder,
    public planunidadService: PlanunidadService,
    public unidadService: UnidadService,
    public authService: AuthService,
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
      observaciones: ['', Validators.required],
      unidad: ['', Validators.required],
      empleado: ['', Validators.required],
      asignatura: ['', Validators.required],
      curso: ['', Validators.required],
      paralelo: ['', Validators.required],
      modalidad: ['', Validators.required],
      periodo: ['', Validators.required],
    });

    //Cosumiendo el id del usuario desde auth.service
    this.id_usuario = this.authService.usuario.id_usuario;

    this.planunidadService.getUsuario(this.id_usuario).subscribe(resp => {
      this.usuario = resp;
      this.id_empleado = this.usuario.empleado.id_empleado;
      this.NombreApellidoEmpleado = this.usuario.empleado.persona.nombre + " " + this.usuario.empleado.persona.apellido;
      this.cargarPlanesUnidadEmpleado(this.aprobado);
      this.cargarPlanesUnidadEmpleado(this.pendiente);
      this.cargarPlanesUnidadEmpleado(this.rechazado);
    },
      error => { console.error(error) }
    );

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

    //Captura los cambios en el select de periodo para luego mostrar la asignaturar de acuerdo a la Malla
    this.generar_planunidadForm.get("periodo")?.valueChanges.subscribe(value => {
      if (value != null) {
        this.planunidadService.getAllAsignaturasByMalla(value.malla.id_malla).subscribe(resp => {
          this.asignaturas = resp;
          this.showSelectAsig = false;
        },
          error => { console.error(error) }
        );
      } else if (value == null) {
        this.asignaturas = null;
        this.opcionSelectAsig = null;
        this.showSelectAsig = true;
      }
    });

  }

  capturarSelectUnidad() {
    // Pasamos el valor seleccionado a la variable verSelectUnidad
    if (this.opcionSelectUnidad != null) {
      this.verSelectUnidad = this.opcionSelectUnidad.idUnidad;
    }
  }

  capturarSelectPeriodo() {
    // Pasamos el valor seleccionado a la variable verSeleccionPeriodoMalla
    if (this.opcionSelectPeriodo != null) {
      this.verSelectPeriodoFinicio = this.opcionSelectPeriodo.fecha_inicio
      this.verSelectPeriodoFfin = this.opcionSelectPeriodo.fecha_fin;
      this.verSelectPeriodoMalla = this.opcionSelectPeriodo.malla.descripcion;
    }
  }

  capturarSelectModalidad() {
    // Pasamos el valor seleccionado a la variable verSelectModalidad
    if (this.opcionSelectModalidad != null) {
      this.verSelectModalidad = this.opcionSelectModalidad.descripcion;
    }
  }

  capturarSelectCurso() {
    // Pasamos el valor seleccionado a la variable verSeleccionCurso
    if (this.opcionSelectCurso != null) {
      this.verSelectCurso = this.opcionSelectCurso.descripcion;
    }
  }

  capturarSelectParalelo() {
    // Pasamos el valor seleccionado a la variable verSeleccionParalelo
    if (this.opcionSelectParalelo != null) {
      this.verSelectParalelo = this.opcionSelectParalelo.descripcion;
    }

  }

  capturarSelectAsig() {
    // Pasamos el id y descripcion del valor seleccionado a la variable verSeleccion verSelectAsigId y verSelectAsigNom
    if (this.opcionSelectAsig != null) {
      this.verSelectAsigId = this.opcionSelectAsig.id_asignatura;
      this.verSelectAsigNom = this.opcionSelectAsig.descripcion;
    }
  }


  verFormGenerar() {
    this.panelEncabezado = true;
    this.mostrarBtnCancelGenerarPlan = true;
    this.mostrarBtnsEstados = false;
    this.mostrarFormGenerar = true;
    this.mostrarAprobados = false;
    this.mostrarRechazados = false;
    this.mostrarObservaciones = false;
    this.mostrarPendientes = false;
  }

  verTablaAprobados() {
    this.mostrarAprobados = true;
    this.mostrarBtnsEstados = true;
    this.mostrarFormGenerar = false;
    this.mostrarRechazados = false;
    this.mostrarPendientes = false;
    this.mostrarBtnCancelGenerarPlan = false;
    this.cargarPlanesUnidadEmpleado(this.aprobado);
  }

  verTablaRechazados() {
    this.mostrarRechazados = true;
    this.mostrarBtnsEstados = true;
    this.mostrarFormGenerar = false;
    this.mostrarAprobados = false;
    this.mostrarPendientes = false;
    this.mostrarBtnCancelGenerarPlan = false;
    this.cargarPlanesUnidadEmpleado(this.rechazado);
  }

  verTablaPendientes() {
    this.mostrarPendientes = true;
    this.mostrarBtnsEstados = true;
    this.mostrarFormGenerar = false;
    this.mostrarAprobados = false;
    this.mostrarRechazados = false;
    this.mostrarBtnCancelGenerarPlan = false;
    this.cargarPlanesUnidadEmpleado(this.pendiente);
  }

  enviar(): void {
    if (this.verificarForm() == false) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Plan de Unidad No Enviado, llene todos los campos',
        showConfirmButton: false,
        timer: 2500
      })
    } else {
      //Controlar que el plan de unidad no se repita, parametros(id_unidad, id_asig, id_curso,id_paralelo, id_periodo, id_modalidad)
      this.planunidadService.verificarPlanUnidad(this.generar_planunidadForm.value.unidad.idUnidad,
        this.generar_planunidadForm.value.asignatura.id_asignatura, this.generar_planunidadForm.value.curso.id_curso,
        this.generar_planunidadForm.value.paralelo.id_paralelo, this.generar_planunidadForm.value.periodo.id_periodo,
        this.generar_planunidadForm.value.modalidad.id_modalidad).subscribe(resp => {
          if (resp == false) {
            this.generar_planunidadForm.value.empleado = this.id_empleado;
            this.generar_planunidadForm.value.estado = "Pendiente";
            this.generar_planunidadForm.value.observaciones = "Sin observaciones";
            this.planunidadService.savePlanUnidad(this.generar_planunidadForm.value).subscribe(resp => {
              this.cleanForm();
              this.mostrarPendientes = true;
              this.mostrarFormGenerar = false;
              this.mostrarBtnsEstados = true;
              this.mostrarBtnCancelGenerarPlan = false;
              //Actualizar tablas
              this.cargarDatos();
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
                  title: 'Plan de Unidad no enviado, ocurrio un error',
                  showConfirmButton: false,
                  timer: 2500
                })
              }
            )
          } else if (resp == true) {
            //Alerta error
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Ya existe un Plan de Unidad similar para la:',
              text: "Unidad " + this.generar_planunidadForm.value.unidad.idUnidad +
                ' de ' + this.generar_planunidadForm.value.asignatura.descripcion +
                ' del ' + this.generar_planunidadForm.value.curso.descripcion +
                ' - ' + this.generar_planunidadForm.value.paralelo.descripcion +
                ' de modalidad ' + this.generar_planunidadForm.value.modalidad.descripcion
            })
          }
        },
          error => {
            console.error(error)
            //Alerta error
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Plan de Unidad No Enviado, ocurrio un error',
              showConfirmButton: false,
              timer: 2500
            })
          }
        );
    }
  }

  guardaredit() {
    if (this.verificarForm() == false) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Plan de Unidad No modificado, llene todos los campos',
        showConfirmButton: false,
        timer: 2500
      })
    } else {
      this.generar_planunidadForm.value.estado = "Pendiente";
      this.planunidadService.updatePlanUnidad(this.id, this.generar_planunidadForm.value).subscribe(resp => {
        this.cleanForm();
        //Mostramos el btn Enviar y ocultamos btn Guardar Cambios y  btn Cancelar
        this.mostrarBotonEnviar = true;
        this.mostrarCambiosEditar = false;
        this.mostrarFormGenerar = false;
        this.mostrarRechazados = true;
        this.mostrarBtnsEstados = true;
        this.mostrarBtnCancelGenerarPlan = false;
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
        this.cleanForm();
        //Mostramos el btn Enviar y ocultamos btn Guardar Cambios y  btn Cancelar
        this.mostrarBotonEnviar = true;
        this.mostrarCambiosEditar = false;
        this.mostrarFormGenerar = false;
        this.mostrarRechazados = true;
        this.mostrarBtnsEstados = true;
        this.mostrarBtnCancelGenerarPlan = false;
      }
    })
  }

  cancelarGenerar() {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Cancelar creacion de nuevo Plan de Unidad!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Cancelar!',
      cancelButtonText: 'No, Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cleanForm();
        this.verTablaAprobados();
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
      observaciones: plan_unidad.observaciones,
      unidad: plan_unidad.unidad,
      empleado: plan_unidad.empleado,
      curso: plan_unidad.curso,
      paralelo: plan_unidad.paralelo,
      modalidad: plan_unidad.modalidad,
      periodo: plan_unidad.periodo,
      asignatura: plan_unidad.asignatura
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
    this.verSelectPeriodoFinicio = plan_unidad.periodo.fecha_inicio;
    this.verSelectPeriodoFfin = plan_unidad.periodo.fecha_fin;
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
    this.mostrarObservaciones = true;
    this.panelEncabezado = false;
    this.mostrarBtnsEstados = false;
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

  // validaciones de campos del formulario para mostrar mensaje (Campo obligatori)
  validarCampo(valor: string): boolean {
    return this.generar_planunidadForm.controls[valor].errors!
      && this.generar_planunidadForm.controls[valor].touched
  }

  cargarPlanesUnidadEmpleado(estado: String) {
    this.planunidadService.getAllPlanUnidadesByEmpleado(this.id_empleado, estado).subscribe(resp => {
      if (estado == "Aprobado") {
        this.planunidadaprobados = resp;
      } else if (estado == "Rechazado") {
        this.planunidadrechazados = resp;
      } else if (estado == "Pendiente") {
        this.planunidadpendientes = resp;
      }
    },
      error => { console.error(error) }
    );
  }

  reportePDFplanUnidad(planUnidad: any) {
    this.planunidadService.createPDFplanunidad(planUnidad).subscribe(resp => {
      //Alerta success
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Plan de Unidad Descargado!',
        text: 'El pdf se encuentra en la carpeta de Descargas',
        showConfirmButton: false,
        timer: 3000
      })
    },
      error => {
        console.error(error)
        //Alerta error
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al descargar el plan de unidad',
          showConfirmButton: false,
          timer: 2500
        })
      }
    );
  }

  cleanForm() {
    //Receteamos el formulario
    this.generar_planunidadForm.reset();
    //Receteamos los Etiquetas del encabezado
    this.opcionSelectUnidad = null;
    this.opcionSelectModalidad = null;
    this.opcionSelectPeriodo = null;
    this.opcionSelectCurso = null;
    this.opcionSelectParalelo = null;
    this.opcionSelectAsig = null;
  }

  //verificar los campos vacios del formulario
  verificarForm(): boolean {
    if (this.opcionSelectUnidad == null ||
      this.opcionSelectModalidad == null ||
      this.opcionSelectPeriodo == null ||
      this.opcionSelectCurso == null ||
      this.opcionSelectParalelo == null ||
      this.opcionSelectAsig == null ||
      this.generar_planunidadForm.get("fecha_inicio")?.value == "" ||
      this.generar_planunidadForm.get("fecha_fin")?.value == "" ||
      this.generar_planunidadForm.get("titulo_unidad")?.value == "" ||
      this.generar_planunidadForm.get("objetivos")?.value == "" ||
      this.generar_planunidadForm.get("contenidos")?.value == "" ||
      this.generar_planunidadForm.get("criterios_evaluacion")?.value == "" ||
      this.generar_planunidadForm.get("destrezas")?.value == "") {
      return false;
    } else {
      return true;
    }
  }
}
