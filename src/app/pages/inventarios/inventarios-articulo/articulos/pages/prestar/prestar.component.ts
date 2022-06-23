import { Component, OnInit } from '@angular/core';
import { Inventario } from '../../../../../../Model/Inventarios/Inventario';
import { empleado } from '../../../../../../Model/rolesTS/empleado';
import { InventarioService } from '../../../../../../Servicio/modulo_invetario/inventario.service';
import { EmpleadoService } from '../../../../../../Servicio/roles_Usuario/empleado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MensajesSweetService } from '../../../../../../Servicio/modulo_invetario/mensajes-sweet.service';
import { SalidaArticulo } from '../../../../../../Model/Inventarios/SalidaArticulo';
import { SalidaArticuloService } from '../../../../../../Servicio/modulo_invetario/salida-articulo.service';

@Component({
  selector: 'app-prestar',
  templateUrl: './prestar.component.html',
  styleUrls: ['./prestar.component.css']
})
export class PrestarComponent implements OnInit {

  public inventarioArticulos: Inventario [] = [];
  public empleados: empleado [] = [];

  public prestarArticuloForm: FormGroup = this._formBuilder.group({
    fechaSalida: [ , [ Validators.required ]],
    inventario: [ , [ Validators.required ]],
    empleado: [ , [ Validators.required ]],
    detallesalida: [ '' ],
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _salidaArticuloService: SalidaArticuloService,
    private _inventarioService: InventarioService,
    private _empleadosService: EmpleadoService,
    private _mensajesSweetService: MensajesSweetService,
    ) { }

  ngOnInit(): void {
    this.getInventario();
    this.getEmpleados();
  }

  getInventario = () => this._inventarioService.getInventarios().subscribe({
    next: (resp) => this.inventarioArticulos = resp,
    error: (err) => console.log
  });

  getEmpleados = () => this._empleadosService.getEmpleados().subscribe({
    next: (resp) => this.empleados = resp,
    error: (err) => console.log
  });

  realizarAccion = () => {    
    if ( this.prestarArticuloForm.valid ) {
      let salida = this.prestarArticuloForm.value;
      console.log(salida);
      this.crear( salida );
    } else {
      this.prestarArticuloForm.markAllAsTouched();
    }
  }

  crear = (salida: SalidaArticulo) => {
    this._salidaArticuloService.crearSalida( salida ).subscribe({
      next: (response) => {
        if ( response === 'ok') {
          this._mensajesSweetService.mensajeOk('Artículo prestado');
          this.prestarArticuloForm.reset();
        } else if( response === 'error' ){
          this._mensajesSweetService.mensajeError('Upss!', 'No hay disponibilidad',);
        } else {
          this._mensajesSweetService.mensajeError('Upss!', 'No se pudo registrar el préstamo',);
        }
      }
    });
  }

  verificarCampo  = ( campo: string ): boolean => {
    return ( this.prestarArticuloForm.controls?.[campo].invalid || false) && ( this.prestarArticuloForm.controls?.[campo].touched || false );
  }

}
