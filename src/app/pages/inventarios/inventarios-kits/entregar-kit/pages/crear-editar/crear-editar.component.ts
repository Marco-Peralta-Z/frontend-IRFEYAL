import { Component, OnInit } from '@angular/core';
import { KitService } from '../../../../../../Servicio/modulo_invetario/kit.service';
import { Kit } from '../../../../../../Model/Inventarios/Kit';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css']
})
export class CrearEditarComponent implements OnInit {

  public kits: Kit [] = [];

  constructor(
    private _kitService: KitService,
  ) { }

  ngOnInit(): void {
    this.getKits();
  }

  getKits = () => {
    this._kitService.getKits().subscribe({
      next: ( resp ) => {
        this.kits = resp as Kit[];
        console.log(this.kits);
        
      }
    })
  }

}
