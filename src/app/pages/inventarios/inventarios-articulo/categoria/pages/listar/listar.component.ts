import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { Categoria } from 'src/app/Model/Inventarios/categorias';
import { CategoriaArticuloService } from 'src/app/Servicio/modulo_invetario/categoria-articulo.service';
import { MensajesSweetService } from 'src/app/Servicio/modulo_invetario/mensajes-sweet.service';




@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [ ConfirmationService ]
})
export class ListarComponent implements OnInit {

  public categorias: Categoria [] = [];
  public selectCategoria?: Categoria;
  public displayCategoria?: boolean;
  
  constructor(
    private _confirmationService: ConfirmationService,
    private _categoriaArticuloService: CategoriaArticuloService,
    private _mensajesSweetService: MensajesSweetService,
  ) { }

  ngOnInit(): void {
    this.getInventarios();
  }

  getInventarios = () => {
    this._categoriaArticuloService.getCategorias().subscribe({
      next: (resp) => {
        this.categorias = resp;
      },
      error: (err) => {
        this.categorias = [];
      }
    });
  }

  eliminarCategoria(categoria: Categoria) {
    this._confirmationService.confirm({
        message: 'Desea eliminar la categoría: ' + categoria.cateNombre + ' Cod: ' + categoria.cateCodigo + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        rejectButtonStyleClass: 'p-button-danger p-button-text',
        accept: () => {
          this._categoriaArticuloService.eliminarPorId(categoria.id_categoria!).subscribe({
            next: (resp) => {;
              if ( resp === 'ok' ) {
                this._mensajesSweetService.mensajeOk('Categoría eliminada');
                this.categorias = this.categorias.filter(cat => cat.id_categoria !== categoria.id_categoria);
              } else {
                this._mensajesSweetService.mensajeError('Upps!', `No se pudo eliminar la categoría: ${categoria.cateNombre}`);
              }
            }
          });
        }
    });
  }
}
