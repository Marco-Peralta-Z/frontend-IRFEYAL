import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Matricula } from '../../../../Model/Matriculas/matricula';
import { MatriculaService } from '../../../../Servicio/moduloMatricula/matriculaServices/matricula.service';

@Component({
  selector: 'app-listar-matricula',
  templateUrl: './listar-matricula.component.html',
  styleUrls: ['./listar-matricula.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ListarMatriculaComponent implements OnInit {

  matriculas: Matricula[]=[];
  matricula: Matricula= new Matricula();
  selectedMatricula: Matricula[]=[];

  productDialog?: boolean;
  esditable: boolean = true;
  submitted?: boolean;
  fullName: string='';

  constructor(private matriculaService: MatriculaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.matriculaService.getMatricula()
    .subscribe(matriculas => this.matriculas=matriculas);
  }
  verMatricula(matricula: Matricula){
    this.matricula=matricula;
    this.fullName=this.matricula.estudiante.id_persona.apellido + ' ' + matricula.estudiante.id_persona.nombre; 
    this.productDialog = true;
    this.esditable=true;
  }

  hideDialog(){
    this.productDialog = false;
    this.submitted = false;
  }
}
