import { Component, OnInit } from '@angular/core';
import { EntregarKitService } from '../../../../../../Servicio/modulo_invetario/entregar-kit.service';
import { Aprobacion } from '../../../../../../Model/Inventarios/Aprobacion';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ ConfirmationService ]
})
export class ListarComponent implements OnInit {
  public aprobaciones: Aprobacion [] = [];
  constructor(
    private _confirmationService: ConfirmationService,
    private _entregarKitService: EntregarKitService, 
  ) { }

  ngOnInit(): void {
    this.getKitsEntregados();
  }

  
  getKitsEntregados = () => {
    this._entregarKitService.getKitsEntregados().subscribe({
      next: (resp) => {
        this.aprobaciones = resp as Aprobacion[];
      }
    });
  }

  eliminarKitEntregado(aprobacion: Aprobacion) {
    this._confirmationService.confirm({
        message: 'Desea eliminar: ' + aprobacion.tipoAprobacion + '?',
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

}
