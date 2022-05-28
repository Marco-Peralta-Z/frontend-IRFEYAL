import { Component, OnInit, Pipe } from '@angular/core';
import { Estudiante } from '../../../../Model/Matriculas/estudiante';
import { EstudianteService } from '../../../../Servicio/moduloMatricula/estudianteServices/estudiante.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { provincia } from '../../../../Model/rolesTS/provincia';
import { canton } from '../../../../Model/rolesTS/canton';
import { parroquia } from '../../../../Model/rolesTS/parroquia';
import { genero } from '../../../../Model/rolesTS/genero';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-listar-estudiante',
  templateUrl: './listar-estudiante.component.html',
  styleUrls: ['./listar-estudiante.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ListarEstudianteComponent implements OnInit {

  estudiantes: Estudiante[]=[];
  filteredProvincia: provincia[] = [];
  filteredCanton: canton[] = [];
  filteredParroquia: parroquia[] = [];
  cantones: canton[] = [];
  parroquias: parroquia[] = [];
  provincias: provincia[] = [];
  generos: genero[]=[];
  productDialog?: boolean;
  fecha: string= '';
  fechaActual= new Date();
  year?: number;
  month?:number;
  day?:number;
  mesFinal:any;
  diaFinal:any
  pipe = new DatePipe('en-EC');
  datePipe: DatePipe= new DatePipe('en-EC');
  estudiante: Estudiante= new Estudiante();

  selectEstudiante: Estudiante[]=[];
  esditable: boolean = true;
  submitted?: boolean;

  statuses?: any[];

  constructor(private estudianteService: EstudianteService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.estudianteService.getEstudiantes()
    .subscribe(estudiantes => this.estudiantes= estudiantes);
    this.estudianteService.getProvincias()
      .subscribe(provincia => this.provincias = provincia);


      this.estudianteService.getParroquia()
      .subscribe(parroquia => this.parroquias = parroquia);

    this.estudianteService.getCanton()
      .subscribe(canton => this.cantones = canton); 

    this.estudianteService.getGenero()
    .subscribe(genero => this.generos= genero);
  }

  openNew() {
      // aqui se puede redireccionar a la pagina agregar para crear un nuevo estudiante
  }

  filtrarProvincia(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.provincias.length; i++) {
      let provincia = this.provincias[i];
      if (provincia.provincia.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(provincia);
      }
    }

    this.filteredProvincia = filtered;
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

  editEstudent(estudent: Estudiante) {
      this.estudiante= estudent ;

      // obtener fecha de nacimiento actual del estudiante seleccionado para ver o editar
      this.fecha=(this.pipe.transform(this.estudiante.id_persona.fechaNacimiento,'yyyy-MM-dd'))!.slice(0,10);
      this.productDialog = true;
      this.esditable=true;
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

  saveEstudent() {
      this.submitted = true;
      this.productDialog = false;
// modificar para editar al estudiante obteniendo su id 
      if (this.estudiante.id_persona.cedula.trim()) {
          if (this.estudiante.id_estudiante) {
              console.log(this.estudiante.id_persona.fechaNacimiento);
              this.estudiantes[this.findIndexById(this.estudiante.id_estudiante)] = this.estudiante;              
              this.estudianteService.putEstudiante(this.estudiante)
              .subscribe(estudiante => (console.log(estudiante)));

              
              this.messageService.add({severity:'success', summary: 'Actualizado', detail: 'Información Actualizada', life: 3000});
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
mostrar(event:any){
console.log(event);
}
}
