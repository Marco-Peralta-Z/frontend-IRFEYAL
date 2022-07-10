import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Matricula } from 'src/app/Model/Matriculas/matricula';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { CertificadoMatricula } from 'src/app/Model/Secretaria/certificadoMatricula';

@Injectable({
  providedIn: 'root'
})
export class ReimprimirMatService {

  fechaActual: Date = new Date();

  constructor() {

   }

  generarCertificadoMatricula(certificadoMat: CertificadoMatricula, imprimir: boolean){

    const docPdf= new jsPDF();

    docPdf.addImage('../../../../../assets/img/logoMatricula.jpeg', "JPEG", 80, 15, 45, 20);
    docPdf.setFont("times", "bold");
    docPdf.text("UNIDAD EDUCATIVA FISCOMISIONAL", 105, 60, {align:"center"} );
    docPdf.text("JOSÉ MARÍA VELAZ, S.J.", 105, 70, {align:"center"});
    docPdf.setFontSize(11);
    docPdf.setFont("times", "normal");
    docPdf.text(`Extensión Educativa ${certificadoMat.matricula?.estudiante.id_extension.nombre_extension}`, 20, 80);
    docPdf.text("Nº 105", 105, 80);
    docPdf.text(`Provincia: ${certificadoMat.matricula?.estudiante.id_extension.id_direccion?.provincia?.provincia}`, 20, 90);
    docPdf.text(`Cantón: ${certificadoMat.matricula?.estudiante.id_extension.id_direccion?.canton?.canton}`, 105, 90);
    docPdf.text(`Lugar: ${certificadoMat.matricula?.estudiante.id_extension.id_direccion?.canton?.canton}`, 20, 100);
    docPdf.setFont("times", "bold");
    docPdf.text("CERTIFICADO DE MATRÍCULA", 105, 120,{align:"center"});
    docPdf.setFont("times", "normal");
    docPdf.text(`AÑO LECTIVO: ${certificadoMat.matricula?.id_periodo.ano_inicio} - ${certificadoMat.matricula?.id_periodo.ano_fin}`, 105, 130, {align:"center"});
    docPdf.setFontSize(11);
    docPdf.text(`MATRÍCULA Nº: ${certificadoMat.matricula?.id_matricula}`, 20, 140);
    docPdf.setFontSize(11);

    let lMargin=15; //left margin in mm
    let rMargin=15; //right margin in mm
    let pdfInMM=210;
    let anioMat = formatDate(certificadoMat.matricula?.fechaMatricula!,'y','es-EC');
    let mesMat= formatDate(certificadoMat.matricula?.fechaMatricula!,'MMMM','es-EC');
    let diaMat = formatDate(certificadoMat.matricula?.fechaMatricula!,'d','es-EC');
    let parrafo = `CERTIFICAMOS: Que el (la) estudiante ${certificadoMat.matricula?.estudiante.id_persona.nombre.toUpperCase()} ${certificadoMat.matricula?.estudiante.id_persona.apellido.toUpperCase()}, previo al cumplimiento de los requisitos legales y reglamentarios, se matriculó en el  ${certificadoMat.matricula?.id_periodo.malla.descripcion.toLocaleUpperCase()} ${certificadoMat.matricula?.modalidad.descripcion.toUpperCase()} (${certificadoMat.matricula?.curso.descripcion.toUpperCase()}), de este establecimiento Educativo, el ${diaMat} de ${mesMat} de ${anioMat}`
    let lineas = docPdf.splitTextToSize(parrafo,(pdfInMM-lMargin-rMargin));
    let dim = docPdf.getTextDimensions('Text');
    let altura = dim.h;
    let lineTop = 130;
    for (let i = 0; i < lineas.length; i++) {
      lineTop = lineTop + 10;
      docPdf.text(lineas[i], 20, lineTop +10, {align:"justify"});
      
    }

    docPdf.text(`Así está anotado en el folio ${certificadoMat.matricula?.id_matricula} del libro respectivo`, 20, 190);
    let fechaActual= `${formatDate(Date.now(), 'MMMM','es-EC')} de ${new Date().getFullYear()}`;
    let dia = formatDate(Date.now(),'d','es-EC');
    docPdf.text(`Lugar y fecha: CUENCA, ${dia} de ${fechaActual}`, 20, 200);
    
    let numCaracteresRec = (certificadoMat.rectora!).length;    
    let numCaracteresSec = (certificadoMat.id_empleado?.persona.nombre! + certificadoMat.id_empleado?.persona.apellido!).length;
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
    docPdf.text(`${certificadoMat.rectora!.toUpperCase()}`, xRector , 250,).getLineWidth();
    
    docPdf.text("RECTORA", 45, 260);
    docPdf.text("________________________________", 115, 240);
    docPdf.text(`${certificadoMat.id_empleado?.persona?.nombre.toUpperCase()} ${certificadoMat.id_empleado?.persona?.apellido.toUpperCase()}`, xSec, 250);
    docPdf.text("SECRETARIA", 135, 260);
    
    
    if (imprimir) {
      docPdf.autoPrint();
      docPdf.output('dataurlnewwindow');
    } else {
      docPdf.save(`${certificadoMat.id_generar_certificado_matricula}_matricula.pdf`);  
    }
    
    
    
  }
}
