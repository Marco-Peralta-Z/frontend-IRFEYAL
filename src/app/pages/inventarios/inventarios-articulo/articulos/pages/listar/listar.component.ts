import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { MensajesSweetService } from '../../../../../../Servicio/modulo_invetario/mensajes-sweet.service';
import { InventarioService } from '../../../../../../Servicio/modulo_invetario/inventario.service';
import { StockArticulo } from '../../../../../../Model/Inventarios/stockArticulo';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ ConfirmationService ]
})
export class ListarComponent implements OnInit {
  
  public stockArticulos: StockArticulo [] = [];
  public selectStockArticulo?: StockArticulo;
  public displayArticulos?: boolean; 
  
  constructor(
    private _confirmationService: ConfirmationService,
    private _inventarioService: InventarioService,
    private _mensajesSweetService: MensajesSweetService,
  ) { }

  ngOnInit(): void {
    this.getInventarios();
  }

  getInventarios = () => {
    this._inventarioService.getStockArticulos().subscribe({
      next: (resp) => {
        console.log(resp);
        this.stockArticulos = resp;
      },
      error: (err) => console.log
    });
  }

  eliminarInventario(stockArticulo: StockArticulo) {
    this._confirmationService.confirm({
        message: 'Desea eliminar: ' + stockArticulo.categoria + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonStyleClass: 'p-button-danger p-button-text',
        accept: () => {
          // this._kitService.eliminarPorId(kit.id_kit!).subscribe({
          //   next: (resp) => {;
          //     if ( resp === 'ok' ) {
          //       this._mensajesSweetService.mensajeOk('Módulo eliminado');
          //       this.kits = this.kits.filter(kit => kit.id_kit !== kit.id_kit);
          //     } else {
          //       this._mensajesSweetService.mensajeError('Upps!', `No se pudo eliminar el kit: ${kit.nombrekit}`);
          //     }
          //   }
          // });
        }
    });
  }

  showDialog(stockArticulo: StockArticulo) {
    console.log(stockArticulo.listaArticulos);
    this.selectStockArticulo = stockArticulo;
    this.displayArticulos = true;
  }
  closeDialog() {
    this.selectStockArticulo = {};
    this.displayArticulos = false;
  }

}
