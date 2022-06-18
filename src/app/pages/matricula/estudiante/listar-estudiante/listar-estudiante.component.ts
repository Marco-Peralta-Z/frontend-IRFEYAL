import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../../../Model/Matriculas/estudiante';
import { EstudianteService } from '../../../../Servicio/moduloMatricula/estudianteServices/estudiante.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-listar-estudiante',
  templateUrl: './listar-estudiante.component.html',
  styleUrls: ['./listar-estudiante.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ListarEstudianteComponent implements OnInit {

  estudiantes: Estudiante[]=[];
  productDialog?: boolean;
  estudiante: Estudiante= new Estudiante();

  selectEstudiante: Estudiante[]=[];

  submitted?: boolean;

  statuses?: any[];

  constructor(private estudianteService: EstudianteService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.estudianteService.getEstudiantes()
    .subscribe(estudiantes => this.estudiantes= estudiantes);

  }

  openNew() {
      // aqui se puede redireccionar a la pagina agregar para crear un nuevo estudiante
  }

  deleteselectEstudiante() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.estudiantes = this.estudiantes.filter(val => !this.selectEstudiante.includes(val));
              this.selectEstudiante = [];
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
          }
      });
  }

  editProduct(estudent: Estudiante) {
      this.estudiante= estudent ;
      this.productDialog = true;
  }

  deleteProduct(estudent: Estudiante) {
      this.confirmationService.confirm({
          message: 'Seguro que desea eliminar al estudiante? ' + estudent.id_persona.apellido +  '?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.estudiantes = this.estudiantes.filter(val => val.id_estudiante !== estudent.id_estudiante);
              this.estudiante =new Estudiante();
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Estudiante Eliminado', life: 3000});
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;
// modificar para editar al estudiante obteniendo su id 
      if (this.estudiante.id_persona.cedula.trim()) {
          if (this.estudiante.id_estudiante) {
              this.estudiantes[this.findIndexById(this.estudiante.id_estudiante)] = this.estudiante;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          }
      }
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.estudiantes.length; i++) {
          if (this.estudiantes[i].id_estudiante === id) {
              index = i;
              break;
          }
      }

      return index;
  }
}
