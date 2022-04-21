import { Component, OnInit } from '@angular/core';
import { Asignatura_Empleado } from 'src/app/Model/Parametrizacion/Asignatura_Empleado';
import { AsignaturaService } from 'src/app/Servicio/parametrizacion/Service Asignatura/asignatura.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.scss']
})
export class AsignaturasComponent implements OnInit {

  constructor(private serviceasig:AsignaturaService) { }
  asigemp:Asignatura_Empleado[]=[];
  ngOnInit(): void {
    this.serviceasig.getAsignatura_empleado().subscribe(data=>{
      this.asigemp=data;
    })
  }

}
