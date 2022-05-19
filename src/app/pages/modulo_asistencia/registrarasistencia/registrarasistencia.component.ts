import { Component, OnInit } from '@angular/core';

import { Asistencia } from 'src/app/Model/Asistencia/asistencia';
import { Clase } from 'src/app/Model/Asistencia/clase';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';
import { FormControl, FormGroup } from '@angular/forms';
import { AsistenciaService } from 'src/app/Servicio/asistencia/asistencia.service';
import swal from 'sweetalert2'; 
import { empty } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrarasistencia',
  templateUrl: './registrarasistencia.component.html',
  styleUrls: ['./registrarasistencia.component.scss']
})
export class RegistrarasistenciaComponent implements OnInit {
  ejem:string='';
  fecha: Date= new Date();
  fechaactual: Date= new Date();
  fechaactualnew: Date= new Date();
  modalidades: any[] = [];
  periodos: any[] = [];
  asignaturas: any[] = [];
  paralelos: any[] = [];
  curso:any[]=[];
  showDiv:boolean=false;
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
  auxidclaseultm: number=0;
  filterValue:any;
  actualizarDialog:boolean=false;
  fechacontrol=new FormControl('');
  fechastring: string = '';
  idasistencia : number=0;
  Asistencia: Asistencia=new Asistencia();
  valiadarfecha:number=0;
  constructor(private appService:AsistenciaService,private router:Router) { }

  ngOnInit(): void {
    this.appService.getAllAsignatura().subscribe((data:any)=>this.asignaturas=data);
    this.appService.getAllModalidad().subscribe((data:any)=>this.modalidades=data);
    this.appService.getAllParalelo().subscribe((data:any)=>this.paralelos=data);
    this.appService.getAllPeriodo().subscribe((data:any)=>this.periodos=data);
    this.appService.buscarclase().subscribe(res=>{this.clase.idClase=res.idClase+1});
    this.appService.getAllCurso().subscribe((data:any)=>this.curso=data);
    this.appService.buscarclase().subscribe((data:any)=>this.clase=data);
  }

  onSelect(id: any){
    this.idAsignatura= id;
    this.validarfiltros();
    console.log(this.idAsignatura);
    this.appService.getfiltros(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso).subscribe((data:any)=> this.estudiantes=data);
   this.habilitarfecha();
  }
    onmodalidad(id: any){
      this.idModalidad= id;
      this.validarfiltros();
      console.log(this.fechacontrol.value);
      this.appService.getfiltros(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso).subscribe((data:any)=> this.estudiantes=data);
      this.habilitarfecha();
    }
      onperiodo(id: any){
      this.IdPeriodo= id;
      this.validarfiltros();
      console.log(this.IdPeriodo);
      this.appService.getfiltros(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso).subscribe((data:any)=> this.estudiantes=data);
      this.habilitarfecha();
    }
      onparalelo(id: any){
      this.IdParalelo= id;
      this.validarfiltros();
      console.log(this.IdParalelo);
        this.appService.getfiltros(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso).subscribe((data:any)=> this.estudiantes=data);
        this.habilitarfecha();
      }
      onCurso(id: any){
        this.IdCurso= id;
        this.validarfiltros();
        console.log(this.IdCurso);
        this.appService.getfiltros(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso).subscribe((data:any)=> this.estudiantes=data);
        this.habilitarfecha();
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
       if(this.idModalidad == 0 || this.idAsignatura == 0 || this.IdPeriodo ==0  ||  this.IdParalelo ==0 || this.IdCurso==0 ||this.valiadarfecha==0){
        swal.fire(
          'Por favor ingrese fecha y especifique los filtros',
          'Reintente'
        )
       }else{

           
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
   /// this.ultimoingresado1();


    this.estuadiantesasistiendo(asistiendo);
    this.estudiantefalta();
   // this.estudiantesfaltando(faltando);

   this.valiadarfecha=0;


   this.router.navigate(['asistencia/listarAsistencia']);
    }
      }


       // ingreso clase
       ingresoclase(){
        this.clases.fecClase=this.fechacontrol.value;
        this.clases.id_periodo.id_periodo=this.IdPeriodo;
        this.clases.id_modalidad.id_modalidad=this.idModalidad;
        this.clases.idAsignatura.id_asignatura=this.idAsignatura;
        this.clases.idParalelo.id_paralelo=this.IdParalelo;
       this.clases.idCurso.id_curso=this.IdCurso;
       this.clases.idDocente.id_empleado=1;
        console.log(this.clases);
         this.appService.createclase(this.clases).subscribe(data=>{
          this.auxidclaseultm=data.idClase;
           console.log(this.auxidclaseultm);
           return this.auxidclaseultm;
         });
     
         //this.appService.buscarclase().subscribe((data:any)=>this.clase=data);
         
       }

      ultimoingresado1(){
        this.appService.buscarclase().subscribe(res=>{this.clase.idClase=res.idClase+1});
        console.log("ultimo ingreso"+this.clase.idClase);
        
      }

      estuadiantesasistiendo(asistiendo:any[]){
        if(asistiendo.length>0){
        this.idclaseaux = this.auxidclaseultm;
        this.asistencia.idClase=this.idclaseaux;
        console.log(this.asistencia);
        for(var i=0 ;i<asistiendo.length; i++){
          console.log(i);
          this.asistencia.estadoAsis=false;
          //this.asistencia.idClase=this.idclase;
          this.asistencia.idEstudiante=asistiendo[i];
          console.log(this.asistencia);
          this.appService.create(this.asistencia)
          .subscribe(asistencia =>{swal.fire('Asistencia', `Asistencia  creada con éxito!`, 'success')})
        }
      }
        this.idclaseaux=0;
      }
      estudiantesfaltando(faltando:any[]){
        this.ultimoingresado1();
        if(faltando.length>0){
        this.idclaseaux= this.auxidclaseultm;
        this.asistencia.idClase=this.idclaseaux;
        console.log(this.asistencia);
        for(var i=0 ;i<=faltando.length; i++){
          this.numestudiante=faltando[i];
           this.asistencia.estadoAsis=true;
           //this.asistencia.idClase=this.idclase;
          this.asistencia.idEstudiante=this.numestudiante;
          this.appService.create(this.asistencia)
          .subscribe(asistencia =>{swal.fire('Asistencia', `Asistencia  creada con éxito!`, 'success')})
        }
      }
      this.idclaseaux=0;
      }
     

      estudiantefalta(){
        if(this.cursosfaltas.length>0){
  
        
          this.idclaseaux= this.auxidclaseultm;
          this.asistencia.idClase=this.idclaseaux;
          
          for(var i=0 ; i<this.cursosfaltas.length; i++){
            console.log(i);
            this.numestudiante=this.cursosfaltas[i];
             this.asistencia.estadoAsis=true;
             //this.asistencia.idClase=this.idclase;
            this.asistencia.idEstudiante=this.numestudiante;
            this.appService.create(this.asistencia)
            .subscribe(asistencia =>{swal.fire('Asistencia', `Asistencia  creada con éxito!`, 'success')})
          }
        }
        this.idclaseaux=0;
      }
     

       cambiofalta(value: any , checked:boolean){
         console.log(checked);
        if(checked){
          alert("poner falta");
            this.cursosfaltas.push(parseInt(value));
            this.idasistencia=parseInt(value);
          //console.log(this.idasistencia);
            this.Asistencia.idAsistencia=this.idasistencia;
            this.Asistencia.estadoAsis=true;
          //  console.log(this.Asistencia.idAsistencia);
          console.log(this.Asistencia);
          this.actualizararasistencia();
      
        }else{
          alert("quitar falta");
            this.idasistencia=parseInt(value);
            this.Asistencia.estadoAsis=false;
                this.Asistencia.idAsistencia=this.idasistencia;
           console.log(this.Asistencia);
          this.actualizararasistencia();
      
        //  this.cursosfaltas.splice(this.cursosfaltas.indexOf(value),1);
        }
      
      }


      validarfiltros(){
        if(this.idAsignatura==null){
          this.idAsignatura=0;
          this.showDiv=false;
       }
       if(this.IdParalelo==null){
        this.showDiv=false;
        this.IdParalelo=0;
       }
       if(this.IdPeriodo==null){
        this.showDiv=false;
           this.IdPeriodo=0;
       }
       if(this.idModalidad==null){
        this.showDiv=false;
        this.idModalidad=0;
       }
       if(this.IdCurso==null){
        this.showDiv=false;
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
              this.fechastring=this.fechacontrol.value;
              console.log(this.fechastring);
              this.appService.getfiltrosactualizar(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso,this.fechastring).subscribe((data:any)=> this.asistenciaactualizar=data);
            }
            actualizararasistencia(){
              this.appService.updateasistencia(this.Asistencia).subscribe( cliente => {
                swal.fire('Cliente Actualizado', `Cliente actualizado con éxito!`, 'success')
          
              });
            }
            validarfecha(){  
              this.valiadarfecha=1;
              this.ingresoclase();
            
            }

            habilitarfecha(){
              if(this.idAsignatura>0 && this.idModalidad>0 && this.IdPeriodo>0 && this.IdParalelo>0 && this.IdCurso>0){
 this.showDiv=true;
              }
            }

           

}
