import { Component, OnInit } from '@angular/core';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { MallaService } from 'src/app/Servicio/parametrizacion/Service Malla/malla.service';
import { PeriodoService } from 'src/app/Servicio/parametrizacion/Service Periodo/periodo.service';

@Component({
  selector: 'app-asignatura-periodo',
  templateUrl: './asignatura-periodo.component.html',
  styleUrls: ['./asignatura-periodo.component.css']
})
export class AsignaturaPeriodoComponent implements OnInit {

  constructor(private sevicemalla: MallaService) { }
  listasig: Asignatura[] = [];
  ngOnInit(): void {
    let id = localStorage.getItem("id_malla")?.toString();
    this.sevicemalla.getidMalla(id).subscribe(data => {
      this.listasig = data.listaAsignaturas;
    });
  }

}
