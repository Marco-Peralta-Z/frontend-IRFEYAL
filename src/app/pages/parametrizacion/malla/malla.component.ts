import { Component, OnInit } from '@angular/core';
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
  providers: [MessageService, ConfirmationService,DialogService]
})
export class MallaComponent implements OnInit {

  constructor(private servicemalla: MallaService, private serviceperiodo: PeriodoService,public dialogService: DialogService) { }
  malla: Malla[] = [];
  peridos!: Periodo[];
  selecperiodo!: Periodo;
  ref!: DynamicDialogRef;
  ngOnInit(): void {
    this.servicemalla.getAllMalla().subscribe(data => {
      this.malla = data;
    })

  }

  verAsignaturas(selectmalla:Malla) {
    localStorage.setItem("id_malla",selectmalla.id_malla.toString())
    this.ref = this.dialogService.open(AsignaturaPeriodoComponent , {
      header: 'Listado de Asignaturas',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
  });
  }
  
  verCursos(selectmalla:Malla) {
    localStorage.setItem("id_malla",selectmalla.id_malla.toString())
    this.ref = this.dialogService.open(MallaCursoComponent , {
      header: 'Listado de Asignaturas',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
  });

  }
}
