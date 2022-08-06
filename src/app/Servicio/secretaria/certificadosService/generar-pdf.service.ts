import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Matricula } from 'src/app/Model/Matriculas/matricula';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { CertificadoMatriculaServiceService } from './certificado-matricula-service.service';
import { AuthService } from '../../auth/auth.service';
import { CertificadoMatricula } from '../../../Model/Secretaria/certificadoMatricula';
import { MensajesSweetService } from '../../modulo_invetario/mensajes-sweet.service';

@Injectable({
  providedIn: 'root'
})
export class GenerarPdfService {

  fechaActual: Date = new Date();

  constructor( 
    private _certificadoMatriculaService: CertificadoMatriculaServiceService,
    private _mensajeSweetService: MensajesSweetService
   ) {

   }

  generarCertificado(matricula: Matricula, secretaria: empleado, rector: empleado, imprimir: boolean){

    const docPdf= new jsPDF();

    docPdf.addImage('../../../../../assets/img/logoMatricula.jpeg', "JPEG", 80, 15, 45, 20);
    docPdf.setFont("times", "bold");
    docPdf.text("UNIDAD EDUCATIVA FISCOMISIONAL", 105, 60, {align:"center"} );
    docPdf.text("JOSÉ MARÍA VELAZ, S.J.", 105, 70, {align:"center"});
    docPdf.setFontSize(11);
    docPdf.setFont("times", "normal");
    docPdf.text(`Extensión Educativa ${matricula.estudiante.id_extension.nombre_extension}`, 20, 80);
    docPdf.text("Nº 105", 105, 80);
    docPdf.text(`Provincia: ${matricula.estudiante.id_extension.id_direccion?.provincia?.provincia}`, 20, 90);
    docPdf.text(`Cantón: ${matricula.estudiante.id_extension.id_direccion?.canton?.canton}`, 105, 90);
    docPdf.text(`Lugar: ${matricula.estudiante.id_extension.id_direccion?.canton?.canton}`, 20, 100);
    docPdf.setFont("times", "bold");
    docPdf.text("CERTIFICADO DE MATRÍCULA", 105, 120,{align:"center"});
    docPdf.setFont("times", "normal");
    let anioInicio = formatDate(matricula.id_periodo.ano_inicio!, 'y','es-EC');
    let anioFin = formatDate(matricula.id_periodo.ano_fin!, 'y','es-EC');
    docPdf.text(`AÑO LECTIVO: ${anioInicio} - ${anioFin}`, 105, 130, {align:"center"});
    docPdf.setFontSize(11);
    docPdf.text(`MATRÍCULA Nº: ${matricula.id_matricula}`, 20, 140);
    docPdf.setFontSize(11);
    let lMargin=15; //left margin in mm
    let rMargin=15; //right margin in mm
    let pdfInMM=210;
    let anioMat = formatDate(matricula.fechaMatricula!,'y','es-EC');
    let mesMat= formatDate(matricula.fechaMatricula!,'MMMM','es-EC');
    let diaMat = formatDate(matricula.fechaMatricula!,'d','es-EC');
    let parrafo = `CERTIFICAMOS: Que el (la) estudiante ${matricula.estudiante.id_persona.nombre.toUpperCase()} ${matricula.estudiante.id_persona.apellido.toUpperCase()}, previo al cumplimiento de los requisitos legales y reglamentarios, se matriculó en el  ${matricula.id_periodo.malla.descripcion.toLocaleUpperCase()} ${matricula.modalidad.descripcion.toUpperCase()} (${matricula.curso.descripcion.toUpperCase()}), de este establecimiento Educativo, el ${diaMat} de ${mesMat} de ${anioMat}`
    let lineas = docPdf.splitTextToSize(parrafo,(pdfInMM-lMargin-rMargin));
    let dim = docPdf.getTextDimensions('Text');
    let altura = dim.h;
    let lineTop = 130;
    for (let i = 0; i < lineas.length; i++) {
      lineTop = lineTop + 10;
      docPdf.text(lineas[i], 20, lineTop +10, {align:"justify"});
      
    }

    docPdf.text(`Así está anotado en el folio ${matricula.id_matricula} del libro respectivo`, 20, 190);
    let fechaActual= `${formatDate(Date.now(), 'MMMM','es-EC')} de ${new Date().getFullYear()}`;
    let dia = formatDate(Date.now(),'d','es-EC');
    docPdf.text(`Lugar y fecha: CUENCA, ${dia} de ${fechaActual}`, 20, 200);
    
    let numCaracteresRec = (rector.persona?.nombre + rector.persona?.apellido).length;    
    let numCaracteresSec = (secretaria.persona?.nombre + secretaria.persona?.apellido).length;
    let xRector = 35;
    let xSec = 128;
    if ( numCaracteresRec > 15 ) {
      xRector = xRector -(numCaracteresRec - 15 );
    } else if ( numCaracteresRec < 15 ) {
      xRector = xRector + ( 15 - numCaracteresRec);
    }
    if ( numCaracteresSec > 15 ) {
      xSec = xSec-(numCaracteresSec - 15);
    } else if ( numCaracteresSec < 15 ) {
      xSec = xSec + ( 15 - numCaracteresSec);
    }       

    docPdf.text("________________________________", 25, 240);
    docPdf.text(`${rector.persona?.nombre.toUpperCase()} ${rector.persona?.apellido.toUpperCase()}`, xRector , 250,).getLineWidth();
    
    docPdf.text("RECTORA", 45, 260);
    docPdf.text("________________________________", 115, 240);
    docPdf.text(`${secretaria.persona?.nombre.toUpperCase()} ${secretaria.persona?.apellido.toUpperCase()}`, xSec, 250);
    docPdf.text("SECRETARIA", 135, 260);
    
    
    if (imprimir) {
      this.crearCertificadoMatricula(matricula, rector, secretaria);
      docPdf.autoPrint();
      docPdf.output('dataurlnewwindow');
    } else {
      docPdf.save(`${matricula.id_matricula}_matricula.pdf`); 
      this.crearCertificadoMatricula(matricula, rector, secretaria);
    }
  }

  crearCertificadoMatricula = (matricula: Matricula, rector: empleado, secretaria: empleado) => {
    let certificadoMat: CertificadoMatricula = {
      fecha: new Date(),
      rectora: `${rector.persona.nombre} ${rector.persona.apellido}`,
      matricula,
      id_empleado: secretaria
    }
    this._certificadoMatriculaService.crearCertificadoMatricula( certificadoMat ).subscribe({
      next: ( resp ) => {
        this._mensajeSweetService.mensajeOk('Certificado registrado');
      }, 
      error: ( resp ) => this._mensajeSweetService.mensajeError('Uppss!', 'No se pudo registrar el certificado')
      
    })
  }
}
