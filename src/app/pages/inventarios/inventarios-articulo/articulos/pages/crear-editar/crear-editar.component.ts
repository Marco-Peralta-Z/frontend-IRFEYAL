import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaArticuloService } from '../../../../../../Servicio/modulo_invetario/categoria-articulo.service';
import { Categoria } from '../../../../../../Model/Inventarios/categorias';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css']
})
export class CrearEditarComponent implements OnInit {
  public inventarioForm: FormGroup = this._formBuilder.group({
  });

  public categoriasArticulos: Categoria [] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _categoriaArticuloService: CategoriaArticuloService
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
    
  }
}
