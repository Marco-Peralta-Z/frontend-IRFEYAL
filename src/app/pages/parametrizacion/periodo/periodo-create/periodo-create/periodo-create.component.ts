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

  ngOnInit(): void {
    this.id_periodo = localStorage.getItem("id_periodoupdate");
    this.selecAll();
  }

  llenarTablas() {

  }

  selecAll() {

    this.llenarTablas()
    if (this.id_periodo > 0) {
      this.servicePeriodo.getPeridoId(this.id_periodo).subscribe(data => {
        this.periodo = data;
        this.periodo.ano_inicio = new Date(data.ano_inicio);
        this.periodo.fecha_fin = new Date(data.fecha_fin);
        this.periodo.fecha_inicio = new Date(data.fecha_inicio);
        this.selectMalla = this.periodo.malla;
        this.select = this.selectMalla.descripcion.toString();
        //this.selectModalidad = this.periodo.modalidad;
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

  daten: any;
  initialDate: any;
  formattedDate!: Date;
  savePeriodo() {
    if (this.update) {
      this.initialDate = this.datePipe.transform(this.periodo.ano_inicio, 'yyyy');
      this.daten = Number(this.initialDate) + 1;
      this.formattedDate = this.daten;
      this.periodo.ano_fin = this.formattedDate;
      this.periodo.vigencia = this.value1;
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
        if (this.validFecha1 && this.validFecha2) {
          this.initialDate = this.datePipe.transform(this.periodo.ano_inicio, 'yyyy');
          this.daten = Number(this.initialDate) + 1;
          this.formattedDate = this.daten;
          this.periodo.ano_fin = this.formattedDate;
          this.periodo.malla = this.selectMalla;
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
  validFecha1!: Boolean;
  validFecha2!: Boolean;

  veriFecha2() {
    this.validFecha1 = true;
  }

  verFecha() {
    let d1: any;
    let d2: any;
    this.initialDate = this.datePipe.transform(this.periodo.fecha_inicio, 'dd-MM-yyyy');
    d1 = this.initialDate;

    this.initialDate = this.datePipe.transform(this.periodo.fecha_fin, 'dd-MM-yyyy');
    d2 = this.initialDate;

    if (d1 < d2) {
      this.validFecha2 = true;
      this.validFecha1 = true;
    } else {
      if (this.validFecha1) {
        this.messageService.add({ severity: 'error', summary: 'Error de fecha', detail: 'La Fecha debe ser mayor a la Fecha de Inicio' });

      } else {
        this.messageService.add({ severity: 'error', summary: 'Error de fecha', detail: 'Seleccione la Fecha de Inicio' });
        this.validFecha1 = false;
      }
    }
  }

}
