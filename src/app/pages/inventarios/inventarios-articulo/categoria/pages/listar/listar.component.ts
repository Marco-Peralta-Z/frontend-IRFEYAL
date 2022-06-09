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

  public categoria: Categoria [] = [];
  public selectCategoria?: Categoria;
  public displayCategoria?: boolean;
  
  constructor(
    private _confirmationService: ConfirmationService,
    private categoriaArticuloService: CategoriaArticuloService,
    private _mensajesSweetService: MensajesSweetService,
  ) { }

  ngOnInit(): void {
    this.getInventarios();
  }

  getInventarios = () => {
    this.categoriaArticuloService.getInventarios().subscribe({
      next: (resp) => {
        console.log(resp);
        this.categoria = resp;
      },
      error: (err) => console.log
    });
  }

  eliminarCategoria(categoria: Categoria) {
    this._confirmationService.confirm({
        message: 'Desea eliminar: ' + categoria.id_categoria + '?',
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

  showDialog(categoria: Categoria) {
    this.selectCategoria = categoria;
    this.displayCategoria = true;
  }
  closeDialog() {
    this.selectCategoria = {};
    this.displayCategoria = false;
  }


}
