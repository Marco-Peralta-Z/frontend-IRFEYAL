import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';
import { usuario } from 'src/app/Model/rolesTS/usuario';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { AsistenciaService } from 'src/app/Servicio/asistencia/asistencia.service';
import { AuthService } from 'src/app/Servicio/auth/auth.service';
import { Paralelo } from 'src/app/Model/Parametrizacion/Paralelo';

import swal from 'sweetalert2'; 
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
  parall: Paralelo = new Paralelo();
  cursos: any[] = [];
  usuarios: empleado= new empleado();
  //estudiantes
  estudiantes:Estudiante []=[];
  // id filtros
  idModalidad: number = 0;
    idAsignatura: number = 0;
    IdPeriodo: number =0;
    IdParalelo: number =0;
    IdCurso: number =0;
    IdAux:number=0;
    Estudiante:Estudiante[]=[];
    filterValue:any;
   

      //  validar combos
  showmodalidad:boolean=true;
  showcurso:boolean=true;
  showparalelo:boolean=true;
  showasignatura:boolean=true;
  idempleados:any;
  idususarios:any;
  constructor(private appService:AsistenciaService, private auth:AuthService){
   
   }

  ngOnInit(): void {
    this.idempleados=this.usuarioGuardado().empleado?.id_empleado;
    this.idususarios=this.usuarioGuardado().id_usuario
  
   
   this.appService.listarperiodos(this.idempleados).subscribe((data:any)=>this.periodos=data);

   
  }
  usuarioGuardado = (): usuario => this.auth.usuario;
 
  mostrarinfo(id:any){
  
    this.appService.getInformaciondelestudiante(id).subscribe((data:any)=>this.Estudiante=data);
          this.showDiv=true;
          this.appService.getInfechasfaltasdelestudiante(id,this.idempleados,this.idAsignatura,this.IdCurso,this.IdParalelo,this.idModalidad,this.IdPeriodo).subscribe((data:any)=>this.fechas=data);
  
    }
    // ---------------- evento asignatura-----------------
    onSelect(id: any){
   
     
      this.showDiv=false;
      this.idAsignatura= id;
      this.validarfiltros();
if(this.idAsignatura==0){
 this.estudiantes=[];
}else{
  
  this.appService.getfiltros(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso).subscribe((data:any)=> {
    this.estudiantes=data

    if (data.length == 0) {
      swal.fire(
        {
          title: 'Oops...',
          text: 'no se encontraron registros !',
         
        }
      )
      this.showDiv=false;
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
  });

}
  
      }
      //----------------- fin  evento asignatura

      //--------------- evento modalidad-------------------//
      onmodalidad(id: any){
        this.showDiv=false;
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
        this.appService.listarcursos(this.idempleados,this.IdPeriodo ,this.idModalidad).subscribe((data:any)=>this.cursos=data);
        }
        //------------ fin evento modalidad----------------//
        //------------ evento  periodo---------------------//
        onperiodo(id: any){
          this.showDiv=false;
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
        this.showmodalidad=false;
        this.appService.listarmodalidad(this.idempleados,this.IdPeriodo).subscribe((data:any)=>this.modalidades=data);

        if(this.IdPeriodo==0){
          this.showDiv=false;
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
        //---------------- fin evento periodo------------//
        //-----------------------evento paralelo -----------------//
        onparalelo(id: any){
          this.showDiv=false;
          this.asignaturas=[];
          this.idAsignatura=0;
        this.showasignatura=true;
        this.estudiantes=[];

        this.IdParalelo= id;
        this.validarfiltros();
        this.showasignatura=false;
        this.appService.listarAsignatura(this.idempleados,this.IdPeriodo,this.idModalidad,this.IdCurso,this.IdParalelo).subscribe((data:any)=>this.asignaturas=data);

        if(this.IdParalelo==0){
          this.showasignatura=true;
          this.asignaturas=[];
          this.estudiantes=[];
         }
        }
        //----------- fin evento paralelo--------------//

        // -------------------  evento  curso ----------------------//
        onCurso(id: any,event: any){
          
          this.showDiv=false;
          this.asignaturas=[];
        this.idAsignatura=0;
        this.paralelos=[];
        this.showparalelo=true;
        this.showasignatura=true;
        this.IdParalelo=0;
          this.IdCurso=event.value.id_curso;
          this.validarfiltros();
          this.showparalelo=false;
          this.appService.listarparalelo(this.idempleados,this.IdPeriodo,this.idModalidad,event.value.id_curso).subscribe((data:any)=>this.paralelos=data);       
         
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
