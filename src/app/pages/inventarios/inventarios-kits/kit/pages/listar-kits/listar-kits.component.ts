import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { KitService } from '../../../../../../Servicio/modulo_invetario/kit.service';
import { Kit } from '../../../../../../Model/Inventarios/Kit';

@Component({
  selector: 'app-listar-kits',
  templateUrl: './listar-kits.component.html',
  styleUrls: ['./listar-kits.component.css'],
  providers: [ ConfirmationService ]
})
export class ListarKitsComponent implements OnInit {
  public kits: Kit [] = [];
  constructor(
    private _confirmationService: ConfirmationService,
    private _kitService: KitService
  ) { }

  ngOnInit(): void {
    this.getKits();
  }

  getKits = () => {
    this._kitService.getKits().subscribe({
      next: (resp) => {
        console.log(resp);
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
          // this._moduloService.eliminarPorId(modulo.id_modulo_libro!).subscribe({
          //   next: (resp) => {;
          //     if ( resp === 'ok' ) {
          //       this._mensajesSweetService.mensajeOk('Módulo eliminado');
          //       this.modulos = this.modulos.filter(mod => mod.id_modulo_libro !== modulo.id_modulo_libro);
          //     } else {
          //       this._mensajesSweetService.mensajeError('Upps!', `No se pudo eliminar: ${modulo.nombreModulo}, debido a que tienen una relación con un kit`);
          //     }
          //   }
          // });
        }
    });
  }
}
