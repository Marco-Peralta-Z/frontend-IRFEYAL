import { Component, OnInit } from '@angular/core';
import { ModuloService } from '../../../../../../Servicio/modulo_invetario/modulo.service';
import { Modulo } from '../../../../../../Model/Inventarios/ModuloLibro';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  public modulos: Modulo [] = [];
  constructor(
    private _moduloService: ModuloService,
  ) { }

  ngOnInit(): void {
    this.getModulos();
  }

  getModulos = () => {
    this._moduloService.getModulos().subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: ( error ) => {
        console.log(error);
      }
    })
  }

}
