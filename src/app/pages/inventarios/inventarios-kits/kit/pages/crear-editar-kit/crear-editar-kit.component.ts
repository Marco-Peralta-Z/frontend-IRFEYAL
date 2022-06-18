import { Component, OnInit } from '@angular/core';
import { ModuloService } from '../../../../../../Servicio/modulo_invetario/modulo.service';
import { Modulo } from '../../../../../../Model/Inventarios/ModuloLibro';

@Component({
  selector: 'app-crear-editar-kit',
  templateUrl: './crear-editar-kit.component.html',
  styleUrls: ['./crear-editar-kit.component.css']
})
export class CrearEditarKitComponent implements OnInit {
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
        this.modulos = resp as Modulo [];
        console.log(this.modulos);
        
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
