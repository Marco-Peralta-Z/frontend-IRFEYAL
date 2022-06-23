import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaArticuloService } from '../../../../../../Servicio/modulo_invetario/categoria-articulo.service';
import { MensajesSweetService } from '../../../../../../Servicio/modulo_invetario/mensajes-sweet.service';
import { Categoria } from '../../../../../../Model/Inventarios/categorias';
import { Articulo } from '../../../../../../Model/Inventarios/Articulo';
import { ArticuloService } from '../../../../../../Servicio/modulo_invetario/articulo.service';
import { ResArticulo } from '../../../../../../Model/Inventarios/interfaces/resp';

@Component({
  selector: 'app-editar-articulo',
  templateUrl: './editar-articulo.component.html',
  styleUrls: ['./editar-articulo.component.css']
})
export class EditarArticuloComponent implements OnInit {

  public articuloForm: FormGroup = this._formBuilder.group({
    artinombre: [ ,[ Validators.required]],
    cateId: [ ,[ Validators.required]],
    artimarca: [ ,[ Validators.required]],
    artiprecio: [ ,[ Validators.required]],
    artidescrip: [ '' ],
  });

  public categoriasArticulos: Categoria [] = [];
  public id?: number;
  private selectArticulo?: Articulo;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _articuloService: ArticuloService,
    private _categoriaArticuloService: CategoriaArticuloService,
    private _mensajesSweetService: MensajesSweetService,
  ) { }

  ngOnInit(): void {
    this.getArticuloIdParam();
    this.getCategoriasArticulo();
  }

  getArticuloIdParam = () => {
    this._activatedRoute.paramMap.subscribe( params => {      
      this.id = +params.get('id')!;
      if ( this.id && !isNaN(this.id)) {
        this.getArticulo(this.id);              
      } else {
        this._router.navigate(['/inventariosModule/inventario/crear']);
      }
    });
  }

  getCategoriasArticulo = () => {
    this._categoriaArticuloService.getCategorias().subscribe({
      next: (resp) => this.categoriasArticulos = resp,
      error: (err) => console.log
    })
  }

  realizarAccion = () => {    
    console.log(this.articuloForm.value);
    if ( this.articuloForm.valid && this.selectArticulo ) {
      let { cateId, artinombre, artimarca, artiprecio, artidescrip } = this.articuloForm.value;
      this.selectArticulo.cateId = cateId;
      this.selectArticulo.artinombre = artinombre;
      this.selectArticulo.artimarca = artimarca;
      this.selectArticulo.artiprecio = artiprecio;
      this.selectArticulo.artidescrip = artidescrip;
      this.actualizar( this.selectArticulo );
    } else {
      this.articuloForm.markAllAsTouched();
    }
  }

  actualizar = (articulo: Articulo) => {
    this._articuloService.actualizarArticulo( articulo, this.id! ).subscribe({
      next: (response) => {
        if ( response === 'ok') {
          this._mensajesSweetService.mensajeOk('Artículo actualizdo');
          this.articuloForm.reset();
          this._router.navigate(['/inventariosModule/inventario/listar']);
        } else {
          this._mensajesSweetService.mensajeError('Upss!', 'No se pudo actualizar el artículo',);
        }
      }
    });
  }

  getArticulo = (id: number) => {
    this._articuloService.getArticuloPorId( id ).subscribe({
      next: (response) => {        
        if ( response ) {
          this.articuloForm.patchValue(response);
          this.selectArticulo = response;
          // TODO: revisar error dropdown
        }
      },
      error: (error) => {        
        if (error.status === 404) {
          this._mensajesSweetService.mensajeError('Upss!', 'No se pudo encontrar ese articulo',);
          this._router.navigate(['/inventariosModule/inventario/listar']);
        }
      }
    });
  }

  verificarCampo  = ( campo: string ): boolean => {
    return ( this.articuloForm.controls?.[campo].invalid || false) && ( this.articuloForm.controls?.[campo].touched || false );
  }

}
