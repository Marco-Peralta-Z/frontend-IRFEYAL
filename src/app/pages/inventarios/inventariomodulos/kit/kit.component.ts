import { Component, OnInit } from '@angular/core';
import { Aprobacion } from 'src/app/Model/Inventarios/Aprobacion';
import { CategoriaService } from 'src/app/Servicio/modulo_invetario/categoria.service';
import { AprobacionesService } from 'src/app/Servicio/modulo_invetario/AprobacioneService';
@Component({
  selector: 'app-kit',
  templateUrl: './kit.component.html',
  styleUrls: ['./kit.component.scss']
})
export class KitComponent implements OnInit {

    //products: [{code:string, name:string,category:string,quantity:string}];

    listaAprobacines: Aprobacion[]=[];
    constructor(private aprobacionesService: AprobacionesService) { }
  
    ngOnInit(): void {
      this.aprobacionesService.getListAsignaturas()
      .subscribe(listaAproba => this.listaAprobacines=listaAproba);
    }
}
