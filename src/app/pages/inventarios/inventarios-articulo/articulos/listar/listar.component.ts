import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { MensajesSweetService } from '../../../../../Servicio/modulo_invetario/mensajes-sweet.service';
import { Inventario } from '../../../../../Model/Inventarios/Inventario';
import { InventarioService } from '../../../../../Servicio/modulo_invetario/inventario.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ ConfirmationService ]
})
export class ListarComponent implements OnInit {
  
  public inventarios: Inventario [] = [];
  public selectInventario?: Inventario;
  public displayArticulo?: boolean;
  
  constructor(
    private _confirmationService: ConfirmationService,
    private _inventarioService: InventarioService,
    private _mensajesSweetService: MensajesSweetService,
  ) { }

  ngOnInit(): void {
    this.getInventarios();
  }

  getInventarios = () => {
    this._inventarioService.getInventarios().subscribe({
      next: (resp) => {
        console.log(resp);
        this.inventarios = resp;
      },
      error: (err) => console.log
    });
  }

  eliminarInventario(inventario: Inventario) {
    this._confirmationService.confirm({
        message: 'Desea eliminar: ' + inventario.codigo + '?',
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

  showDialog(inventario: Inventario) {
    this.selectInventario = inventario;
    this.displayArticulo = true;
  }
  closeDialog() {
    this.selectInventario = {};
    this.displayArticulo = false;
  }

}
