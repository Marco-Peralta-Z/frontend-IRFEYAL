import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Categoria } from '../../../../../../Model/Inventarios/categorias';
import { ResCategoria } from '../../../../../../Model/Inventarios/intefaces/resp';
import { CategoriaArticuloService } from '../../../../../../Servicio/modulo_invetario/categoria-articulo.service';
import { MensajesSweetService } from '../../../../../../Servicio/modulo_invetario/mensajes-sweet.service';


@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css']
})
export class CrearEditarComponent implements OnInit {

  public categoriaForm: FormGroup = this._formBuilder.group({
    cateNombre: [ , [ Validators.required]],
    cateCodigo: [ , [ Validators.required]],
  });

  public id?: number;


  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _categoriaArticuloService: CategoriaArticuloService,
    private _mensajesSweetService: MensajesSweetService,
  ) { }

  ngOnInit(): void {
    this.getCategoriaIdParam();
  }

  getCategoriaIdParam = () => {
    this._activatedRoute.paramMap.subscribe( params => {      
      this.id = +params.get('id')!;
      if ( this.id && !isNaN(this.id)) {
        this.getCategoriaPorId( this.id );
      } else {
        this._router.navigate(['/inventariosModule/categoria/crear']);
      }
    });
  }

  realizarAccion = () => {
    if (this.categoriaForm.valid) {
      let categoria: Categoria = this.categoriaForm.value;
      if ( this.id ) {
        this.actualizarCategoria( categoria );
      } else {
        this.crearCategoria( categoria );
      }
    } else {
      this.categoriaForm.markAllAsTouched();
    }
  }

  crearCategoria = ( categoria: Categoria ) => {
    this._categoriaArticuloService.crearCategoria( categoria ).subscribe({
      next: ( response ) => {
        if ( response === 'ok') {
          this._mensajesSweetService.mensajeOk('Categoría creada');
          this.categoriaForm.reset();
        } else {
          this._mensajesSweetService.mensajeError('Upss!', 'No se pudo crear la categoría',);
        }
      }
    });
  }

  actualizarCategoria = ( categoria: Categoria ) => {
    this._categoriaArticuloService.actualizarCategoria( this.id!, categoria ).subscribe({
      next: ( response ) => {
        if ( response === 'ok') {
          this.categoriaForm.reset();
          this._mensajesSweetService.mensajeOk('Categoría Actualizada');
          this._router.navigate(['/inventariosModule/categoria/listar']);
        } else {            
          this._mensajesSweetService.mensajeError('Upss!', 'No se pudo actualizar la categoría',);
        }
      }
    });
  }

  getCategoriaPorId = (id: number) => {
    this._categoriaArticuloService.getPorId(id).subscribe({
      next: (response: ResCategoria) => {
        if ( response.status === 'ok' ) {
          this.categoriaForm.patchValue(response.categoria);
        }
      },
      error: (error) => {
        console.log(error); 
        if (error.status === 404) {
          this._mensajesSweetService.mensajeError('Upss!', 'No se pudo encontrar esa categoría',);
          this._router.navigate(['/inventariosModule/categoria/listar']);
        }
      }
    });
  }

  verificarCampo  = ( campo: string ): boolean => {
    return ( this.categoriaForm.controls?.[campo].invalid || false) && ( this.categoriaForm.controls?.[campo].touched || false );
  }

}
