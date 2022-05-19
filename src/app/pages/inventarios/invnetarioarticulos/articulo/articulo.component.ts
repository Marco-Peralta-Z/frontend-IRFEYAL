import { Component, OnInit, Input } from '@angular/core';
import { Articulo } from 'src/app/Model/Inventarios/Articulo';
import { Articuloservices } from 'src/app/Servicio/modulo_invetario/inventarioarticulos/ArticuloServices';

@Component({
    selector: 'app-listar-articulos',
    templateUrl: './articulo.component.html',
    styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit {

    articulos: Articulo[]=[];
    constructor(private articuloservices: Articuloservices) { }
  
    ngOnInit(): void {
      this.articuloservices.getArticulos()
      .subscribe(articulos => this.articulos=articulos);
    }
  
  }