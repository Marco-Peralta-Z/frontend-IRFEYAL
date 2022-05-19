import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { Malla } from 'src/app/Model/Parametrizacion/Malla';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { MallaService } from 'src/app/Servicio/parametrizacion/Service Malla/malla.service';
import { PeriodoService } from 'src/app/Servicio/parametrizacion/Service Periodo/periodo.service';
import { AsignaturasComponent } from '../asignaturas/asignaturas.component';
import { AsignaturaPeriodoComponent } from '../asignaturas/asignatura_periodo/asignatura-periodo/asignatura-periodo.component';
import { MallaCursoComponent } from '../cursos/malla_curso/malla-curso/malla-curso.component';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss'],
  providers: [MessageService, ConfirmationService,DialogService]
})
export class PeriodoComponent implements OnInit {

  constructor( private serviceperiodo: PeriodoService,public dialogService: DialogService, public messageService: MessageService) { }
  malla: Malla[] = [];
  perdiodoList: Periodo[] = [];
  listAsignatura: Asignatura[] = [];
  panelAsingaturas: boolean = false;
  ref!: DynamicDialogRef;
  ngOnInit(): void {
    this.serviceperiodo.getAllPerdiodo().subscribe(data => {
      this.perdiodoList = data;
    })
  }

  verAsignaturas(selectperiodo: Periodo) {
    localStorage.setItem("id_malla",selectperiodo.malla.id_malla.toString())
    this.ref = this.dialogService.open(AsignaturaPeriodoComponent , {
      header: 'Listado de Asignaturas',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
  });

  }
 
}
