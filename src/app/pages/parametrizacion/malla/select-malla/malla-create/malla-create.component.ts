import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Area } from 'src/app/Model/Parametrizacion/Area';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { Curso } from 'src/app/Model/Parametrizacion/Curso';
import { Malla } from 'src/app/Model/Parametrizacion/Malla';
import { Modalidad } from 'src/app/Model/Parametrizacion/Modalidad';
import { AsignaturaService } from 'src/app/Servicio/parametrizacion/Service Asignatura/asignatura.service';
import { CursosService } from 'src/app/Servicio/parametrizacion/Service Curso/cursos.service';
import { MallaService } from 'src/app/Servicio/parametrizacion/Service Malla/malla.service';
import { PeriodoService } from 'src/app/Servicio/parametrizacion/Service Periodo/periodo.service';

@Component({
  selector: 'app-malla-create',
  templateUrl: './malla-create.component.html',
  styleUrls: ['./malla-create.component.scss'],
  providers: [MessageService, ConfirmationService],
  styles: ['padding: .25rem .5rem;  border-radius: 3px;  display: inline-flex;  margin-right: .5rem;  background-color: var(--primary-color);color: var(--primary-color-text);']
})
export class MallaCreateComponent implements OnInit {

  constructor(
    private serviceasignatura: AsignaturaService,
    private servicecurso: CursosService,
    private serivcemalla: MallaService,
    private messageService: MessageService,
    private router: Router,
    public servicePeriodo: PeriodoService,
  ) { }

  malla: Malla = new Malla;
  listAsig: Asignatura[] = [];
  selectAsignatura: Asignatura[] = [];
  listCurso: Curso[] = [];
  selectCurso: Curso[] = [];
  tipo: String = "";
  veriUpdate: Boolean = false;
  id_malla!: any;
  value1!: any;
  stateOptions!: any[];
  selectModalidad: Modalidad = new Modalidad;
  Listmodalidad!: Modalidad[];
  listarea: Area[] = [];
  selectArea: Area[] = [];

  ngOnInit(): void {
    this.id_malla = localStorage.getItem("id_malla")?.toString();
    this.selecAll();
  }

  TablasLlenas() {

    this.servicecurso.getAllCursos().subscribe(data => {
      this.listCurso = data;
    });

    this.servicePeriodo.getAllModalidad().subscribe(data => {
      this.Listmodalidad = data;
    });

    this.serviceasignatura.getAllArea().subscribe(data => {
      this.listarea = data;
    });
  }

  selecAll() {

    this.TablasLlenas();
    if (this.id_malla > 0) {
      this.selectAsignatura = new Array;
      this.serivcemalla.getidMalla(this.id_malla).subscribe(data => {
        this.malla = data;
        this.selectCurso = this.malla.listaCursos;
        this.selectModalidad = this.malla.id_modalidad
        this.selectArea=this.malla.listarea;
        this.selectAsignatura = this.malla.listaAsignaturas;
        this.veriUpdate = true;
        this.listAsig=this.malla.listaAsignaturas;
        this.tipo = "ACTUALIZAR MALLA CURRICULAR";
        this.stateOptions = [{ label: 'Activo', value: true }, { label: 'Inactivo', value: false }];
        this.value1 = this.malla.estado;
      });
    } else {
      this.veriUpdate = false;
      this.tipo = "NUEVA MALLA CURRICULAR";
    }

  }

  cancelar() {
    localStorage.setItem("id_malla", "");
    this.router.navigate(['parametrizacion/malla'])
  }

  saveAsignatura() {
    if (this.veriUpdate) {
      this.malla.listaAsignaturas = this.selectAsignatura;
      this.malla.listaCursos = this.selectCurso;
      this.malla.estado = this.value1;
      this.malla.id_modalidad = this.selectModalidad;
      this.malla.listarea=this.selectArea;
      this.serivcemalla.putMalla(this.malla).subscribe(data => {
        if (data) {
          this.messageService.add({ severity: 'success', summary: 'Actualziado', detail: 'Malla Actualizada Con Existo' });
          this.cancelar();
        }
      })
    } else {
      if (this.selectAsignatura.length === 0 || this.selectCurso.length == 0 || this.malla.descripcion == "") {
        this.messageService.add({ severity: 'error', summary: 'Error Al Guardar', detail: 'Llene todos los campos' });
      } else {
        this.malla.listaAsignaturas = this.selectAsignatura;
        this.malla.listaCursos = this.selectCurso;
        this.malla.estado = true;
        this.malla.listarea=this.selectArea;
        this.malla.id_modalidad = this.selectModalidad;
        this.serivcemalla.postMalla(this.malla).subscribe(data => {
          if (data) {
            this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Malla Creada Con Existo' });
            this.cancelar();
          }
        })
      }
    }
  }

  llenarArea() {
    this.listAsig = new Array;
    try {
      if (this.selectArea.length > 0) {
        this.selectArea.forEach(element => {
          element.listaAsignaturas.forEach(a => {
            this.listAsig.push(a);
          });
        });
      }
    } catch (error) {

    }

  }

  veriAreaAsig() {
    if (this.listAsig.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'No se ha encontrado Asignaturas', detail: 'Seleccione el area' });
    }
  }

}
