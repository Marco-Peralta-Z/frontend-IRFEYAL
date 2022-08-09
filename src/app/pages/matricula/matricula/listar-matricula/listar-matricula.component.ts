import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Matricula } from '../../../../Model/Matriculas/matricula';
import { MatriculaService } from '../../../../Servicio/moduloMatricula/matriculaServices/matricula.service';
import { Modalidad } from '../../../../Model/Parametrizacion/Modalidad';
import { Historial } from '../../../../Model/Matriculas/historial';
import * as FileSaver from 'file-saver';
import { ImportExcel } from '../../../../Model/Matriculas/importExcel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listar-matricula',
  templateUrl: './listar-matricula.component.html',
  styleUrls: ['./listar-matricula.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListarMatriculaComponent implements OnInit {

  matriculas: Matricula[] = [];
  matHistorial: Matricula[] = [];
  allMatriculas: Matricula[] = [];
  historial: Historial[] = [];
  importExcel: ImportExcel[] = []

  matricula: Matricula = new Matricula();
  selectedMatricula: Matricula[] = [];
  modalidades: Modalidad[] = [];
  historialMatricula: Matricula[] = [];

  pipe= new DatePipe('en-EC');
  productDialog?: boolean;
  esditable: boolean = true;
  submitted?: boolean;
  fullName: string = '';
  rows: number = 5;


  constructor(private matriculaService: MatriculaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.matriculaService.getMatriculasActivas()
      .subscribe(matriculasActivas => {
        this.matriculas = matriculasActivas;
      });
    this.matriculaService.getMatricula()
      .subscribe(matriculasTodas => {
        this.allMatriculas = matriculasTodas;
      })

    this.matriculaService.getModalidades()
      .subscribe(modalidad => this.modalidades = modalidad);

  }
  verMatricula(matricula: Matricula) {
    this.matricula = matricula;
    this.fullName = this.matricula.estudiante.id_persona.apellido + ' ' + matricula.estudiante.id_persona.nombre;
    this.productDialog = true;
    this.esditable = true;
    this.cargarHistorial(matricula.estudiante.id_estudiante!);
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  cargarHistorial(id_matricula: number) {
    this.historial = [];

    this.matHistorial = [];
    this.matriculaService.getHistorialMatriculas(id_matricula)
      .subscribe(historial => {
        this.historialMatricula = historial;
        let aux: any = 0;
        for (let i = 0; i < this.historialMatricula.length; i++) {
          if (i == 0) {
            aux = this.historialMatricula[i].id_periodo.malla.id_malla!;
            this.matHistorial.push(this.historialMatricula[i]);
          }
          if (aux != this.historialMatricula[i].id_periodo.malla.id_malla) {
            this.historial.push({
              mallaNombre: String(this.historialMatricula[i].id_periodo.malla.descripcion!),
              matriculas: this.matHistorial,

            });

            this.matHistorial = [];
            aux = this.historialMatricula[i].id_periodo.malla.id_malla!;
            this.matHistorial.push(this.historialMatricula[i]);
          } else {
            if (i != 0) {
              this.matHistorial.push(this.historialMatricula[i]);
            }

          }
          if (i == this.historialMatricula.length - 1) {
            this.historial.push({
              mallaNombre: String(this.historialMatricula[i].id_periodo.malla.descripcion!),
              matriculas: this.matHistorial,
            });
          }

        }
        console.log(this.historial);

      });

  }
  exportExcel() {
    this.importExcel = [];
    for (let i = 0; i < this.allMatriculas.length; i++) {
      this.importExcel.push({
        Cedula: this.allMatriculas[i].estudiante.id_persona.cedula,
        Nombres: this.allMatriculas[i].estudiante.id_persona.nombre,
        Apellidos: this.allMatriculas[i].estudiante.id_persona.apellido,
        Correo: this.allMatriculas[i].estudiante.correo.correo,
        Telefono: this.allMatriculas[i].estudiante.telefono.telefono,
        Celular: this.allMatriculas[i].estudiante.telefono.numCelular,
        Genero: this.allMatriculas[i].estudiante.id_persona.genero.genero,
        Direccion: this.allMatriculas[i].estudiante.direccion.avPrincipal + ' y '+ this.allMatriculas[i].estudiante.direccion.avSecundaria,
        Provincia:this.allMatriculas[i].estudiante.direccion.provincia.provincia,
        Ciudad:this.allMatriculas[i].estudiante.direccion.canton.canton,
        Parroquia:this.allMatriculas[i].estudiante.direccion.parroquia.parroquia,
        Curso: String(this.allMatriculas[i].curso.descripcion),
        Modalidad: String(this.allMatriculas[i].modalidad.descripcion),
        Paralelo: String(this.allMatriculas[i].id_paralelo.descripcion),
        Periodo: (this.pipe.transform(this.allMatriculas[i].id_periodo.fecha_inicio,'yyyy-MM-dd'))!.slice(0,10) + ' / '+(this.pipe.transform(this.allMatriculas[i].id_periodo.fecha_fin,'yyyy-MM-dd'))!.slice(0,10),
        Fecha_Matricula: String(this.allMatriculas[i].fechaMatricula),
     });
     ;
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.importExcel);
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
