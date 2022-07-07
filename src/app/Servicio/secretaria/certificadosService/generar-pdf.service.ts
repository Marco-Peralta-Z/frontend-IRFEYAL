import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Matricula } from 'src/app/Model/Matriculas/matricula';
import { empleado } from 'src/app/Model/rolesTS/empleado';

@Injectable({
  providedIn: 'root'
})
export class GenerarPdfService {

  fechaActual: Date = new Date();

  constructor() {

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
    docPdf.text(`Provincia: ${matricula.estudiante.id_extension.direccion?.provincia?.provincia}`, 20, 90);
    docPdf.text(`Cantón: ${matricula.estudiante.id_extension.direccion?.canton?.canton}`, 105, 90);
    docPdf.text(`Lugar: ${matricula.estudiante.id_extension.direccion?.canton?.canton}`, 20, 100);
    docPdf.setFont("times", "bold");
    docPdf.text("CERTIFICADO DE MATRÍCULA", 105, 120,{align:"center"});
    docPdf.setFont("times", "normal");
    docPdf.text(`AÑO LECTIVO: ${matricula.id_periodo.ano_inicio} - ${matricula.id_periodo.ano_fin}`, 105, 130, {align:"center"});
    docPdf.setFontSize(11);
    docPdf.text(`MATRÍCULA Nº: ${matricula.id_matricula}`, 20, 140);
    docPdf.setFontSize(11);
    let lMargin=15; //left margin in mm
    let rMargin=15; //right margin in mm
    let pdfInMM=210;
    let anioMat = formatDate(matricula.fechaMatricula!,'y','es-EC');
    let mesMat= formatDate(matricula.fechaMatricula!,'MMMM','es-EC');
    let diaMat = formatDate(matricula.fechaMatricula!,'d','es-EC');
    let parrafo = `CERTIFICAMOS: Que el (la) estudiante ${matricula.estudiante.id_persona.nombre.toUpperCase()} ${matricula.estudiante.id_persona.apellido.toUpperCase()}, previo al cumplimiento de los requisitos legales y reglamentarios, se matriculó en el  BACHILLERATO GENERAL UNIFICADO- CIENCIAS ${matricula.modalidad.descripcion.toUpperCase()} (1ro, 2do,  3ro), de este establecimiento Educativo, el ${diaMat} de ${mesMat} de ${anioMat}`
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

    docPdf.text("________________________________", 25, 240);
    docPdf.text(`${rector.persona?.nombre.toUpperCase()} ${rector.persona?.apellido.toUpperCase()}`, 35, 250);
    docPdf.text("RECTORA", 45, 260);
    docPdf.text("________________________________", 115, 240);
    docPdf.text(`${secretaria.persona?.nombre.toUpperCase()} ${secretaria.persona?.apellido.toUpperCase()}`, 125, 250);
    docPdf.text("SECRETARIA", 135, 260);
    
    
    if (imprimir) {
      docPdf.autoPrint();
      docPdf.output('dataurlnewwindow');
    } else {
      docPdf.save(`${matricula.id_matricula}_matricula.pdf`);  
    }
    
    
    
  }
}
