import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Malla } from 'src/app/Model/Parametrizacion/Malla';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { MallaService } from 'src/app/Servicio/parametrizacion/Service Malla/malla.service';
import { PeriodoService } from 'src/app/Servicio/parametrizacion/Service Periodo/periodo.service';
import { AsignaturaPeriodoComponent } from '../asignaturas/asignatura_periodo/asignatura-periodo/asignatura-periodo.component';
import { MallaCursoComponent } from '../cursos/malla_curso/malla-curso/malla-curso.component';

@Component({
  selector: 'app-malla',
  templateUrl: './malla.component.html',
  styleUrls: ['./malla.component.scss'],
  styles: [`
      :host ::ng-deep .p-dialog .product-image {
          width: 150px;
          margin: 0 auto 2rem auto;
          display: block;
      }
  `],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class MallaComponent implements OnInit {

  constructor(
    private servicemalla: MallaService,
    private serviceperiodo: PeriodoService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private router: Router) { }

  malla: Malla[] = [];
  peridos!: Periodo[];
  selecperiodo!: Periodo;
  ref!: DynamicDialogRef;
  
  ngOnInit(): void {
    localStorage.setItem("id_malla",'');
    this.llenartabla();
  }

  llenartabla() {
    this.servicemalla.getAllMalla().subscribe(data => {
      this.malla = data;
      console.log(this.malla);
    })
  }

  verAsignaturas(selectmalla: Malla) {
    localStorage.setItem("id_malla", selectmalla.id_malla.toString())
    this.ref = this.dialogService.open(AsignaturaPeriodoComponent, {
      header: 'Listado de Asignaturas',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
  }

  verCursos(selectmalla: Malla) {
    localStorage.setItem("id_malla", selectmalla.id_malla.toString())
    this.ref = this.dialogService.open(MallaCursoComponent, {
      header: 'Listado de Asignaturas',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });
  }

  nuevaMalla() {
    this.router.navigate(['parametrizacion/malla/new']);
  }

  deleteMalla(m: Malla, event: Event) {
    this.confirmation.confirm({
      target: event.target as EventTarget,
      message: 'Estas Seguro Que Deseas Eliminar Esta Malla?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.servicemalla.delteMalla(m).subscribe(data => {
          if (data) {
            this.llenartabla();
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Eliminado' });
          } else {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'No se Eliminado' });
          }
        },
        err => {
          if (err.status == 500) {
            console.log(err)
            this.messageService.add({ severity: 'error', summary: 'No Eliminado', detail: err.error.mensaje });
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Es posible que este MALLA este siendo ocupado' });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Cancelado' });
      }
    });
  }

  updateAsignatura(m: Malla) {
    localStorage.setItem("id_malla", m.id_malla.toString());
    this.nuevaMalla();
  }
}
