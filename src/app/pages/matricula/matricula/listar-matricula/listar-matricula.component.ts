import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Matricula } from '../../../../Model/Matriculas/matricula';
import { MatriculaService } from '../../../../Servicio/moduloMatricula/matriculaServices/matricula.service';
import { Modalidad } from '../../../../Model/Parametrizacion/Modalidad';
import { Historial } from '../../../../Model/Matriculas/historial';
import { Curso } from '../../../../Model/Parametrizacion/Curso';

@Component({
  selector: 'app-listar-matricula',
  templateUrl: './listar-matricula.component.html',
  styleUrls: ['./listar-matricula.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ListarMatriculaComponent implements OnInit {

  matriculas: Matricula[]=[];
  matHistorial: Matricula[]=[];
  historial: Historial[]=[];

  matricula: Matricula= new Matricula();
  selectedMatricula: Matricula[]=[];
  modalidades: Modalidad[]=[];
  historialMatricula: Matricula[]=[];


  productDialog?: boolean;
  esditable: boolean = true;
  submitted?: boolean;
  fullName: string='';
  rows: number=5;


  constructor(private matriculaService: MatriculaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.matriculaService.getMatricula()
    .subscribe(matriculas => {
      let soloActivos: any[]=[];
     for (const matricula of matriculas) {
      if (matricula.id_periodo.vigencia==true) {
        soloActivos.push(matricula);
      }
     }
      this.matriculas=soloActivos;
      console.log(this.matriculas);
    });

    this.matriculaService.getModalidades()
    .subscribe(modalidad => this.modalidades=modalidad);
    
  }
  verMatricula(matricula: Matricula){
    this.matricula=matricula;
    this.fullName=this.matricula.estudiante.id_persona.apellido + ' ' + matricula.estudiante.id_persona.nombre; 
    this.productDialog = true;
    this.esditable=true;
    this.cargarHistorial(matricula.estudiante.id_estudiante!);
  }

  hideDialog(){
    this.productDialog = false;
    this.submitted = false;
  }

  cargarHistorial(id_matricula: number){
    this.historial=[];

    this.matHistorial=[];
      this.matriculaService.getHistorialMatriculas(id_matricula)
      .subscribe(historial => {
        this.historialMatricula=historial;
        let aux=0;
      for (let i = 0; i < this.historialMatricula.length; i++) {
        if (i == 0) {
           aux= this.historialMatricula[i].id_periodo.malla.id_malla!;
          this.matHistorial.push(this.historialMatricula[i]);
        }
        if (aux != this.historialMatricula[i].id_periodo.malla.id_malla) {
            this.historial.push({
              mallaNombre: this.historialMatricula[i].id_periodo.malla.descripcion!, 
              matriculas: this.matHistorial,

            });

            this.matHistorial=[];
            aux=this.historialMatricula[i].id_periodo.malla.id_malla!;
            this.matHistorial.push(this.historialMatricula[i]);
        }else{
          if (i !=0) {
            this.matHistorial.push(this.historialMatricula[i]);
          }
          
        }
         if (i == this.historialMatricula.length-1) {
          this.historial.push({
            mallaNombre: this.historialMatricula[i].id_periodo.malla.descripcion!, 
            matriculas: this.matHistorial,
          });
         }  

    }
    console.log(this.historial);
        
      });

  }

}
