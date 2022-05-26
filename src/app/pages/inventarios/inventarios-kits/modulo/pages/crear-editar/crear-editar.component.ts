import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuloService } from '../../../../../../Servicio/modulo_invetario/modulo.service';
import { Modulo } from '../../../../../../Model/Inventarios/ModuloLibro';
import { ResModulo } from '../../../../../../Model/Inventarios/intefaces/res_modulo.interface';
import Swal from 'sweetalert2';
import { MensajesSweetService } from '../../../../../../Servicio/modulo_invetario/mensajes-sweet.service';
import { modulo } from '../../../../../../Model/rolesTS/modulo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css']
})
export class CrearEditarComponent implements OnInit {

  public moduloForm: FormGroup = this._formBuilder.group({
    nombreModulo: [ , [ Validators.required ] ],
    codModulo: [ , [ Validators.required ] ],
    curso: [ , [ Validators.required ] ],
    cantidad: [ , [ Validators.required ] ],
    numero: [ , [ Validators.required ] ],
    numeroModulo: [ , [ Validators.required ] ],
  });

  public id?: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _moduloService: ModuloService,
    private _mensajesSweetService: MensajesSweetService,
  ) { }

  ngOnInit(): void {
    this.getModuloIdParam();
  }

  getModuloIdParam = () => {
    this._activatedRoute.paramMap.subscribe( params => {      
      this.id = +params.get('id')!;
      if ( this.id && !isNaN(this.id)) {
        this.getModulo(this.id);
      } else {
        this._router.navigate(['/inventariosModule/modulo/crear']);
      }
    });
  }

  realizarAccion = () => {
    if ( this.moduloForm.valid) {
      let modulo: Modulo = this.moduloForm.value;
      if ( this.id ) {
        this.actualizarModulo( modulo );
      } else {
        this.crearModulo( modulo );
      }
    } else {
      this.moduloForm.markAllAsTouched();
    }
  }

  crearModulo = ( modulo: Modulo ) => {
      this._moduloService.crearModulo( modulo ).subscribe({
        next: ( response ) => {
          if ( response === 'ok') {
            this._mensajesSweetService.mensajeOk('Módulo creado');
            this.moduloForm.reset();
          } else {
            this._mensajesSweetService.mensajeError('Upss!', 'No se pudo crear el módulo',);
          }
        }
      });
  }

  actualizarModulo = ( modulo: Modulo ) => {
      this._moduloService.actualizarModulo( this.id!, modulo ).subscribe({
        next: ( response ) => {
          if ( response === 'ok') {
            this.moduloForm.reset();
            this._mensajesSweetService.mensajeOk('Módulo Actualizado');
            this._router.navigate(['/inventariosModule/modulo/listar']);
          } else {            
            this._mensajesSweetService.mensajeError('Upss!', 'No se pudo actualizar el módulo',);
          }
        }
      });
  }

  getModulo = (id: number) => {
    this._moduloService.getModuloPorId(id).subscribe({
      next: (response: ResModulo) => {
        if ( response.status === 'ok' ) {
          this.moduloForm.patchValue(response.modulo);
        }
      },
      error: (error) => {
        if (error.status === 404) {
          this._mensajesSweetService.mensajeError('Upss!', 'No se pudo encontrar ese módulo',);
          this._router.navigate(['/inventariosModule/modulo/listar']);
          console.log(error); 
        }
      }
    });
  }

  verificarCampo  = ( campo: string ): boolean => {
    return ( this.moduloForm.controls?.[campo].invalid || false) && ( this.moduloForm.controls?.[campo].touched || false );
  }

}
