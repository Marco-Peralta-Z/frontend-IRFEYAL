import { Component, OnInit } from '@angular/core';
import { Aprobacion } from 'src/app/Model/Inventarios/Aprobacion';
import { AprobacionesService } from 'src/app/Servicio/modulo_invetario/AprobacioneService';

@Component({
  selector: 'app-aprobacion',
  templateUrl: './aprobacion.component.html',
  styleUrls: ['./aprobacion.component.scss']
})
export class AprobacionesCmponent implements OnInit {
  
  listaAprobacines: Aprobacion[]=[];
  constructor(private aprobacionesService: AprobacionesService) { }

  ngOnInit(): void {
    this.aprobacionesService.getListAsignaturas()
    .subscribe(listaAproba => this.listaAprobacines=listaAproba);
  }

}
