import { Injectable } from '@angular/core';
import { empleado } from '../../../Model/rolesTS/empleado';
import jsPDF from 'jspdf';
import { formatDate } from '@angular/common';
import { Periodo } from '../../../Model/Parametrizacion/Periodo';
import { Curso } from '../../../Model/Parametrizacion/Curso';
import { Notas } from '../../../Model/tutorias/registro';
import autoTable, { RowInput } from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class SegundoQuimestreService {

  constructor() { }
  generarCertificado( secretaria: empleado, rector: empleado, imprimir: boolean, periodo: Periodo, curso: Curso, notas: Notas[], materias: string[]) {

    const docPdf = new jsPDF();
    
    docPdf.addImage('../../../../../assets/img/logoMatricula.jpeg', "JPEG", 150, 15, 45, 20);
    docPdf.setFont("times", "bold");
    docPdf.setFontSize(11);
    docPdf.text('UNIDAD EDUCATIVA FISCOMISIONAL "JOSÉ MARÍA VELAZ, S.J."', 105, 50, {align:"center"} );
    docPdf.text(`EXTENSION EDUCATIVA N° ${rector.extension.nombre_extension} - ${rector.extension.id_direccion?.canton?.canton}`, 105, 55, {align:"center"});
    docPdf.text(`CUADRO DE CALIFICACIONES SEGUNDO QUIMESTRE`, 105, 60, {align:"center"});
    let fechaInicio = formatDate(periodo.fecha_inicio, 'Y', 'es-EC').toUpperCase();
    let fechaFin = formatDate(periodo.fecha_fin, 'Y', 'es-EC').toUpperCase();
    docPdf.text(`AÑO LECTIVO ${fechaInicio} - ${fechaFin}`, 105, 65, {align:"center"});
    docPdf.setFont("times", "normal");    
    docPdf.text(`${curso.descripcion.toUpperCase()}`, 20, 80, {align:"left"});
    let headersInicio: RowInput = ['O\nR\nD', 'APELLIDOS NOMBRES'];
    let headersFin: RowInput = ['P\nR\nO\nM\nE\nD\nI\nO', 'C\nO\nM\nP\nO\nR\nT\nA\nM\nI\nE\nN\nT\nO', 'OBSERVACIONES'];
    for (const i in materias) {      
      materias[i] = materias[i].split('').join('\n');
    }
    let headers: RowInput = [...headersInicio, ...materias,  ...headersFin ];
    // tabla
    autoTable(docPdf, {
      startY: 85,
      margin:{vertical: 20},
      styles: {lineColor: '#000000'},
      tableLineColor: '#000000',
      tableLineWidth: 0.25,
      headStyles: {halign: 'center', valign:'middle', fillColor: '#fff', textColor:'#000000',lineWidth: 0.25},
      head: [headers],
      body: this.dataInput(notas),
      theme: 'grid',
    });


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

    let altura =  260

    if (notas.length >= 13 && notas.length <= 16) {
      docPdf.addPage()
      altura = 50;
    }
    
    docPdf.text("________________________________", 25, (altura));
    docPdf.text(`${rector.persona?.nombre.toUpperCase()} ${rector.persona?.apellido.toUpperCase()}`, xRector, (altura + 10));
    docPdf.text("RECTORA", 45, (altura+20));
    docPdf.text("________________________________", 115, (altura));
    docPdf.text(`${secretaria.persona?.nombre.toUpperCase()} ${secretaria.persona?.apellido.toUpperCase()}`, xSec, (altura + 10));
    docPdf.text("SECRETARIA", 135, (altura+20));


    if (imprimir) {
      docPdf.autoPrint();
      docPdf.output('dataurlnewwindow');
    } else {
      docPdf.save(`${curso.id_curso}_${curso.descripcion}_segundo_Quimestre.pdf`);
    }

  } 

  dataInput = (notas: Notas[]): RowInput[] => {
    let data: RowInput [] = [];
    for (const i in notas) {
      let conducta = (notas[i].conductas!.reduce((a, b) => a + b, 0)) / notas[i].conductas!.length;
      let promedio = (notas[i].notasQ1!.reduce((a, b) => a + b, 0)) / notas[i].notasQ1!.length;
      let observacion = 'RETIRADO';
      if (promedio >= 7) {
        observacion = 'APROBADO';
      } else if( promedio > 0 && promedio <7) {
        observacion = 'REPROBADO';
      }
      data.push([notas[i].ord!, notas[i].nombre!, ...notas[i].notasQ1!, promedio.toFixed(2), this.verifivarTipoconducta(conducta), observacion])
    }
    return data;
  }

  verifivarTipoconducta (promedioConducta: number) {
    if ( promedioConducta >= 9) {
      return 'A'
    } else if ( promedioConducta >= 7 && promedioConducta < 9) {
      return 'B'
    } else if ( promedioConducta >= 5 && promedioConducta < 7) {
      return 'C'
    } else if ( promedioConducta >= 3 && promedioConducta < 5) {
      return 'D'
    } 
    return 'E'

  }
}
