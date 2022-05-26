import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';

import { Modulo } from '../../../../../../Model/Inventarios/ModuloLibro';

import { ModuloService } from '../../../../../../Servicio/modulo_invetario/modulo.service';
import { MensajesSweetService } from '../../../../../../Servicio/modulo_invetario/mensajes-sweet.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ConfirmationService]
})
export class ListarComponent implements OnInit {

  public modulos: Modulo [] = [];

  constructor(
    private _confirmationService: ConfirmationService,
    private _moduloService: ModuloService,
    private _mensajesSweetService: MensajesSweetService,
  ) { }

  ngOnInit(): void {
    this.getModulos();
  }

  getModulos = () => {
    this._moduloService.getModulos().subscribe({
      next: (resp) => {
        this.modulos = resp as Modulo[];
      },
    })
  }

  eliminarModulo(modulo: Modulo) {
    this._confirmationService.confirm({
        message: 'Desea eliminar: ' + modulo.nombreModulo + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonStyleClass: 'p-button-danger p-button-text',
        accept: () => {
          this._moduloService.eliminarPorId(modulo.id_modulo_libro!).subscribe({
            next: (resp) => {;
              if ( resp === 'ok' ) {
                this._mensajesSweetService.mensajeOk('Módulo eliminado');
                this.modulos = this.modulos.filter(mod => mod.id_modulo_libro !== modulo.id_modulo_libro);
              } else {
                this._mensajesSweetService.mensajeError('Upps!', `No se pudo eliminar: ${modulo.nombreModulo}, debido a que tienen una relación con un kit`);
              }
            }
          })
        }
    });
}

}
