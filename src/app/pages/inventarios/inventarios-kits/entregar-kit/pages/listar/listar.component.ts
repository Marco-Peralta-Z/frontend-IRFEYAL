import { Component, OnInit } from '@angular/core';
import { EntregarKitService } from '../../../../../../Servicio/modulo_invetario/entregar-kit.service';
import { Aprobacion } from '../../../../../../Model/Inventarios/Aprobacion';
import { ConfirmationService } from 'primeng/api';
import { MensajesSweetService } from '../../../../../../Servicio/modulo_invetario/mensajes-sweet.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ ConfirmationService ]
})
export class ListarComponent implements OnInit {
  public aprobaciones: Aprobacion [] = [];
  public selectAprobacion?: Aprobacion;
  public displayEstudiante?: boolean;
  public displayAdmin?: boolean;
  constructor(
    private _confirmationService: ConfirmationService,
    private _aprobacionService: EntregarKitService,
    private _entregarKitService: EntregarKitService,
    private _mensajesSweetService: MensajesSweetService,
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
        message: 'Desea eliminar: ' + aprobacion.tipoAprobacion +' del estudiante: '+ aprobacion.estudiante?.id_persona.nombre +' '+aprobacion.estudiante?.id_persona.apellido  + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonStyleClass: 'p-button-danger p-button-text',
        accept: () => {
          this._aprobacionService.eliminarAprobacionPorId( aprobacion.id_aprobacion! ).subscribe({
            next: (resp) => {;
              if ( resp === 'ok' ) {
                this._mensajesSweetService.mensajeOk('Aprobación eliminada');
                this.aprobaciones = this.aprobaciones.filter(aprob => aprobacion.id_aprobacion !== aprob.id_aprobacion);
              } else {
                this._mensajesSweetService.mensajeError('Upps!', `No se pudo eliminar la aprobacion de: ${aprobacion.estudiante?.id_persona.nombre +' '+aprobacion.estudiante?.id_persona.apellido}`);
              }
            }
          });
        }
    });
  }

  showDialog(aprobacion:Aprobacion) {
    this.selectAprobacion = aprobacion;
    this.displayEstudiante = true;
  }
  showDialogAdmin(aprobacion:Aprobacion) {
    this.selectAprobacion = aprobacion;
    this.displayAdmin = true;
  }
  closeDialog() {
    this.selectAprobacion = {};
    this.displayEstudiante = false;
    this.displayAdmin = false;
  }
}
