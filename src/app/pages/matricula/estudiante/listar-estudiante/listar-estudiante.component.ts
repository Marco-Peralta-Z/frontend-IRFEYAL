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
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidatorsService } from '../../../../Servicio/moduloMatricula/Validators/validators.service';
import { ImportExcel } from '../../../../Model/Matriculas/importExcel';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-listar-estudiante',
  templateUrl: './listar-estudiante.component.html',
  styleUrls: ['./listar-estudiante.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ListarEstudianteComponent implements OnInit {

  estudiantes: Estudiante[]=[];
  importExcelEstudents: ImportExcel[]=[];
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
  age:number=0;
  year?: number;
  existe: boolean = true;
  month?:number;
  day?:number;
  mesFinal:any;
  diaFinal:any
  camposRequeridos: boolean=true;
  rows: number=5;
  pipe = new DatePipe('en-EC');
  estudiante: Estudiante= new Estudiante();
  validador?: boolean;
  selectEstudiante: Estudiante[]=[];
  esditable: boolean = true;
  submitted?: boolean;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  statuses?: any[];


  editEstudiante:FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    apellido: [, [Validators.required, Validators.minLength(3)]],
    cedula: [, [Validators.required]],
    fecha: [[], [Validators.required, this.noPuedeSerNull]],
    genero: [[], [Validators.required]],
    provincia: [[], Validators.required],
    canton: [[], [Validators.required]],
    parroquia: [[], [Validators.required]],
    calleFirts: [, [Validators.required]],
    calleSecond: [, [Validators.required]],
    telefono: [, [Validators.required]],
    celular: [, [Validators.required]],
    email: [, [Validators.required, Validators.pattern(this.emailPattern)]]
  });

  constructor(private estudianteService: EstudianteService, 
    private messageService: MessageService,
    private fb: FormBuilder, 
    private validatorService: ValidatorsService,
    private confirmationService: ConfirmationService) { }

    noPuedeSerNull(control: FormControl) {
      const fecha = control.value; 
      const today: Date = new Date();
      const birthDate: Date = new Date(fecha);
      let edad:number = today.getFullYear() - birthDate.getFullYear();
      const month: number = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
          edad--;
      }
      if (edad<18) {
        return {
          fecha: true
        }
      }
      return null;
    }
    
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

  // openNew() {
  //     // aqui se puede redireccionar a la pagina agregar para crear un nuevo estudiante
  // }

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

    if (this.editEstudiante.invalid || this.age<18) {
      this.editEstudiante.markAllAsTouched();
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error en Formulario', detail: 'Campos erroneos o incompletos' });
      // swal.fire('Error en Formulario', 'Campos erroneos o incompletos', 'error');
      return;
    } 
      // this.submitted = true;
      
// modificar para editar al estudiante obteniendo su id 
      if (this.existe) {
        this.productDialog = false;
          if (this.estudiante.id_estudiante) {
              this.estudiantes[this.findIndexById(this.estudiante.id_estudiante)] = this.estudiante;              
              this.estudianteService.putEstudiante(this.estudiante)
              .subscribe(estudiante => (console.log(estudiante)));
              this.messageService.add({key: 'tc',severity:'success', summary: 'Actualizado', detail: 'Información Actualizada', life: 3000});
          }
      }  else {
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error de Datos', detail: `Cedula/Pasaporte ingresado incorrecto` });
        
      }
  }

  validaExistenciaEstudiante(): boolean {
    this.validador=this.validatorService.validarCedu(this.estudiante.id_persona.cedula.trim());
  if (this.validador) {
    this.existe = true;
  }else{
      this.validador= this.validatorService.esAlfanumerico(this.estudiante.id_persona.cedula.trim());
      if (this.validador) {
        this.existe = true;
      }else{
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error de Datos', detail: `Cedula/Pasaporte ingresado incorrecto` });
         this.existe = false;
      }
  }
  return this.existe;
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

CalculateAge() {
  const today: Date = new Date();
 const birthDate: Date = new Date(this.estudiante.id_persona.fechaNacimiento!);
 this.age = today.getFullYear() - birthDate.getFullYear();
 const month: number = today.getMonth() - birthDate.getMonth();
 if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
     this.age--;
 }
 if (this.age<18) {
   this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Menor de Edad', detail: `Fecha ingresada incorrecta`});
 }

}
 // validaciones de campos del formulario
 campoValido(valor: string): boolean {
  return this.editEstudiante.controls[valor].errors!
    && this.editEstudiante.controls[valor].touched
}

exportExcel() {
  this.importExcelEstudents = [];
  for (let i = 0; i < this.estudiantes.length; i++) {
    this.importExcelEstudents.push({
      Cedula: this.estudiantes[i].id_persona.cedula,
      Nombres: this.estudiantes[i].id_persona.nombre,
      Apellidos: this.estudiantes[i].id_persona.apellido,
      Correo: this.estudiantes[i].correo.correo,
      Telefono: this.estudiantes[i].telefono.telefono,
      Celular: this.estudiantes[i].telefono.numCelular,
      Genero: this.estudiantes[i].id_persona.genero.genero,
      Direccion: this.estudiantes[i].direccion.avPrincipal + ' y '+ this.estudiantes[i].direccion.avSecundaria,
      Provincia:this.estudiantes[i].direccion.provincia.provincia,
      Ciudad:this.estudiantes[i].direccion.canton.canton,
      Parroquia:this.estudiantes[i].direccion.parroquia.parroquia,
      Fecha_Nacimiento: String(this.estudiantes[i].id_persona.fechaNacimiento),
   });
  }
  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.importExcelEstudents);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "listadoEstudiantes");
  });
}
saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
}
