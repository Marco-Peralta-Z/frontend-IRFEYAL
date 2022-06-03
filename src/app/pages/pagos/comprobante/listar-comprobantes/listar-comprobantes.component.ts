import { Component, OnInit } from '@angular/core';
import { DetalleComprobante } from 'src/app/Model/Pagos/detalleComprobante';
import { ComprobanteService } from 'src/app/Servicio/pagos/comprobante.service';


@Component({
  selector: 'app-listar-comprobantes',
  templateUrl: './listar-comprobantes.component.html',
  styleUrls: ['./listar-comprobantes.component.scss']
})
export class ListarComprobantesComponent implements OnInit {

  detalleComprobantes: DetalleComprobante[]=[];
  constructor(private comprobanteService: ComprobanteService ) { }
  date?:Date;
  ngOnInit(): void {
    this.getComprobantes();
    
  }

  getComprobantes(){
    this.comprobanteService.getAllComprobante()
    .subscribe(comprobante => {
      console.log(comprobante);
      this.detalleComprobantes=comprobante});
  }

  buscarComprobante(){
    
  }

  imprimirLista(){
    
  }


  eliminarComprobante(id:number){
      this.comprobanteService.deleteComprobante(id)
      .subscribe(comprobanteEliminado => {
      console.log(comprobanteEliminado);
      this.getComprobantes();
      })
      
  }

}
