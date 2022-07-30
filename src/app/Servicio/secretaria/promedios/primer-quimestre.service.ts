import { Injectable } from '@angular/core';
import { empleado } from '../../../Model/rolesTS/empleado';
import jsPDF, { CellConfig, TableConfig, TextOptionsLight } from 'jspdf';
import { formatDate } from '@angular/common';
import { Periodo } from '../../../Model/Parametrizacion/Periodo';
import { Curso } from '../../../Model/Parametrizacion/Curso';
import { Notas } from '../../../Model/tutorias/registro';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PrimerQuimestreService {

  constructor() { }

  generarCertificado( secretaria: empleado, rector: empleado, imprimir: boolean, periodo: Periodo, curso: Curso, notas: Notas[], materias: string[]) {

    const docPdf = new jsPDF();
    
    docPdf.addImage('../../../../../assets/img/logoMatricula.jpeg', "JPEG", 150, 15, 45, 20);
    docPdf.setFont("times", "bold");
    docPdf.setFontSize(11);
    docPdf.text('UNIDAD EDUCATIVA FISCOMISIONAL "JOSÉ MARÍA VELAZ, S.J."', 105, 50, {align:"center"} );
    docPdf.text(`EXTENSION EDUCATIVA N° ${rector.extension.nombre_extension} - ${rector.extension.id_direccion?.canton?.canton}`, 105, 55, {align:"center"});
    docPdf.text(`CUADRO DE CALIFICACIONES PRIMER QUIMESTRE`, 105, 60, {align:"center"});
    let fechaInicio = formatDate(periodo.fecha_inicio, 'Y', 'es-EC').toUpperCase();
    let fechaFin = formatDate(periodo.fecha_fin, 'Y', 'es-EC').toUpperCase();
    console.log(fechaInicio, fechaFin);
    docPdf.text(`AÑO LECTIVO ${fechaInicio} - ${fechaFin}`, 105, 65, {align:"center"});
    docPdf.setFont("times", "normal");
    
    
    
    docPdf.text(`${curso.descripcion.toUpperCase()}`, 20, 80, {align:"left"});

    // tabla
    autoTable(docPdf, {
      styles:{},
      head: [materias],
      body: [
        ['David', 'david@example.com', 'Sweden'],
        ['Castille', 'castille@example.com', 'Spain'],
        // ...
      ],
    })
  
    // 


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
      docPdf.save(`${curso.id_curso}_${curso.descripcion}_primerQuimestre.pdf`);
    }

  }

}
