import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { DetalleComprobante } from 'src/app/Model/Pagos/detalleComprobante';


@Injectable({
  providedIn: 'root'
})
export class GenerarComprobantePdfService {
  fechaActual: Date = new Date();

  constructor() {

   }

  generarComprobante(detalleComprobante: DetalleComprobante, imprimir: boolean){

    const docPdf= new jsPDF();

    docPdf.addImage('../../../../../assets/img/logo.png', "PNG", 80, 15, 45, 20);
    docPdf.setFont("times", "bold");
    docPdf.text("UNIDAD EDUCATIVA FISCOMISIONAL", 105, 60, {align:"center"} );
    docPdf.text("JOSÉ MARÍA VELAZ, S.J.", 105, 70, {align:"center"});
    docPdf.setFontSize(11);
    docPdf.setFont("times", "normal");
    docPdf.text("EXTENSIÓN Nº 105", 105, 75, {align:"center"});
    docPdf.text("COMPROBANTE DE PAGO", 105, 80, {align:"center"});
    docPdf.text(`CODIGO COMPROBANTE: ${detalleComprobante.idDetalleComprobante}`, 20,90);
    let fecha = formatDate(detalleComprobante.idComprobante.fecha!,'MMMM-d-y','es-EC')
    docPdf.text(`FECHA: ${fecha}`,125,90);
    docPdf.text(`ESTUDIANTE: ${detalleComprobante.idComprobante.idMatricula.estudiante.id_persona.nombre} ${detalleComprobante.idComprobante.idMatricula.estudiante.id_persona.apellido}`,20 ,95);
    docPdf.text(`CEDULA: ${detalleComprobante.idComprobante.idMatricula.estudiante.id_persona.cedula}`,125,95);
    docPdf.text(`CURSO: ${detalleComprobante.idComprobante.idMatricula.curso.descripcion}`,20,100);
    docPdf.text(`MODALIDAD: ${detalleComprobante.idComprobante.idMatricula.modalidad.descripcion}`,20,105);
    docPdf.text(`CONCEPTO DE PAGO: ${detalleComprobante.idComprobante.tipoComprobante.id_conceptoPago?.descripcion}`,20,130);
    docPdf.text(`COSTO: ${detalleComprobante.valor}`,45,135);
    docPdf.text(`MONTO INGRESADO: ${detalleComprobante.idComprobante.valor_total}`,20 ,140);
    docPdf.text(`TOTAL: ${detalleComprobante.valor}`,45,145);
    docPdf.text(`SALDO: ${detalleComprobante.idComprobante.saldo}`,45 ,150);

    if (imprimir) {
      docPdf.autoPrint();
      docPdf.output('dataurlnewwindow');
    } else {
      docPdf.save(`${detalleComprobante.idDetalleComprobante}_comprobantePago.pdf`);  
    }
    
    
    
  }
  
}
