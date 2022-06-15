import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';
import { Matricula } from 'src/app/Model/Matriculas/matricula';
import { EstudianteService } from 'src/app/Servicio/moduloMatricula/estudianteServices/estudiante.service';
import { MatriculaService } from 'src/app/Servicio/moduloMatricula/matriculaServices/matricula.service';

@Component({
  selector: 'app-nomina-estudiantil',
  templateUrl: './nomina-estudiantil.component.html',
  styleUrls: ['./nomina-estudiantil.component.scss']
})
export class NominaEstudiantilComponent implements OnInit {

  public selectedMatricula: Matricula[] = [];

  matriculas: Matricula[] = [];
  estudiantes: Estudiante[] = [];

  data = Object.values(this.matriculas);
  constructor(private matriculaService: MatriculaService, private estudianteService: EstudianteService) {
    let heroes: Matricula[];
   }
  
  ngOnInit(): void {
    this.matriculaService.getMatricula()
      .subscribe(matriculas => this.matriculas = matriculas);

    this.estudianteService.getEstudiantes()
      .subscribe(estudiantes => this.estudiantes = estudiantes);

  }

}
