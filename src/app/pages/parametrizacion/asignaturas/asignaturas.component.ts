import { Component, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/Model/Parametrizacion/Area';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { AsignaturaService } from 'src/app/Servicio/parametrizacion/Service Asignatura/asignatura.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.scss'],
  styles: [`
      :host ::ng-deep .p-dialog .product-image {
          width: 150px;
          margin: 0 auto 2rem auto;
          display: block;
      }
  `],
  providers: [MessageService, ConfirmationService]
})
export class AsignaturasComponent implements OnInit {
  @ViewChild('dt') table!: Table;
  constructor(
    private serviceasig: AsignaturaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  items: MenuItem[] = [];
  activeItem!: MenuItem;
  listasig: Asignatura[] = [];
  asig: Asignatura = new Asignatura;
  panelAsig: boolean = false;
  panelAsigUpdate: boolean = false;
  submitted: boolean = false;
  empleados: empleado[] = [];
  asig2: Asignatura = new Asignatura
  listarea: Area[] = [];
  selectArea!: Area;
  
  ngOnInit(): void {
    this.activeItem = this.items[0];
    this.llenarTabalAsignatura();
  }

  veriAsign: Boolean = true;
  vertabla() {
    if (!this.veriAsign || this.selectArea != null) {
      this.listasig = this.selectArea.listaAsignaturas;
      this.veriAsign = false;
    }
  }

  llenarTabalAsignatura() {

    this.serviceasig.getEmpleados().subscribe(data => {
      this.empleados = new Array();
      for (let index = 0; index < data.length; index++) {
        if (data[index].cargo == "contratacion_docente") {
          this.empleados.push(data[index]);
        }

      }
      this.empleados.sort();
    })

    this.serviceasig.getAllArea().subscribe(data => {
      this.listarea = data.sort();
    })
  }

  nuevaAsig() {
    this.asig = new Asignatura;
    this.panelAsig = true;
    this.submitted = false;
    this.empleados = new Array;
    this.selecempleadodoc = new Array
    this.llenarTabalAsignatura();
  }

  updateAsig(a: Asignatura) {
    this.panelAsigUpdate = true;
    this.submitted = false;
    this.asig = a;
    this.selecempleadodoc = this.asig.empleados
  }

  cancelar() {
    this.asig = new Asignatura;
    this.panelAsig = false;
    this.panelAsigUpdate = false;
    this.selectArea = new Area;
    this.veriAsign = true;
    this.listasig = new Array;
    this.llenarTabalAsignatura();
  }

  saveasignatura() {
    if (this.asig.descripcion == null) {
      this.submitted = true;
    } else {
      this.selecempleadodoc.forEach(element => {
        this.asig.empleados.push(element)
      });
      this.serviceasig.createAsignatura(this.asig).subscribe(data => {
        if (data != null) {
          this.selectArea.listaAsignaturas.push(data.asignatura);
          this.serviceasig.UpdateArea(this.selectArea).subscribe(data => {
            if (data) {
              this.cancelar();
            }
          })
        }
      })
    }
  }

  updateAsign() {
    if (this.asig.descripcion == null) {
      this.submitted = true;
    } else {
      this.selecempleadodoc.forEach(element => {
        this.asig.empleados.push(element)
      });
      this.serviceasig.updateAsignatura(this.asig).subscribe(data => {
        if (data != null) {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Actualizacion Correcta' });
          this.cancelar();
        }
      })
    }
  }

  deleteAsig(a: Asignatura, event: Event) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Estas Seguro Que Deseas Eliminar Esta Asignatura?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let index = 0; index < this.selectArea.listaAsignaturas.length; index++) {
          if (a.id_asignatura == this.selectArea.listaAsignaturas[index].id_asignatura) {
            this.selectArea.listaAsignaturas.splice(index, 1);
            this.serviceasig.UpdateArea(this.selectArea).subscribe(data => {
              if (data) {

              }
            })
            break

          }
        }
        this.serviceasig.deleteAsig(a).subscribe(data => {
          if (data) {
            this.cancelar()
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Eliminado' });
          } else {

            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'No se Eliminado' });
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Cancelado' });
      }
    });
  }

  //Asignaturas y Empleados

  a!: Asignatura;
  selecempleadodoc: empleado[] = [];

  asigna(a1: Asignatura) {
    this.a = a1;
  }

  paneldeletedocenteasig(empe: empleado) {
    for (let index = 0; index < this.a.empleados.length; index++) {
      if (this.a.empleados[index].id_empleado == empe.id_empleado) {
        this.a.empleados.splice(index, 1);
        this.serviceasig.updateAsignatura(this.a).subscribe(data => {
          if (data != null) {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Docente Eliminado Correctamente' });
            this.cancelar();
          }
        })
      }

    }
  }


}
