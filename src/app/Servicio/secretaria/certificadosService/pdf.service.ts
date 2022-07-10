import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF, { CellConfig, TableConfig, TextOptionsLight } from 'jspdf';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { Registro } from 'src/app/Model/tutorias/registro';
import { CertificadoTablaPromocion } from '../../../Model/Secretaria/certificadoPromocion';
import { Matricula } from '../../../Model/Matriculas/matricula';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  fechaActual: Date = new Date();

  constructor() { 

  }

  generarCertificado(matricula: Matricula, secretaria: empleado, rector: empleado, imprimir: boolean, cursoPromovido:string, dataCertificado: CertificadoTablaPromocion[]) {

    const docPdf = new jsPDF();
    
    docPdf.addImage('../../../../../assets/img/logoMatricula.jpeg', "JPEG", 80, 15, 45, 20);
    docPdf.setFont("times", "bold");
    docPdf.setFontSize(11);
    docPdf.text("UNIDAD EDUCATIVA FISCOMISIONAL", 105, 50, {align:"center"} );
    docPdf.text("JOSÉ MARÍA VELAZ, S.J.", 105, 55, {align:"center"});
    docPdf.text(`EXTENSION EDUCATIVA N° ${matricula.estudiante.id_extension.nombre_extension} - ${matricula.estudiante.id_extension.id_direccion?.canton?.canton}`, 105, 60, {align:"center"});
    docPdf.text(`CERTIFICADO DE PROMOCION`, 105, 65, {align:"center"});
    console.log(matricula);
    let fechaInicio = formatDate(matricula.id_periodo.fecha_inicio, 'MMMM Y', 'es-EC').toUpperCase();
    let fechaFin = formatDate(matricula.id_periodo.fecha_fin, 'MMMM Y', 'es-EC').toUpperCase();
    console.log(fechaInicio, fechaFin);
    
    
    docPdf.text(`AÑO LECTIVO ${fechaInicio} - ${fechaFin}`, 105, 70, {align:"center"});
    docPdf.text(`JORNADA MATUTINA`, 105, 75, {align:"center"});
    docPdf.setFont("times", "normal");

    let lMargin=17; //left margin in mm
    let rMargin=17; //right margin in mm
    let pdfInMM=210;

    let nombreEstudiante = `${matricula.estudiante.id_persona.nombre.toUpperCase()} ${matricula.estudiante.id_persona.apellido.toUpperCase()}`;
    let curso = `${matricula.curso.descripcion.toUpperCase()}`;
    let nomMalla = `${matricula.id_periodo.malla.descripcion.toUpperCase()}`;
    let parrafo = `De conformidad con lo prescrito con el Art. 197 del reglamento General a la Ley Orgánica de Educación Interculural y normativa educativa vigente, certifica que el/la estudiante ${nombreEstudiante} del ${curso} AÑO DE ${nomMalla} obtuvo las siguientes calificaciones durante el presente año lectivo:`;
    let lineas = docPdf.splitTextToSize(parrafo,(pdfInMM-lMargin-rMargin));
    let lineTop = 80;
    for (let i = 0; i < lineas.length; i++) {
      lineTop = lineTop + 5;
      docPdf.text(lineas[i], 20, lineTop +5, {align:"justify"});
    }

    let headers = this.createHeaders([
      '',
      'CALIFICACIONES',
    ]);
    let headers2 = this.createHeaders2([
      'ASIGNATURA',
      'NUMERO',
      'LETRAS',
    ]);
    let config: TableConfig = {headerBackgroundColor: '#FAFAFA', autoSize: false};
    docPdf.table(22, 110, [], headers, config, );
    docPdf.table(22, 121, this.generateData(dataCertificado), headers2, {...config, padding: 2,});
    let parrafo2 = `Por lo tanto, es promovido/a al ${cursoPromovido.toUpperCase()}. Para certificar suscriben en unidad de acto el/la Diretor/a - Rector/a con el/la Secretario/a General del Plantel.`;
    let lineas2 = docPdf.splitTextToSize(parrafo2,(pdfInMM-lMargin-rMargin));
    let lineTop2 = 120 + (dataCertificado.length * 10);
    for (const reg of dataCertificado) {
      lineTop2= lineTop2 + 3      
    }
    for (let i = 0; i < lineas2.length; i++) {
      lineTop2 = lineTop2 + 5;
      docPdf.text(lineas2[i], 20, lineTop2 +5, {align:"justify"});
    }
    let fechaActual = `${formatDate(Date.now(), 'MMMM', 'es-EC')} de ${new Date().getFullYear()}`;
    let dia = formatDate(Date.now(), 'd', 'es-EC');
    docPdf.text(` CUENCA, ${dia} de ${fechaActual}`, 185, lineTop2+15, {align: 'right'});
    

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

    docPdf.text("________________________________", 25, 250);
    docPdf.text(`${rector.persona?.nombre.toUpperCase()} ${rector.persona?.apellido.toUpperCase()}`, xRector, 260);
    docPdf.text("RECTORA", 45, 270);
    docPdf.text("________________________________", 115, 250);
    docPdf.text(`${secretaria.persona?.nombre.toUpperCase()} ${secretaria.persona?.apellido.toUpperCase()}`, xSec, 260);
    docPdf.text("SECRETARIA", 135, 270);


    if (imprimir) {
      docPdf.autoPrint();
      docPdf.output('dataurlnewwindow');
    } else {
      docPdf.save(`${matricula.id_matricula}_matricula.pdf`);
    }

  }

  createHeaders(keys: string[]): CellConfig[] {
    let result: CellConfig [] = [];
    result.push({
      name: keys[0],
      prompt: keys[0],
      width: 73.33,
      align: "center",
      padding: 0
    });
    result.push({
      name: keys[1],
      prompt: keys[1],
      width: 146.66,
      align: "center",
      padding: 0
    });
    return result;
  }
  createHeaders2(keys: string[]): CellConfig[] {
    let result: CellConfig [] = [];
    result.push({
      name: keys[0],
      prompt: keys[0],
      width: 73.33,
      align: "center",
      padding: 0
    });
    result.push({
      name: keys[1],
      prompt: keys[1],
      width: 50,
      align: "center",
      padding: 0
    });
    result.push({
      name: keys[2],
      prompt: keys[2],
      width: 96.66,
      align: "center",
      padding: 0
    });
    return result;
  }

  generateData = (dataCert: CertificadoTablaPromocion[]): { [key: string]: string }[] => {
    let result:{ [key: string]: string }[]= [];
    
    for (let i = 0; i < dataCert.length; i += 1) {
      result.push( {'ASIGNATURA': dataCert[i].asignatura!, 'NUMERO': dataCert[i].numero!, 'LETRAS': dataCert[i].letras!});
    }
    return result;
  };
  
}
