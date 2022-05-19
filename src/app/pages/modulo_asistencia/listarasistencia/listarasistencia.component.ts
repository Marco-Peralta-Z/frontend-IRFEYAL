import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';

import { AsistenciaService } from 'src/app/Servicio/asistencia/asistencia.service';

@Component({
  selector: 'app-listarasistencia',
  templateUrl: './listarasistencia.component.html',
  styleUrls: ['./listarasistencia.component.scss']
})
export class ListarasistenciaComponent implements OnInit {
  showDiv:boolean=false;
  fechas:any[]=[];
  mostrarinformacion: Estudiante[] = [];
  //filtros 
  modalidades: any[] = [];
  periodos: any[] = [];
  asignaturas: any[] = [];
  paralelos: any[] = [];
  cursos: any[] = [];
  //estudiantes
  estudiantes:Estudiante []=[];
  // id filtros
  idModalidad: number = 0;
    idAsignatura: number = 0;
    IdPeriodo: number =0;
    IdParalelo: number =0;
    IdCurso: number =0;
    Estudiante:Estudiante[]=[];
    filterValue:any;
    idempleados: number =1;

      //  validar combos
  showmodalidad:boolean=true;
  showcurso:boolean=true;
  showparalelo:boolean=true;
  showasignatura:boolean=true;
  constructor(private appService:AsistenciaService) {
  
   }

  ngOnInit(): void {
    
 
  
  this.appService.getAllPeriodo().subscribe((data:any)=>this.periodos=data);

  }
  mostrarinfo(id:any){
    console.log(id);
    this.appService.getInformaciondelestudiante(id).subscribe((data:any)=>this.Estudiante=data);
          this.showDiv=true;
          console.log(this.Estudiante);
          this.appService.getInfechasfaltasdelestudiante(id,this.idempleados,this.idAsignatura,this.IdCurso,this.IdParalelo,this.idModalidad,this.IdPeriodo).subscribe((data:any)=>this.fechas=data);
        console.log(this.fechas);
  
    }
    onSelect(id: any){
      this.idAsignatura= id;
      this.validarfiltros();
      console.log(this.idAsignatura);
if(this.idAsignatura==0){
 this.estudiantes=[];
}else{
  this.appService.getfiltros(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso).subscribe((data:any)=> this.estudiantes=data);

}
  
      }
      onmodalidad(id: any){
        this.showasignatura=true;
        this.showcurso=true;
        this.showparalelo=true;
        this.asignaturas=[];
        this.cursos=[];
        this.paralelos=[];
        this.estudiantes=[];
        this.IdCurso=0;
        this.idAsignatura=0;
        this.IdParalelo=0;
        
        this.idModalidad= id;
        this.validarfiltros();
        console.log(this.idModalidad);
        this.showcurso=false;
        if(this.idModalidad==0){
          this.showasignatura=true;
          this.showcurso=true;
          this.showparalelo=true;
          this.asignaturas=[];
          this.cursos=[];
          this.paralelos=[];
          this.estudiantes=[];
         }
        this.appService.listarcursos(this.idempleados, this.idModalidad).subscribe((data:any)=>this.cursos=data);
        }
        onperiodo(id: any){
          this.IdCurso=0;
          this.idAsignatura=0;
          this.IdParalelo=0;
          this.idModalidad=0;
          this.showasignatura=true;
          this.showmodalidad=true;
          this.showcurso=true;
          this.showparalelo=true;
          this.asignaturas=[];
          this.modalidades=[];
          this.cursos=[];
          this.paralelos=[];
          this.estudiantes=[];
        this.IdPeriodo= id;
        this.validarfiltros();
        console.log(this.IdPeriodo);
        this.showmodalidad=false;
        this.appService.listarmodalidad(this.idempleados,this.IdPeriodo).subscribe((data:any)=>this.modalidades=data);

        if(this.IdPeriodo==0){
         this.showasignatura=true;
         this.showmodalidad=true;
         this.showcurso=true;
         this.showparalelo=true;
         this.asignaturas=[];
         this.modalidades=[];
         this.cursos=[];
         this.paralelos=[];
         this.estudiantes=[];
        }
        }
        onparalelo(id: any){
          this.asignaturas=[];
          this.idAsignatura=0;
        this.showasignatura=true;
        this.estudiantes=[];

        this.IdParalelo= id;
        this.validarfiltros();
        console.log(this.IdParalelo);
        this.showasignatura=false;
        this.appService.listarAsignatura(this.idempleados,this.IdPeriodo,this.IdCurso,this.IdParalelo).subscribe((data:any)=>this.asignaturas=data);

        if(this.IdParalelo==0){
          this.showasignatura=true;
          this.asignaturas=[];
          this.estudiantes=[];
         }
        }
        onCurso(id: any){
          this.asignaturas=[];
        this.idAsignatura=0;
        this.paralelos=[];
        this.showparalelo=true;
        this.showasignatura=true;
        this.IdParalelo=0;
          this.IdCurso= id;
          this.validarfiltros();
          console.log(this.IdCurso);
          this.showparalelo=false;
          this.appService.listarparalelo(this.idempleados,this.IdCurso).subscribe((data:any)=>this.paralelos=data);

          if(this.IdCurso==0){
            this.showasignatura=true;
            this.showparalelo=true;
            this.paralelos=[];
            this.asignaturas=[];
            this.estudiantes=[];
           }


         
          }

        validarfiltros(){
          if(this.idAsignatura==null){
            this.idAsignatura=0;
         }
         if(this.IdParalelo==null){
          this.IdParalelo=0;
         }
         if(this.IdPeriodo==null){
             this.IdPeriodo=0;
         }
         if(this.idModalidad==null){
          this.idModalidad=0;
         }
         if(this.IdCurso==null){
          this.IdCurso=0;
         }

        }

        

}
