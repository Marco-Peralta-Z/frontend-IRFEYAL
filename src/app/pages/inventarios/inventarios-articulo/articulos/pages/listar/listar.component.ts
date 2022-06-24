import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { MensajesSweetService } from '../../../../../../Servicio/modulo_invetario/mensajes-sweet.service';
import { InventarioService } from '../../../../../../Servicio/modulo_invetario/inventario.service';
import { StockArticulo } from '../../../../../../Model/Inventarios/stockArticulo';
import { Articulo } from '../../../../../../Model/Inventarios/Articulo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetallebajaArti } from '../../../../../../Model/Inventarios/DetallebajaArti';
import { DetalleBajaArticuloService } from '../../../../../../Servicio/modulo_invetario/detalle-baja-articulo.service';
import { ResDetallaBajaArt } from '../../../../../../Model/Inventarios/interfaces/resp';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ ConfirmationService ]
})
export class ListarComponent implements OnInit {
  
  public stockArticulos: StockArticulo [] = [];
  public selectStockArticulo?: StockArticulo;
  public selectArticulo?: Articulo;
  public displayArticulos?: boolean; 
  public displayBajaArticulo?: boolean; 
  
  public bajaDetalleForm: FormGroup = this._formBuilder.group({
    motivo: [ , [ Validators.required ]],
    fechaBaja: [ , [ Validators.required ]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _confirmationService: ConfirmationService,
    private _inventarioService: InventarioService,
    private _bajaDetalleArticuloService: DetalleBajaArticuloService,
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

  realizarAccion = () => {
    if ( this.bajaDetalleForm.valid && this.selectArticulo) {
      let detalleBaja: DetallebajaArti = this.bajaDetalleForm.value;
      detalleBaja.id_inventario = {id_inventario: this.selectArticulo.id_articulo};
      console.log(detalleBaja);
      this.abrirDialogDarBajaArticulo( detalleBaja );
      
    } else {
      this.bajaDetalleForm.markAllAsTouched();
    }
  }

  abrirDialogDarBajaArticulo(bajaDetalle: DetallebajaArti) {
    this._confirmationService.confirm({
        message: `Desea dar de baja el artículo: ${this.selectArticulo!.articodigo} - ${this.selectArticulo!.artinombre}?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonStyleClass: 'p-button-danger p-button-text',
        accept: () => {
          this._bajaDetalleArticuloService.crearDetalleBajaArticulo( bajaDetalle ).subscribe({
            next: (resp: ResDetallaBajaArt) => {              
              if ( resp.status === 'ok' ) {
                this._mensajesSweetService.mensajeOk('Artículo dado de baja');
                this.closeDialogBajaArticulo();
                this.getInventarios();
                this.selectStockArticulo!.listaArticulos = this.selectStockArticulo?.listaArticulos?.filter( art => art.id_articulo !== bajaDetalle.id_inventario?.id_inventario);                
              } else if ( resp.error){
                this._mensajesSweetService.mensajeError('Upps!', resp.error);
              } else {
                this._mensajesSweetService.mensajeError('Upps!', `No se pudo dar de baja este artículo`);
              }
            }
          });
        }
    });
  }


  showDialog(stockArticulo: StockArticulo) {
    console.log(stockArticulo.listaArticulos);
    this.selectStockArticulo = stockArticulo;
    this.displayArticulos = true;
  }
  showDialogBajaArticulo(articulo: Articulo) {
    console.log(articulo);
    this.selectArticulo = articulo;
    this.displayBajaArticulo = true;
  }
  closeDialog() {
    this.selectStockArticulo = {};
    this.displayArticulos = false;
  }
  closeDialogBajaArticulo() {
    this.selectArticulo = {};
    this.bajaDetalleForm.reset();
    this.displayBajaArticulo = false;
  }

  verificarCampo  = ( campo: string ): boolean => {
    return ( this.bajaDetalleForm.controls?.[campo].invalid || false) && ( this.bajaDetalleForm.controls?.[campo].touched || false );
  }
}
