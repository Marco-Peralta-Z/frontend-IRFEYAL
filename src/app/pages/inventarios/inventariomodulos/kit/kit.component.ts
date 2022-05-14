import { Component, OnInit, Input } from '@angular/core';
import { Articulo } from 'src/app/Model/Inventarios/Articulo';
import { Articuloservices } from 'src/app/Servicio/modulo_invetario/inventarioarticulos/ArticuloServices';

@Component({
    selector: 'app-listar-articulos',
    templateUrl: './kit.component.html',
    styleUrls: ['./kit.component.scss']
})
export class KitComponent implements OnInit {

    constructor(private articuloservices: Articuloservices) { }
  
    ngOnInit(): void {

    }
  
  }