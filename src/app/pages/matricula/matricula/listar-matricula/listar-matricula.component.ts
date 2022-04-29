import { Component, OnInit } from '@angular/core';
import { Matricula } from '../../../../Model/Matriculas/matricula.interfaces';
import { MatriculaService } from '../../../../Servicio/moduloMatricula/matriculaServices/matricula.service';

@Component({
  selector: 'app-listar-matricula',
  templateUrl: './listar-matricula.component.html',
  styleUrls: ['./listar-matricula.component.scss']
})
export class ListarMatriculaComponent implements OnInit {

  matriculas: Matricula[]=[];
  constructor(private matriculaService: MatriculaService) { }

  ngOnInit(): void {
    this.matriculaService.getMatricula()
    .subscribe(matriculas => this.matriculas=matriculas);
  }

}
