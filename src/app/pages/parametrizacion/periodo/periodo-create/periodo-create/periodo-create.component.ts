import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Malla } from 'src/app/Model/Parametrizacion/Malla';
import { Modalidad } from 'src/app/Model/Parametrizacion/Modalidad';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { PeriodoService } from 'src/app/Servicio/parametrizacion/Service Periodo/periodo.service';
import { MallaComponent } from '../../../malla/malla.component';
import { SelectMallasComponent } from '../../../malla/select-malla/select-mallas/select-mallas.component';

@Component({
  selector: 'app-periodo-create',
  templateUrl: './periodo-create.component.html',
  styleUrls: ['./periodo-create.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class PeriodoCreateComponent implements OnInit {

  constructor(
    private router: Router,
    public dialogService: DialogService,
    public messageService: MessageService,
    public servicePeriodo: PeriodoService,
    private datePipe: DatePipe
  ) { }

  periodo: Periodo = new Periodo;
  selectMalla: Malla = new Malla;
  ref!: DynamicDialogRef;
  select: String = "Seleccione Una Malla";
  public an: Date = new Date();
  update: Boolean = false;
  id_periodo!: any;
  tipo: String = "";
  value1!: any;
  stateOptions!: any[];
  daten: any;
  initialDate: any;
  formattedDate!: Date;
  validFecha1!: Boolean;
  validFecha2!: Boolean;
  ai: any = new Date();
  veriAI!: Boolean;

  ngOnInit(): void {
    this.id_periodo = localStorage.getItem("id_periodoupdate");
    this.selecAll();
  }

  selecAll() {
    if (this.id_periodo > 0) {
      this.servicePeriodo.getPeridoId(this.id_periodo).subscribe(data => {
        this.periodo = data;
        this.periodo.ano_inicio = new Date(data.ano_inicio);
        this.periodo.fecha_fin = new Date(data.fecha_fin);
        this.periodo.fecha_inicio = new Date(data.fecha_inicio);
        this.selectMalla = this.periodo.malla;
        this.select = this.selectMalla.descripcion.toString();
        this.update = true;
        this.tipo = "ACTUALIZAR PERIODO ACADEMICO";
        this.stateOptions = [{ label: 'Activo', value: true }, { label: 'Inactivo', value: false }];
        this.value1 = this.periodo.vigencia;
      })
    } else {
      this.update = false;
      this.tipo = "NUEVO PERIODO ACADEMICO";
    }
  }

  cancelar() {
    this.router.navigate(['parametrizacion/periodo']);
  }

  show() {
    this.ref = this.dialogService.open(SelectMallasComponent, {
      header: 'Choose a Product',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((mall: Malla) => {
      if (mall) {
        this.select = mall.descripcion.toString();
        this.selectMalla = mall;
        this.messageService.add({ severity: 'info', summary: 'ma Selected', detail: mall.descripcion.toString() });
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  savePeriodo() {
    if (this.update) {
      this.initialDate = this.datePipe.transform(this.periodo.ano_inicio, 'yyyy');
      this.daten = Number(this.initialDate) + 1;
      this.formattedDate = this.daten;
      this.periodo.ano_inicio = this.initialDate;
      this.periodo.ano_fin = this.formattedDate;
      this.periodo.vigencia = this.value1;
      this.periodo.malla = this.selectMalla;
      this.servicePeriodo.putPeriodo(this.periodo).subscribe(data => {
        if (data) {
          this.cancelar();
        }
      })
    } else {
      if (
        this.selectMalla.descripcion == ""
        || this.periodo.ano_inicio == null
        || this.periodo.fecha_inicio == null
        || this.periodo.fecha_fin == null
        || this.periodo.costo_matricula == null
        || this.periodo.costo_mensualidad == null) {

        this.messageService.add({ severity: 'error', summary: 'Error Al Guardar', detail: 'Llene todos los campos' });

      } else {
        if (this.validFecha1 && this.validFecha2 && this.veriAI) {
          this.initialDate = this.datePipe.transform(this.periodo.ano_inicio, 'yyyy');
          this.daten = Number(this.initialDate) + 1;
          this.formattedDate = this.daten;
          this.periodo.ano_inicio = this.initialDate;
          this.periodo.ano_fin = this.formattedDate;
          this.periodo.malla = this.selectMalla;
          this.periodo.vigencia = true;
          this.servicePeriodo.postPeriodo(this.periodo).subscribe(data => {
            if (data) {
              this.cancelar();
            }
          })
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error de fecha', detail: 'Las Fechas Estan Incorrectas' });
        }
      }
    }

  }

  veriFecha2() {
   if(this.veriAI){
    this.initialDate = this.datePipe.transform(this.ai, 'yyyy');
    let ac: any = this.datePipe.transform(this.periodo.ano_inicio, 'yyyy');
    let am: any = this.datePipe.transform(this.ai, 'MM');
    let a1: any = this.datePipe.transform(this.periodo.fecha_inicio, 'yyyy');
    let m1: any = this.datePipe.transform(this.periodo.fecha_inicio, 'MM');
    if (ac > a1) {
      this.messageService.add({ severity: 'error', summary: 'Error de fecha', detail: 'Seleccione una fecha con año o mes Actual o Superior' });
      this.validFecha1 = false
    } else {
      if (this.initialDate == a1) {
        if (am > m1) {
          this.messageService.add({ severity: 'error', summary: 'Error de fecha', detail: 'Seleccione una fecha con año o mes Actual o Superior' });
          this.validFecha1 = false;
        } else {
          this.validFecha1 = true;
        }
      }
    }
   }else{
    this.messageService.add({ severity: 'error', summary: 'Error de fecha', detail: 'Seleccione el año de Inicio' });
    this.validFecha1 = false;
   }
  }

  verFecha() {
    let a1: any;
    let a2: any;
    let m1: any;
    let m2: any;
    a1 = this.datePipe.transform(this.periodo.fecha_inicio, 'yyyy');

    a2 = this.datePipe.transform(this.periodo.fecha_fin, 'yyyy');

    m1 = this.datePipe.transform(this.periodo.fecha_inicio, 'MM');

    m2 = this.datePipe.transform(this.periodo.fecha_fin, 'MM');
    if (!this.validFecha1) {
      this.validFecha2 = false;
      this.messageService.add({ severity: 'error', summary: 'Error de fecha', detail: 'Seleccione la Fecha de Inicio' });
    } else {
      if (a1 < a2) {
        this.validFecha2 = true;
        this.validFecha1 = true;
      } else {
        if (a1 == a2 && m1 < m2) {
          this.validFecha2 = true;
          this.validFecha1 = true;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error de fecha', detail: 'La Fecha debe ser mayor a la Fecha de Inicio' });
          this.validFecha2 = false;
        }
      }
    }
  }

  anoInicio() {
    this.initialDate = this.datePipe.transform(this.ai, 'yyyy');
    let sel: any = this.datePipe.transform(this.periodo.ano_inicio, 'yyyy');
    if (this.initialDate > sel) {
      this.veriAI = false;
      this.messageService.add({ severity: 'error', summary: 'Error de fecha', detail: 'Seleccione un año Actual o Superior' });
    } else {
      this.veriAI = true;
    }
  }
}
