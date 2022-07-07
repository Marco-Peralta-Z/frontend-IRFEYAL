import { formatDate, UpperCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { Registro } from 'src/app/Model/tutorias/registro';


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  fechaActual: Date = new Date();

  constructor() { 

  }

  generarCertificado(registro: Registro, secretaria: empleado, rector: empleado, imprimir: boolean) {

    const docPdf = new jsPDF();

    docPdf.addImage('../../../../../assets/img/logoMatricula.jpeg', "JPEG", 80, 15, 45, 20);
    docPdf.setFont("times", "bold");
    docPdf.text("UNIDAD EDUCATIVA FISCOMISIONAL", 105, 60, { align: "center" });
    docPdf.text("JOSÉ MARÍA VELAZ, S.J.", 105, 70, { align: "center" });
    
    let fechaActual = `${formatDate(Date.now(), 'MMMM', 'es-EC')} de ${new Date().getFullYear()}`;
    let dia = formatDate(Date.now(), 'd', 'es-EC');
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
      docPdf.save(`${registro.id_registro}_matricula.pdf`);
    }

  }
}
