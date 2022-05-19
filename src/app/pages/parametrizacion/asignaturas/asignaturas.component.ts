import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { Asignatura_Empleado } from 'src/app/Model/Parametrizacion/Asignatura_Empleado';
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
  constructor(private serviceasig: AsignaturaService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  asigemp: Asignatura_Empleado[] = [];
  items: MenuItem[] = [];
  activeItem!: MenuItem;
  listasig: Asignatura[] = [];
  asig: Asignatura = new Asignatura;
  ac1: boolean = false;
  ac2: boolean = false;
  ac3: boolean = false;
  panelAsig: boolean = false;
  panelAsigUpdate: boolean = false;
  submitted: boolean = false;
  empelados: empleado[] = [];
  asig2: Asignatura = new Asignatura

  ngOnInit(): void {
    this.ac1 = true;
    this.items = [
      {
        label: 'Asignaturas', icon: 'pi pi-fw pi-home', command: () => {
          this.ac1 = true;
          this.ac2 = false;
          this.ac3 = false;
        }
      },
      {
        label: 'Asignaturas y Docentes', icon: 'fa fa-user-md', command: () => {
          this.ac1 = false;
          this.ac2 = true;
          this.ac3 = false;
        }
      },
      {
        label: 'Asignaturas y Mallas', icon: 'fa fa-file-text', command: () => {
          this.ac1 = false;
          this.ac2 = false;
          this.ac3 = true;
        }
      },
    ];
    this.activeItem = this.items[0];
    this.llenarTabalAsignatura();

  }

  llenarTabalAsignatura() {
    this.listasig = new Array;
    this.serviceasig.getAsignaturas().subscribe(data => {
      this.listasig = data;

    })
  }

  nuevaAsig() {
    this.asig = new Asignatura;
    this.panelAsig = true;
    this.submitted = false;
  }

  updateAsig(a: Asignatura) {
    this.panelAsigUpdate = true;
    this.submitted = false;
    this.asig = a;
  }

  cancelar() {
    this.asig = new Asignatura;
    this.panelAsig = false;
    this.panelAsigUpdate = false;
    this.llenarTabalAsignatura();
  }

  saveasignatura() {
    if (this.asig.descripcion == null) {
      this.submitted = true;
    } else {
      this.serviceasig.createAsignatura(this.asig).subscribe(data => {
        if (data != null) {
          this.cancelar();
        }
      })
    }
  }

  updateAsign() {
    if (this.asig.descripcion == null) {
      this.submitted = true;
    } else {
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


}
