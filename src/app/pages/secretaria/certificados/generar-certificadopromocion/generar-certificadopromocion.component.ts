import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';
import { CertificadoPromocion } from 'src/app/Model/Secretaria/certificadoPromocion';
import { MatriculaService } from 'src/app/Servicio/moduloMatricula/matriculaServices/matricula.service';
import { Matricula } from 'src/app/Model/Matriculas/matricula';
import { CertificadoPromocionServiceService } from 'src/app/Servicio/secretaria/certificadosService/certificado-promocion-service.service';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { GenerarPdfService } from 'src/app/Servicio/secretaria/certificadosService/generar-pdf.service';

import { registro } from 'src/app/Model/tutorias/registro';
import { ServiceregistroService } from 'src/app/Servicio/tutorias/registro/serviceregistro.service';
import { PdfService } from 'src/app/Servicio/secretaria/certificadosService/pdf.service';

@Component({
  selector: 'app-generar-certificadopromocion',
  templateUrl: './generar-certificadopromocion.component.html',
  styleUrls: ['./generar-certificadopromocion.component.scss']
})
export class GenerarCertificadopromocionComponent implements OnInit {

  certificadoPromocion: CertificadoPromocion[] = [];
  estudiantes: Estudiante[] = [];
  matriculas: Matricula[] = [];
  registros: registro[] = [];

  selectMatricula?: Matricula | null;
  displayMatricula: boolean = false;
  selectRegistro?: registro  | null;

  fechaActual: Date = new Date();

  empleados: empleado[] = [];
  selectSecretaria?: empleado | null;
  selectRector?: empleado | null;

  constructor(private router: Router
    , private matriculaService: MatriculaService
    , private registroService: ServiceregistroService
    , private _certificadoPromocionService: CertificadoPromocionServiceService
    , private _generarPdfService: PdfService) { }

  ngOnInit(): void {
    
    this.getEmpleados();
    this.getRegistrosAll();
  }

  getMatriculas() {
    this.matriculaService.getMatricula()
      .subscribe(certificado => {
        console.log(certificado);
        this.matriculas = certificado;
      })
  }

  getEmpleados() {
    this._certificadoPromocionService.getEmpleados().subscribe({
      next: (resp) => {
        console.log(resp);
        this.empleados = resp;
      }
    })
  }

  getMatriculaPorCedula(event: any) {
    console.log(event.value);
    let cedula = event.value.trim();

    if (cedula.length == 0) return;
    this.matriculaService.getMatriculaPorCedula(cedula).subscribe({
      next: (resp) => {
        console.log(resp);
        this.matriculas = resp;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  //new
  getCedulaPorEstudiante(event: any) {
    console.log(event.value);

    if (event.length == 0) return;
    this.registroService.getCedulaPorEstudiante(event).subscribe({
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

  showDialog(registro: registro) {
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
