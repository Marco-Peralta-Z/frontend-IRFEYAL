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
  //estudiantes
  estudiantes:Estudiante []=[];
  // id filtros
  idModalidad: number = 0;
    idAsignatura: number = 0;
    IdPeriodo: number =0;
    IdParalelo: number =0;
    IdCurso: number =0;
    Estudiante:Estudiante[]=[];

  constructor(private appService:AsistenciaService) {
  
   }

  ngOnInit(): void {
       
  this.appService.getAllAsignatura().subscribe((data:any)=>this.asignaturas=data);
  this.appService.getAllModalidad().subscribe((data:any)=>this.modalidades=data);
  this.appService.getAllParalelo().subscribe((data:any)=>this.paralelos=data);
  this.appService.getAllPeriodo().subscribe((data:any)=>this.periodos=data);
  }
  mostrarinfo(id:any){
    console.log(id);
    this.appService.getInformaciondelestudiante(id).subscribe((data:any)=>this.Estudiante=data);
          this.showDiv=true;
          console.log(this.Estudiante);
          this.appService.getInfechasfaltasdelestudiante(id,id).subscribe((data:any)=>this.fechas=data);
        console.log(this.fechas);
  
    }
    onSelect(id: any){
      this.idAsignatura= id;
      this.validarfiltros();
      console.log(this.idAsignatura);
        this.appService.getfiltros(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso).subscribe((data:any)=> this.estudiantes=data);
      }
      onmodalidad(id: any){
        this.idModalidad= id;
        this.validarfiltros();
        console.log(this.idModalidad);
          this.appService.getfiltros(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso).subscribe((data:any)=> this.estudiantes=data);
        }
        onperiodo(id: any){
        this.IdPeriodo= id;
        this.validarfiltros();
        console.log(this.IdPeriodo);
        this.appService.getfiltros(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso).subscribe((data:any)=> this.estudiantes=data);
        }
        onparalelo(id: any){
        this.IdParalelo= id;
        this.validarfiltros();
        console.log(this.IdParalelo);
          this.appService.getfiltros(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso).subscribe((data:any)=> this.estudiantes=data);
        }
        onCurso(id: any){
          this.IdCurso= id;
          this.validarfiltros();
          console.log(this.IdCurso);
          this.appService.getfiltros(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso).subscribe((data:any)=> this.estudiantes=data);
  
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

        }

}
