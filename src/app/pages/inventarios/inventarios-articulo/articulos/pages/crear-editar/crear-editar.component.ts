import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaArticuloService } from '../../../../../../Servicio/modulo_invetario/categoria-articulo.service';
import { Categoria } from '../../../../../../Model/Inventarios/categorias';
import { Inventario } from '../../../../../../Model/Inventarios/Inventario';
import { InventarioService } from '../../../../../../Servicio/modulo_invetario/inventario.service';
import { MensajesSweetService } from '../../../../../../Servicio/modulo_invetario/mensajes-sweet.service';
import { AuthService } from '../../../../../../Servicio/auth/auth.service';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css']
})
export class CrearEditarComponent implements OnInit {

  public inventarioForm: FormGroup = this._formBuilder.group({
    fechaingreso: [ ,[ Validators.required]],
    cateId: [ ,[ Validators.required]],
    artinombre: [ ,[ Validators.required]],
    artimarca: [ ,[ Validators.required]],
    artiprecio: [ ,[ Validators.required]],
    artidescrip: [ '' ],
    observacion: [ '' ],
  });

  public categoriasArticulos: Categoria [] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _categoriaArticuloService: CategoriaArticuloService,
    private _inventarioService: InventarioService,
    private _authService: AuthService,
    private _mensajesSweetService: MensajesSweetService,
  ) { }

  ngOnInit(): void {
    this.getCategoriasArticulo();
  }

  getCategoriasArticulo = () => {
    this._categoriaArticuloService.getCategorias().subscribe({
      next: (resp) => this.categoriasArticulos = resp,
      error: (err) => console.log
    })
  }

  realizarAccion = () => {    
    if ( this.inventarioForm.valid ) {
      let inventario = this.getInfoInventoriedForm();
      console.log(inventario);
      this.crear( inventario );
    } else {
      this.inventarioForm.markAllAsTouched();
    }
  }

  getInfoInventoriedForm = (): Inventario => {
    let { fechaingreso, cateId, artinombre, artimarca, artiprecio, artidescrip, observacion } = this.inventarioForm.value;
      return {
        fechaingreso,
        cantidad: 1,
        articulo: {
          artinombre,
          artiprecio,
          artidescrip,
          artimarca,
          cateId,
          controlArticulo: { observacion, administrador: this._authService.usuario.empleado }
        }
      };
  }

  crear = (inventario: Inventario) => {
    this._inventarioService.crearInventario( inventario ).subscribe({
      next: (response) => {
        if ( response === 'ok') {
          this._mensajesSweetService.mensajeOk('Artículo agregado');
          this.inventarioForm.reset();
        } else {
          this._mensajesSweetService.mensajeError('Upss!', 'No se pudo registrar el artículo',);
        }
      }
    });
  }

  verificarCampo  = ( campo: string ): boolean => {
    return ( this.inventarioForm.controls?.[campo].invalid || false) && ( this.inventarioForm.controls?.[campo].touched || false );
  }
}
