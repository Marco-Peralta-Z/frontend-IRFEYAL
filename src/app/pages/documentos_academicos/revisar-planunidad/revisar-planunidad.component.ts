import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanunidadService } from './../../../Servicio/documentacion_academica/planunidadServices/planunidad.service';
import { PlanUnidad } from '../../../Model/DocumentosAcademicos/plan-unidad';
import { AuthService } from './../../../Servicio/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-revisar-planunidad',
  templateUrl: './revisar-planunidad.component.html',
  styleUrls: ['./revisar-planunidad.component.scss']
})
export class RevisarPlanunidadComponent implements OnInit {
  revisar_planunidadForm: FormGroup = this.fb.group({});
  id_usuario: number = 0;
  id_empleado: number = 0;
  NombreApellidoEmpleado: String = "";
  usuario: any;
  planunidadpendientes: PlanUnidad[] = [];
  //Variables para guardar los campos
  id: any;
  //Variable para mostrar u ocultar el formulario y tabla
  mostrarForm: boolean = false;
  mostrarTablePendientes: boolean = true;
  mostrarObservaciones: boolean = false;
  mostrarObservacionesAnt: boolean = false;
  btnRegresarEnviar: boolean = false;
  mostrarmsg: boolean = false;

  today: Date = new Date();

  //Tamaño de textarea
  autoResize: boolean = true;

  verCoorAcademico: any;
  verFechaRevision: any;
  //Variables para mostrar los datos en los labels
  verObservaciones: any;
  verUnidad: any;
  verFechaCreacion: any;
  verEmpleado: String = "";
  verPeriodoFinicio: any;
  verPeriodoFfin: any;
  verModalidad: any;
  verPeriodoMalla: any;
  verAsigNom: any;
  area: any;
  verCurso: any;
  verParalelo: any;
  verNumPeriodos: any;


  constructor(
    public fb: FormBuilder,
    public planunidadService: PlanunidadService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.revisar_planunidadForm = this.fb.group({
      id_plan_unidad: ['', Validators.required],
      titulo_unidad: ['', Validators.required],
      fecha_creacion: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      num_periodos: ['', Validators.required],
      objetivos: ['', Validators.required],
      criterios_evaluacion: ['', Validators.required],
      destrezas: ['', Validators.required],
      act_experiencia: ['', Validators.required],
      act_reflexion: ['', Validators.required],
      act_conceptualizacion: ['', Validators.required],
      act_aplicacion: ['', Validators.required],
      recursos: ['', Validators.required],
      indicadores: ['', Validators.required],
      tecnicas: ['', Validators.required],
      adaptaciones_curriculares: ['', Validators.required],
      adap_necesidad_educativa: ['', Validators.required],
      especificacion_nesesidad: ['', Validators.required],
      estado: ['', Validators.required],
      observaciones: ['', Validators.required],
      coor_academico: ['', Validators.required],
      fecha_revision: ['', Validators.required],
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
      //this.id_empleado = this.usuario.empleado.id_empleado;
      this.NombreApellidoEmpleado = this.usuario.empleado.persona.nombre + " " + this.usuario.empleado.persona.apellido;
    },
      error => { console.error(error) }
    );

    this.planunidadService.getAllPlanUnidadesPendientes().subscribe(resp => {
      this.planunidadpendientes = resp;
    },
      error => { console.error(error) }
    );
  }

  abrir(plan_unidad: any) {
    this.revisar_planunidadForm.setValue({
      id_plan_unidad: plan_unidad.id_plan_unidad,
      titulo_unidad: plan_unidad.titulo_unidad,
      fecha_creacion: plan_unidad.fecha_creacion,
      fecha_inicio: plan_unidad.fecha_inicio,
      fecha_fin: plan_unidad.fecha_fin,
      num_periodos: plan_unidad.num_periodos,
      objetivos: plan_unidad.objetivos,
      criterios_evaluacion: plan_unidad.criterios_evaluacion,
      destrezas: plan_unidad.destrezas,
      act_experiencia: plan_unidad.act_experiencia,
      act_reflexion: plan_unidad.act_reflexion,
      act_conceptualizacion: plan_unidad.act_conceptualizacion,
      act_aplicacion: plan_unidad.act_aplicacion,
      recursos: plan_unidad.recursos,
      indicadores: plan_unidad.indicadores,
      tecnicas: plan_unidad.tecnicas,
      adaptaciones_curriculares: plan_unidad.adaptaciones_curriculares,
      adap_necesidad_educativa: plan_unidad.adap_necesidad_educativa,
      especificacion_nesesidad: plan_unidad.especificacion_nesesidad,
      estado: plan_unidad.estado,
      observaciones: "",
      coor_academico: plan_unidad.coor_academico,
      fecha_revision: plan_unidad.fecha_revision,
      unidad: plan_unidad.unidad,
      empleado: plan_unidad.empleado,
      curso: plan_unidad.curso,
      paralelo: plan_unidad.paralelo,
      modalidad: plan_unidad.modalidad,
      periodo: plan_unidad.periodo,
      asignatura: plan_unidad.asignatura
    });
    //Mostramos el formulario y ocultamos la tabla
    this.mostrarForm = true;
    this.mostrarTablePendientes = false;
    //Pasamos el id del plan a la variable (id) 
    this.id = plan_unidad.id_plan_unidad;
    //Cargamos los labels
    this.verObservaciones = plan_unidad.observaciones;
    this.verUnidad = plan_unidad.unidad.idUnidad;
    this.verFechaCreacion = plan_unidad.fecha_creacion;
    this.verCoorAcademico = plan_unidad.coor_academico;
    this.verFechaRevision = plan_unidad.fecha_revision;
    this.verEmpleado = plan_unidad.empleado.persona.nombre + " " + plan_unidad.empleado.persona.apellido;
    this.verPeriodoFinicio = plan_unidad.periodo.fecha_inicio;
    this.verPeriodoFfin = plan_unidad.periodo.fecha_fin;
    this.verModalidad = plan_unidad.modalidad.descripcion;
    this.verPeriodoMalla = plan_unidad.periodo.malla.descripcion;
    this.verAsigNom = plan_unidad.asignatura.descripcion;
    this.verCurso = plan_unidad.curso.descripcion;
    this.verParalelo = plan_unidad.paralelo.descripcion;
    this.verNumPeriodos = plan_unidad.num_periodos;

    this.planunidadService.getAllAreaByAsignatura(plan_unidad.asignatura.id_asignatura).subscribe(resp => {
      this.area = resp.descripcion;
    },
      error => { console.error(error) }
    );

    if (this.verObservaciones != "Sin observaciones") {
      this.mostrarObservacionesAnt = true;
    } else {
      this.mostrarObservacionesAnt = false;
    }
  }

  aprobar() {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Aprobar Plan de Unidad!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.revisar_planunidadForm.value.estado = "Aprobado";
        this.revisar_planunidadForm.value.coor_academico = this.NombreApellidoEmpleado;
        this.revisar_planunidadForm.value.fecha_revision = this.today;
        this.revisar_planunidadForm.value.observaciones = "Sin observaciones";
        this.planunidadService.updatePlanUnidad(this.id, this.revisar_planunidadForm.value).subscribe(resp => {
          this.revisar_planunidadForm.reset();
          //Ocultamos el formulario y mostramos la tabla
          this.mostrarForm = false;
          this.mostrarTablePendientes = true;
          //Actualizar tabla
          this.cargarDatos();
          Swal.fire({
            icon: 'success',
            title: 'Aprobado!',
            text: 'El Plan de unidad ha sido Aprobado.',
            showConfirmButton: false,
            timer: 2500
          })
        },
          error => { console.error(error) }
        )
      }
    })
  }

  abrirObservaciones() {
    this.mostrarObservaciones = true;
    this.btnRegresarEnviar = true;
  }

  cancelarObs() {
    this.mostrarObservaciones = false;
    this.btnRegresarEnviar = false;
  }

  rechazar() {
    if (this.revisar_planunidadForm.value.observaciones != "") {
      Swal.fire({
        title: 'Esta seguro?',
        text: "Rechazar Plan de unidad y enviar observaciones",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Confirmar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.revisar_planunidadForm.value.estado = "Rechazado";
          this.revisar_planunidadForm.value.coor_academico = this.NombreApellidoEmpleado;
          this.revisar_planunidadForm.value.fecha_revision = this.today;
          this.planunidadService.updatePlanUnidad(this.id, this.revisar_planunidadForm.value).subscribe(resp => {
            this.revisar_planunidadForm.reset();
            //Ocultamos el formulario y mostramos la tabla
            this.mostrarForm = false;
            this.mostrarObservaciones = false;
            this.btnRegresarEnviar = false;
            this.mostrarTablePendientes = true;
            //Actualizar tabla
            this.cargarDatos();
            Swal.fire({
              icon: 'success',
              title: 'Rechazado!',
              text: 'El Plan de unidad ha sido Rechazado.',
              showConfirmButton: false,
              timer: 2500
            })
          },
            error => { console.error(error) }
          )
        }
      })
    } else {
      this.mostrarmsg = true;
    }

  }

  retroceder() {
    //Ocultamos el formulario y mostramos la tabla
    this.mostrarForm = false;
    this.mostrarTablePendientes = true;
  }

  validarCampo(valor: string): boolean {
    return this.revisar_planunidadForm.controls[valor].errors!
      && this.revisar_planunidadForm.controls[valor].touched
  }

}
