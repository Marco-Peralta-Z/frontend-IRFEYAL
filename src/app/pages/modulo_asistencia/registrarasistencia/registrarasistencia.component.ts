import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Asistencia } from 'src/app/Model/Asistencia/asistencia';
import { Clase } from 'src/app/Model/Asistencia/clase';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';

import { AsistenciaService } from 'src/app/Servicio/asistencia/asistencia.service';
import swal from 'sweetalert2'; 
@Component({
  selector: 'app-registrarasistencia',
  templateUrl: './registrarasistencia.component.html',
  styleUrls: ['./registrarasistencia.component.scss']
})
export class RegistrarasistenciaComponent implements OnInit {
  fecha: Date= new Date();
  fechaactual: Date= new Date();
  modalidades: any[] = [];
  periodos: any[] = [];
  asignaturas: any[] = [];
  paralelos: any[] = [];
  curso:any[]=[];
  idModalidad: number = 0;
  idAsignatura: number = 0;
  IdPeriodo: number =0;
  IdParalelo: number =0;
  IdCurso: number =0;
  estudiantes:Estudiante []=[];
  cursosfaltas: any[]=[];
  clase: Clase=new Clase();
  clases: Clase= new Clase();
  // asistenciaService
  asistenciaactualizar: Asistencia []=[];
  asistencia: Asistencia= new Asistencia();
  idclaseaux: any;
  numestudiante : number = 0;
  auxidclaseultm: any;
  filterValue:any;
  actualizarDialog:boolean=false;
  fechacontrol=new FormControl('');
  constructor(private appService:AsistenciaService) { }

  ngOnInit(): void {
    this.appService.getAllAsignatura().subscribe((data:any)=>this.asignaturas=data);
    this.appService.getAllModalidad().subscribe((data:any)=>this.modalidades=data);
    this.appService.getAllParalelo().subscribe((data:any)=>this.paralelos=data);
    this.appService.getAllPeriodo().subscribe((data:any)=>this.periodos=data);
    this.appService.buscarclase().subscribe(res=>{this.clase.idClase=res.idClase+1});
    this.appService.getAllCurso().subscribe((data:any)=>this.curso=data);
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
  

      onNgModelChange(value: any , checked: any){
   
        if(checked){
            this.cursosfaltas.push(parseInt(value));
  
        }else{
          this.cursosfaltas.splice(this.cursosfaltas.indexOf(value),1);
        }
  
     
        console.log(this.estudiantes);
        console.log(this.cursosfaltas);
  
  }

      submit(){
         this.ingresoclase();
       
        
        console.log(this.fecha);
        let lstNumero = document.getElementsByClassName("estudiantelista"),   arrayGuardar = [];
        for (var i = 0; i < lstNumero.length; i++) {
          arrayGuardar[i] = lstNumero[i];

          }
          let playStore:any[]=[];

          let duplicados:any[]=[];
      this.estudiantes.forEach(function(value, key) {
  
      playStore.push(value.id_estudiante)
  
      });
      let auxiliarlength= this.estudiantes.length;
      let faltando :any[]=[];
      faltando= this.cursosfaltas.slice();
   
      
      const asistiendo = playStore.filter(elemento=>faltando.indexOf(elemento)==-1);
    console.log("asistiendo :"+asistiendo);     
    console.log("faltando"+faltando);
    this.ultimoingresado1();


    //this.estuadiantesasistiendo(asistiendo);
  // this.ejemplo();
   // this.estudiantesfaltando(faltando);
      }

      ultimoingresado1(){
        this.appService.buscarclase().subscribe(res=>{this.clase.idClase=res.idClase+1});
         
        console.log(this.clase.idClase);
        

      }

      estuadiantesasistiendo(asistiendo:any[]){
        this.ultimoingresado1();
        if(asistiendo.length>0){
        this.idclaseaux= this.clase.idClase;
       this.asistencia.estadoAsis=false;
        this.asistencia.idClase=this.idclaseaux;
        console.log(this.asistencia);
        for(var i=0 ;i<= asistiendo.length; i++){
      
          this.numestudiante=asistiendo[i];
          console.log(this.numestudiante);
          //this.asistencia.idClase=this.idclase;
          this.asistencia.idEstudiante=this.numestudiante;
          console.log(this.asistencia);
          this.appService.create(this.asistencia)
          .subscribe(asistencia =>{swal.fire('Nuev cliente', `Cliente  creado con éxito!`, 'success')})
        }
      }
        this.idclaseaux=0;
      }
      estudiantesfaltando(faltando:any[]){
        this.ultimoingresado1();
        if(faltando.length>0){
        this.idclaseaux= this.clase.idClase;
        this.asistencia.idClase=this.idclaseaux;
        console.log(this.asistencia);
        for(var i=0 ;i<=faltando.length; i++){
          this.numestudiante=faltando[i];
           this.asistencia.estadoAsis=true;
           //this.asistencia.idClase=this.idclase;
          this.asistencia.idEstudiante=this.numestudiante;
          this.appService.create(this.asistencia)
          .subscribe(asistencia =>{swal.fire('Nuevo cliente', `Cliente  creado con éxito!`, 'success')})
        }
      }
        this.idclaseaux=0;
      }
     

      ejemplo(){
        if(this.cursosfaltas.length>0){
  
        
          this.idclaseaux= this.clase.idClase;
          this.asistencia.idClase=this.idclaseaux;
          console.log(this.asistencia);
          console.log("tamano"+this.cursosfaltas.length);
          for(var i=0 ; i<=this.cursosfaltas.length; i++){
            console.log(i);
            this.numestudiante=this.cursosfaltas[i];
             this.asistencia.estadoAsis=true;
             //this.asistencia.idClase=this.idclase;
            this.asistencia.idEstudiante=this.numestudiante;
            this.appService.create(this.asistencia)
            .subscribe(asistencia =>{swal.fire('Nuevo cliente', `Cliente  creado con éxito!`, 'success')})
          }
        }

      }
      ingresoclase(){
     
        this.clases.fecClase=this.fecha;
        this.clases.id_periodo.id_periodo=this.IdPeriodo;
        this.clases.id_modalidad.id_modalidad=this.idModalidad;
        this.clases.idAsignatura.id_asignatura=this.idAsignatura;
        this.clases.idParalelo.id_paralelo=this.IdParalelo;
      ///  this.clases.idCurso=this.IdCurso;
        console.log(this.clases);
         this.appService.createclase(this.clases).subscribe(data=>{
           this. auxidclaseultm=data.idClase;
           return this. auxidclaseultm;
         });
         console.log("clase extraida"+this. auxidclaseultm);
         //this.appService.buscarclase().subscribe((data:any)=>this.clase=data);
         
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
      actualizar(){
        this.actualizarDialog=true;
      }



      asignaturaactualizar(id: any){
        this.idAsignatura= id;
        this.validarfiltros();
        console.log(this.idAsignatura);        }
        onmodalidadactualizar(id: any){
          this.idModalidad= id;
          this.validarfiltros();
          console.log(this.idModalidad);
          }
          onperiodoactualizar(id: any){
          this.IdPeriodo= id;
          this.validarfiltros();
          console.log(this.IdPeriodo);
          }
          onparaleloactualizar(id: any){
          this.IdParalelo= id;
          this.validarfiltros();
          console.log(this.IdParalelo);
          }
          onCursoactualizar(id: any){
            this.IdCurso= id;
            this.validarfiltros();
            console.log(this.IdCurso);
    
            }

            buscaractualizar(){
              alert("entro");
              this.appService.getfiltrosactualizar(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso,this.fecha).subscribe((data:any)=> this.asistenciaactualizar=data);
            }

}
