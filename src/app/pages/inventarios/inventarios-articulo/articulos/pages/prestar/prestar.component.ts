import { Component, OnInit } from '@angular/core';
import { Inventario } from '../../../../../../Model/Inventarios/Inventario';
import { empleado } from '../../../../../../Model/rolesTS/empleado';
import { InventarioService } from '../../../../../../Servicio/modulo_invetario/inventario.service';
import { EmpleadoService } from '../../../../../../Servicio/roles_Usuario/empleado.service';

@Component({
  selector: 'app-prestar',
  templateUrl: './prestar.component.html',
  styleUrls: ['./prestar.component.css']
})
export class PrestarComponent implements OnInit {

  public inventarioArticulos: Inventario [] = [];
  public empleados: empleado [] = [];
  constructor(
    private _inventarioService: InventarioService,
    private _empleadosService: EmpleadoService,
  ) { }

  ngOnInit(): void {
    this.getInventario();
    this.getEmpleados();
  }

  getInventario = () => this._inventarioService.getInventarios().subscribe({
    next: (resp) => {
      this.inventarioArticulos = resp;
      console.log(resp);
      
    },
    error: (err) => console.log
  });
  getEmpleados = () => this._empleadosService.getEmpleados().subscribe({
    next: (resp) => this.empleados = resp,
    error: (err) => console.log
  });


}
