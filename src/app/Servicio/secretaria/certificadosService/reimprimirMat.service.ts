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
    
    
    
    
    if (imprimir) {
      docPdf.autoPrint();
      docPdf.output('dataurlnewwindow');
    } else {
      docPdf.save(`${certificadoMat.id_generar_certificado_matricula}_matricula.pdf`);  
    }
    
    
    
  }
}
