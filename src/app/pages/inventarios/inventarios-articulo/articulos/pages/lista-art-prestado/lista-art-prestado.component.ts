import { Component, OnInit } from '@angular/core';
import { SalidaArticulo } from '../../../../../../Model/Inventarios/SalidaArticulo';
import { SalidaArticuloService } from '../../../../../../Servicio/modulo_invetario/salida-articulo.service';
import { ConfirmationService } from 'primeng/api';
import { MensajesSweetService } from '../../../../../../Servicio/modulo_invetario/mensajes-sweet.service';

@Component({
  selector: 'app-lista-art-prestado',
  templateUrl: './lista-art-prestado.component.html',
  styleUrls: ['./lista-art-prestado.component.css'],
  providers: [ ConfirmationService ]
})
export class ListaArtPrestadoComponent implements OnInit {
  public articulosPrestados: SalidaArticulo [] = [];
  public selectArticuloSalida?: SalidaArticulo;
  public displayEmpleado: boolean = false;
  public displayInventario: boolean = false;
  constructor(
    private _confirmationService: ConfirmationService,
    private _salidaArticuloService: SalidaArticuloService,
    private _mensajesSweetService: MensajesSweetService,
  ) { }

  ngOnInit(): void {
    this.getSalidaArticulos();
  }

  getSalidaArticulos = () => {
    this._salidaArticuloService.getSalidaArticulos().subscribe({
      next: ( resp ) => this.articulosPrestados = resp,
      error: (err) => this.articulosPrestados = []
    })
  }

  abrirDialogEliminarBajaArticulo(salidaArticulo: SalidaArticulo) {
    this._confirmationService.confirm({
        message: `Desea eliminar : ${salidaArticulo.codigo}?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonStyleClass: 'p-button-danger p-button-text',
        accept: () => {
          this._salidaArticuloService.eliminarSalidaArticulo( salidaArticulo.id_salida_art! ).subscribe({
            next: (resp) => {              
              if ( resp === 'ok' ) {
                this._mensajesSweetService.mensajeOk('Registro de salida eliminado');
                this.articulosPrestados = this.articulosPrestados.filter( art => art.id_salida_art !== salidaArticulo.id_salida_art);
              } else {
                this._mensajesSweetService.mensajeError('Upps!', `No se pudo eliminar`);
              }
            }
          });
        }
    });
  }

  showDialog(articuloPrestado: SalidaArticulo) {    
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
