import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { KitService } from '../../../../../../Servicio/modulo_invetario/kit.service';
import { Kit } from '../../../../../../Model/Inventarios/Kit';
import { MensajesSweetService } from '../../../../../../Servicio/modulo_invetario/mensajes-sweet.service';

@Component({
  selector: 'app-listar-kits',
  templateUrl: './listar-kits.component.html',
  styleUrls: ['./listar-kits.component.css'],
  providers: [ ConfirmationService ]
})
export class ListarKitsComponent implements OnInit {
  public kits: Kit [] = [];
  public selectKit?: Kit;
  public displayModulos?: boolean;
  constructor(
    private _confirmationService: ConfirmationService,
    private _kitService: KitService,
    private _mensajesSweetService: MensajesSweetService,
  ) { }

  ngOnInit(): void {
    this.getKits();
  }

  getKits = () => {
    this._kitService.getKits().subscribe({
      next: (resp) => {
        this.kits = resp as Kit[];
      }
    })
  }

  eliminarKit(kit: Kit) {
    this._confirmationService.confirm({
        message: 'Desea eliminar: ' + kit.nombrekit + '?',
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

  showDialog(kit: Kit) {
    this.selectKit = kit;
    this.displayModulos = true;
  }
  closeDialog() {
    this.selectKit = {};
    this.displayModulos = false;
  }
}
