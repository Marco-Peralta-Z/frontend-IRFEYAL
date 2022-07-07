import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';
import { CertificadoPromocion } from 'src/app/Model/Secretaria/certificadoPromocion';
import { MatriculaService } from 'src/app/Servicio/moduloMatricula/matriculaServices/matricula.service';
import { Matricula } from 'src/app/Model/Matriculas/matricula';
import { CertificadoPromocionServiceService } from 'src/app/Servicio/secretaria/certificadosService/certificado-promocion-service.service';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { GenerarPdfService } from 'src/app/Servicio/secretaria/certificadosService/generar-pdf.service';



import { PdfService } from 'src/app/Servicio/secretaria/certificadosService/pdf.service';
import { Registro } from 'src/app/Model/tutorias/registro';
import { ServiceTutoriasService } from 'src/app/Servicio/tutorias/registro/servicio-tutorias.service';

@Component({
  selector: 'app-generar-certificadopromocion',
  templateUrl: './generar-certificadopromocion.component.html',
  styleUrls: ['./generar-certificadopromocion.component.scss']
})
export class GenerarCertificadopromocionComponent implements OnInit {

  certificadoPromocion: CertificadoPromocion[] = [];
  estudiantes: Estudiante[] = [];
  matriculas: Matricula[] = [];
  registros: Registro[] = [];

  selectMatricula?: Matricula | null;
  displayMatricula: boolean = false;
  selectRegistro?: Registro  | null;

  fechaActual: Date = new Date();

  empleados: empleado[] = [];
  selectSecretaria?: empleado | null;
  selectRector?: empleado | null;

  constructor(private router: Router
    , private matriculaService: MatriculaService
    , private registroService: ServiceTutoriasService
    , private _certificadoPromocionService: CertificadoPromocionServiceService
    , private _generarPdfService: PdfService) { }

  ngOnInit(): void {
    
    this.getEmpleados();
    this.getRegistrosAll();
  }

  getEmpleados() {
    this._certificadoPromocionService.getEmpleados().subscribe({
      next: (resp) => {
        console.log(resp);
        this.empleados = resp;
      }
    })
  }


  //new
  getCedulaPorEstudiante(event: any) {
    console.log(event.value);
    let cedula = event.value.trim();

    if (cedula.length == 0) return;
    this.registroService.getCedulaPorEstudiante(cedula).subscribe({
      next: (resp) => {
        console.log(resp);
        this.registros = resp;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getRegistrosAll() {
    this._certificadoPromocionService.getRegistros()
      .subscribe(certificadoPromo => {
        console.log(certificadoPromo);
        this.registros = certificadoPromo;
      })
  }

  regresarHome() {
    this.router.navigate(["home"]);
  }

  generarPdf(imprimir: boolean) {
    this._generarPdfService.generarCertificado(this.selectRegistro!, this.selectSecretaria!, this.selectRector!, imprimir);
  }

  showDialog(registro: Registro) {
    this.selectRegistro = registro;
    this.displayMatricula = true;
  }

 

  closeDialog() {
    this.displayMatricula = false;
    this.selectRegistro = null;
    this.selectRector = null;
    this.selectSecretaria = null;
  }

}
