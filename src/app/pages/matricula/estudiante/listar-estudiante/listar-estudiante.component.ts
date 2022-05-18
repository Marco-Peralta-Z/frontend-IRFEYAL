import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../../../Model/Matriculas/estudiante';
import { EstudianteService } from '../../../../Servicio/moduloMatricula/estudianteServices/estudiante.service';

@Component({
  selector: 'app-listar-estudiante',
  templateUrl: './listar-estudiante.component.html',
  styleUrls: ['./listar-estudiante.component.scss']
})
export class ListarEstudianteComponent implements OnInit {

  estudiantes: Estudiante[]=[];
  constructor(private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.estudianteService.getEstudiantes()
    .subscribe(estudiantes => this.estudiantes= estudiantes);
  }
}
