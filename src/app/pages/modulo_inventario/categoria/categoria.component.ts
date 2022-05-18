import { Component, OnInit } from '@angular/core';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { CategoriaService } from 'src/app/Servicio/modulo_invetario/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  constructor(private servicecategoria:CategoriaService) { }
  asignatura:Asignatura[]=[];
  load:boolean=false;
  ngOnInit(): void {

    this.servicecategoria.getListAsignaturas().subscribe(datosdeasignatura=>{
      this.load=true;
      this.asignatura=datosdeasignatura;
    })
  }

}
