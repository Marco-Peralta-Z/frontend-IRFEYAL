import { formatDate, UpperCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF, { CellConfig, TableConfig, TextOptionsLight } from 'jspdf';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { Registro } from 'src/app/Model/tutorias/registro';
import { CertificadoTablaPromocion } from '../../../Model/Secretaria/certificadoPromocion';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  fechaActual: Date = new Date();

  constructor() { 

  }

  generarCertificado(registro: Registro, secretaria: empleado, rector: empleado, imprimir: boolean, dataCertificado: CertificadoTablaPromocion[]) {

    const docPdf = new jsPDF();
    
    docPdf.addImage('../../../../../assets/img/logoMatricula.jpeg', "JPEG", 80, 15, 45, 20);
    docPdf.setFont("times", "bold");
    docPdf.setFontSize(11);
    docPdf.text("UNIDAD EDUCATIVA FISCOMISIONAL", 105, 50, {align:"center"} );
    docPdf.text("JOSÉ MARÍA VELAZ, S.J.", 105, 55, {align:"center"});
    docPdf.text(`EXTENSION EDUCATIVA N° 105_irfeyal - CUENCA`, 105, 60, {align:"center"});
    docPdf.text(`CERTIFICADO DE PROMOCION`, 105, 65, {align:"center"});
    docPdf.text(`AÑO LECTIVO ENERO 2022 - NOVIEMBRE 2022`, 105, 70, {align:"center"});
    docPdf.text(`JORNADA MATUTINA`, 105, 75, {align:"center"});
    docPdf.setFont("times", "normal");

    let lMargin=17; //left margin in mm
    let rMargin=17; //right margin in mm
    let pdfInMM=210;

    let parrafo = `De conformidad con lo prescrito con el Art. 197 del reglamento General a la Ley Orgánica de Educación Interculural y normativa educativa vigente, certifica que el/la estudiante MARÃ­A MIREYA ACEVEDO MANRÃ­QUEZ del OCTAVO AÑO DE EDUCACION BASICA SUPERIOR obtuvo las siguientes calificaciones durante el presente año lectivo:`;
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
    let parrafo2 = `Por lo tanto, es promovido/a al sasasa. Para certificar suscriben en unidad de acto el/la Diretor/a - Rector/a con el/la Secretario/a General del Plantel.`;
    let lineas2 = docPdf.splitTextToSize(parrafo2,(pdfInMM-lMargin-rMargin));
    let lineTop2 = 190;
    for (const reg of dataCertificado) {
      lineTop2= lineTop2 + 3
      console.log('hola',);
      
    }
    for (let i = 0; i < lineas2.length; i++) {
      lineTop2 = lineTop2 + 5;
      docPdf.text(lineas2[i], 20, lineTop2 +5, {align:"justify"});
    }
    let fechaActual = `${formatDate(Date.now(), 'MMMM', 'es-EC')} de ${new Date().getFullYear()}`;
    let dia = formatDate(Date.now(), 'd', 'es-EC');
    docPdf.text(` CUENCA, ${dia} de ${fechaActual}`, 185, lineTop2+15, {align: 'right'});
    

    docPdf.text("________________________________", 25, 250);
    docPdf.text(`${rector.persona?.nombre.toUpperCase()} ${rector.persona?.apellido.toUpperCase()}`, 35, 260);
    docPdf.text("RECTORA", 45, 270);
    docPdf.text("________________________________", 115, 250);
    docPdf.text(`${secretaria.persona?.nombre.toUpperCase()} ${secretaria.persona?.apellido.toUpperCase()}`, 125, 260);
    docPdf.text("SECRETARIA", 135, 270);


    if (imprimir) {
      docPdf.autoPrint();
      docPdf.output('dataurlnewwindow');
    } else {
      docPdf.save(`1_matricula.pdf`);
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
