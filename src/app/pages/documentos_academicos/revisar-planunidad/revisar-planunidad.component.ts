import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanunidadService } from './../../../Servicio/documentacion_academica/planunidadServices/planunidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-revisar-planunidad',
  templateUrl: './revisar-planunidad.component.html',
  styleUrls: ['./revisar-planunidad.component.scss']
})
export class RevisarPlanunidadComponent implements OnInit {
  revisar_planunidadForm: FormGroup = this.fb.group({});
  planunidadpendientes: any;
  //Variables para guardar los campos
  id: any;
  //Variable para mostrar u ocultar el formulario y tabla
  mostrarForm: boolean = false;
  mostrarTablePendientes: boolean = true;

  //Tamaño de textarea
  autoResize: boolean = true;

  //Variables para mostrar los datos en los labels
  verUnidad: any;
  verEmpleado: String = "";
  verModalidad: any;
  verPeriodoMalla: any;
  verAsigNom: any;
  verAsigId: any;
  verCurso: any;
  verParalelo: any;


  constructor(
    public fb: FormBuilder,
    public planunidadService: PlanunidadService,
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.revisar_planunidadForm = this.fb.group({
      id_plan_unidad: [''],
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
    this.revisar_planunidadForm?.disable();

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
    //Mostramos el formulario y ocultamos la tabla
    this.mostrarForm = true;
    this.mostrarTablePendientes = false;
    //Pasamos el id del plan a la variable (id) 
    this.id = plan_unidad.id_plan_unidad;
    //Cargamos los labels
    this.verUnidad = plan_unidad.unidad.idUnidad;
    this.verEmpleado = plan_unidad.empleado.persona.nombre + " " + plan_unidad.empleado.persona.apellido;
    this.verModalidad = plan_unidad.modalidad.descripcion;
    this.verPeriodoMalla = plan_unidad.periodo.malla.descripcion;
    this.verAsigNom = plan_unidad.asignatura.descripcion;
    this.verAsigId = plan_unidad.asignatura.id_asignatura;
    this.verCurso = plan_unidad.curso.descripcion;
    this.verParalelo = plan_unidad.paralelo.descripcion;
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
        this.planunidadService.updatePlanUnidad(this.id, this.revisar_planunidadForm.value).subscribe(resp => {
          this.revisar_planunidadForm.reset();
          //Ocultamos el formulario y mostramos la tabla
          this.mostrarForm = false;
          this.mostrarTablePendientes = true;
          //Actualizar tabla
          this.cargarDatos();
        },
          error => { console.error(error) }
        )
        Swal.fire({
          icon: 'success',
          title: 'Aprobado!',
          text: 'El Plan de unidad ha sido Aprobado.',
          showConfirmButton: false,
          timer: 2500
        })
      }
    })
  }

  rechazar() {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Rechazar Plan de Unidad!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Confirmar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.revisar_planunidadForm.value.estado = "Rechazado";
        this.planunidadService.updatePlanUnidad(this.id, this.revisar_planunidadForm.value).subscribe(resp => {
          this.revisar_planunidadForm.reset();
          //Ocultamos el formulario y mostramos la tabla
          this.mostrarForm = false;
          this.mostrarTablePendientes = true;
          //Actualizar tabla
          this.cargarDatos();
        },
          error => { console.error(error) }
        )
        Swal.fire({
          icon: 'success',
          title: 'Rechazado!',
          text: 'El Plan de unidad ha sido Rechazado.',
          showConfirmButton: false,
          timer: 2500
        })
      }
    })
  }

  retroceder() {
    //Ocultamos el formulario y mostramos la tabla
    this.mostrarForm = false;
    this.mostrarTablePendientes = true;
  }

}
