import { Component, OnInit } from '@angular/core';
import { SalidaArticulo } from '../../../../../../Model/Inventarios/SalidaArticulo';
import { SalidaArticuloService } from '../../../../../../Servicio/modulo_invetario/salida-articulo.service';

@Component({
  selector: 'app-lista-art-prestado',
  templateUrl: './lista-art-prestado.component.html',
  styleUrls: ['./lista-art-prestado.component.css']
})
export class ListaArtPrestadoComponent implements OnInit {
  public articulosPrestados: SalidaArticulo [] = [];
  public selectArticuloSalida?: SalidaArticulo;
  public displayEmpleado: boolean = false;
  public displayInventario: boolean = false;
  constructor(
    private _salidaArticuloService: SalidaArticuloService,
  ) { }

  ngOnInit(): void {
    this.getSalidaArticulos();
  }

  getSalidaArticulos = () => {
    this._salidaArticuloService.getSalidaArticulos().subscribe({
      next: ( resp ) => this.articulosPrestados = resp,
      error: (err) => console.log
    })
  }

  showDialog(articuloPrestado: SalidaArticulo) {
    console.log(articuloPrestado);
    
    this.selectArticuloSalida = articuloPrestado;
    this.displayEmpleado = true;
  }
  
  closeDialog() {
    this.selectArticuloSalida = {};
    this.displayEmpleado = false;
    this.displayInventario = false;
  }

  showDialogInventario(articuloPrestado: SalidaArticulo) {
    this.selectArticuloSalida = articuloPrestado;
    this.displayInventario = true;
  }
 
}
