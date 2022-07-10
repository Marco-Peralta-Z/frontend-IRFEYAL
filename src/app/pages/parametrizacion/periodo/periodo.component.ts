import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { Malla } from 'src/app/Model/Parametrizacion/Malla';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { PeriodoService } from 'src/app/Servicio/parametrizacion/Service Periodo/periodo.service';
import { AsignaturasComponent } from '../asignaturas/asignaturas.component';
import { AsignaturaPeriodoComponent } from '../asignaturas/asignatura_periodo/asignatura-periodo/asignatura-periodo.component';
import { MallaCursoComponent } from '../cursos/malla_curso/malla-curso/malla-curso.component';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class PeriodoComponent implements OnInit {

  constructor(
    private serviceperiodo: PeriodoService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  malla: Malla[] = [];
  perdiodoList: Periodo[] = [];
  listAsignatura: Asignatura[] = [];
  panelAsingaturas: boolean = false;
  ref!: DynamicDialogRef;
  selectedPeriodo: Periodo[] = [];
  star!: Boolean;

  ngOnInit(): void {
    localStorage.setItem("id_periodoupdate", "");
    this.llenarTable();
  }

  llenarTable() {
    this.star=true;
    this.serviceperiodo.getAllPerdiodo().subscribe(data => {
      if(data){
        this.perdiodoList = data;
        this.star=false;
      }
    })
  }

  verAsignaturas(selectperiodo: Periodo) {
    localStorage.setItem("id_malla", selectperiodo.malla.id_malla.toString())
    this.ref = this.dialogService.open(AsignaturaPeriodoComponent, {
      header: 'Listado de Asignaturas',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

  }

  verCurso(selectperiodo: Periodo) {
    localStorage.setItem("id_malla", selectperiodo.malla.id_malla.toString())
    this.ref = this.dialogService.open(MallaCursoComponent, {
      header: 'Listado de Asignaturas',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

  }

  nuevoPeriodo() {
    this.router.navigate(['parametrizacion/periodo/new']);
  }

  deletePeriodo(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Está seguro de que desea eliminar los periodo seleccionados?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedPeriodo.forEach(element => {
          this.serviceperiodo.deltePeriodo(element).subscribe(data => {
            if (data) {
              this.messageService.add({
                severity: 'success',
                summary: 'Eliminado',
                detail: 'Periodo: Eliminado con exito',
                life: 5000
              });
              this.llenarTable();
            }
          },
            err => {
              if (err.status == 500) {
                this.messageService.add({
                  severity: 'error',
                  summary: 'No Eliminado',
                  detail: err.error.mensaje, life: 5000
                });
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Es posible que este PERIODO: ' + element.ano_inicio + '-' + element.ano_fin + ' este siendo ocupado',
                  life: 5000
                });
              }
            });
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancelado',
          detail: 'No se realizo ningun cambio'
        });
      }
    });

  }

  updatePeriodo(p: Periodo) {
    localStorage.setItem("id_periodoupdate", p.id_periodo.toString());
    this.nuevoPeriodo();
  }
}
