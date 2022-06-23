import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Asistencia } from 'src/app/Model/Asistencia/asistencia';
import { Clase } from 'src/app/Model/Asistencia/clase';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';
import { FormControl, FormGroup } from '@angular/forms';
import { AsistenciaService } from 'src/app/Servicio/asistencia/asistencia.service';
import swal from 'sweetalert2'; 
import { empty } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicio/auth/auth.service';
import { usuario } from 'src/app/Model/rolesTS/usuario';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-registrarasistencia',
  templateUrl: './registrarasistencia.component.html',
  styleUrls: ['./registrarasistencia.component.scss'],
  providers: [MessageService]
  
})
export class RegistrarasistenciaComponent implements OnInit {
  mydate=Date.now();
  
  fecha: Date= new Date();
  fechaactual: Date= new Date(this.mydate);
  fechaactualnew: Date= new Date(this.mydate);
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
  clasevalidar : Clase[]=[];
 
  // asistenciaService
  asistenciaactualizar: Asistencia []=[];
  asistenciaclase: Asistencia []=[];
  asistencia: Asistencia= new Asistencia();
  idclaseaux: any;
  numestudiante : number = 0;
  auxidclaseultm: number=0;
  filterValue:any;
  actualizarDialog:boolean=false;
  fechacontrol=new FormControl('');
  controladorfecha=new FormControl('');
  fechastring: string = 'yyyy-MM-dd';
  ntrfecha:any;
  idasistencia : number=0;
  Asistencia: Asistencia=new Asistencia();
  valiadarfecha:number=0;
  validarcalendario:number=0;
  //  validar combos
  showmodalidad:boolean=true;
  showcurso:boolean=true;
  showparalelo:boolean=true;
  showasignatura:boolean=true;

  showmodalidadactu:boolean=true;
  showcursoactu:boolean=true;
  showparaleloactu:boolean=true;
  showasignaturaactu:boolean=true;

  ////combo box actualizar
  modalidadesactu: any[] = [];
  periodosactu: any[] = [];
  asignaturasactu: any[] = [];
  paralelosactu: any[] = [];
  cursoactu:any[]=[];
  controlfecha=new FormControl('');
  private fechaactualstring:any;
  convertidor:any;
  public fechaminima:Date= new Date();
  public fechastrminima:any;
 fechausuario:Date=new Date();
  countclase:number=0;
  validarfechaingreso:boolean=false;
  idempleados:any;
  idususarios:any;
  valiadarfechaact=0;
  clearfecha:any='';
  
  constructor(private appService:AsistenciaService,private router:Router,public datepipe: DatePipe, private auth:AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.ntrfecha='';
    this.idempleados=this.usuarioGuardado().empleado?.id_empleado;
    this.idususarios=this.usuarioGuardado().id_usuario
    this.appService.listarperiodos(this.idempleados).subscribe((data:any)=>this.periodos=data);
    this.appService.listarperiodos(this.idempleados).subscribe((data:any)=>this.periodosactu=data);
    this.appService.buscarclase().subscribe(res=>{this.clase.idClase=res.idClase+1});
    this.fechaactual=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
    this.fechaactualstring =this.datepipe.transform(this.fechaactual,"yyyy-MM-dd");
    this.fechaactualnew=new Date(this.fechaactualstring);
    this.appService.buscarclase().subscribe((data:any)=>this.clase=data);
  }
  usuarioGuardado = (): usuario => this.auth.usuario;

 // ---------- evento  asignatura-------------//
  onSelect(id: any){
    this.cursosfaltas=[];
    this.idAsignatura= id;
    this.validarfiltros();

    if(this.idAsignatura==0){
     this.estudiantes=[];
     
    }
    if(this.idAsignatura>0){
      this.habilitarfecha();
      this.appService.getfiltros(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso).subscribe((data:any)=> {
        this.estudiantes=data

        if (data.length == 0) {
          swal.fire(
            {
              title: 'Oops...',
              text: 'no se encontraron registros !',
             
            }
          )
          this.showasignatura=true;
          this.showmodalidad=true;
          this.showcurso=true;
          this.showparalelo=true;
          this.asignaturas=[];
          this.modalidades=[];
          this.curso=[];
          this.paralelos=[];
          this.estudiantes=[];
          this.IdParalelo=0;
          this.IdPeriodo=0;
          this.idModalidad=0;
          this.idAsignatura=0; 
         
        } 

      });
     
    }
  
  }
  //-----------fin de evento  asignatura-----------//
  //-------------------- evento modalidad--------------------//
    onmodalidad(id: any){
      this.cursosfaltas=[];
      this.curso=[];
      this.paralelos=[];
      this.IdCurso=0;
      this.IdParalelo=0;
      this.asignaturas=[];
      this.idAsignatura=0;
      this.idModalidad= id;
      this.showasignatura=true;
      this.showcurso=true;
      this.showparalelo=true;
      this.validarfiltros();
  
      this.showcurso=false;
      
      if(this.idModalidad==0){
        this.showasignatura=true;
        this.showcurso=true;
        this.showparalelo=true;
        this.asignaturas=[];
        this.curso=[];
        this.paralelos=[]
        this.estudiantes=[];
        this.IdCurso=0;
        this.IdParalelo=0;
        this.IdParalelo=0;
      
       }
       this.habilitarfecha();
      this.appService.listarcursos(this.idempleados, this.IdPeriodo,this.idModalidad).subscribe((data:any)=>this.curso=data);
      
    }
    //---------------------fin de evento modalidad----------------//
    //------------------------evento periodo-----------------------//
      onperiodo(id: any){
        this.cursosfaltas=[];
        this.showasignatura=true;
        this.showmodalidad=true;
        this.showcurso=true;
        this.showparalelo=true;
        this.asignaturas=[];
        this.modalidades=[];
        this.curso=[];
        this.paralelos=[];
        this.estudiantes=[];
        this.IdParalelo=0;
        this.IdPeriodo=0;
        this.idModalidad=0;
        this.idAsignatura=0;

      this.IdPeriodo= id;
      this.validarfiltros();
     
      this.showmodalidad=false;
      this.appService.listarmodalidad(this.idempleados,this.IdPeriodo).subscribe((data:any)=>this.modalidades=data);
    
      if(this.IdPeriodo==0){
        this.showasignatura=true;
        this.showmodalidad=true;
        this.showcurso=true;
        this.showparalelo=true;
        this.asignaturas=[];
        this.modalidades=[];
        this.curso=[];
        this.paralelos=[];
        this.estudiantes=[];
        this.IdParalelo=0;
        this.IdPeriodo=0;
        this.idModalidad=0;
        this.idAsignatura=0; 
        
       }
       this.habilitarfecha();
    }
    //-----------fin evento periodo------------//

    // ------------------------evento paralelo-----------------//
      onparalelo(id: any){
        this.cursosfaltas=[];
        this.asignaturas=[];
        this.idAsignatura=0;
      this.IdParalelo= id;
      this.validarfiltros();
      this.showasignatura=false;
      this.appService.listarAsignatura(this.idempleados,this.IdPeriodo,this.idModalidad,this.IdCurso,this.IdParalelo).subscribe((data:any)=>this.asignaturas=data);

      if(this.IdParalelo==0){
        this.showasignatura=true;
        this.asignaturas=[];
        this.estudiantes=[];
        this.idAsignatura=0;
       
       }
       this.habilitarfecha();

        
      }
      // fin evento paralelo
      //--------------------- evento curso--------------------------------
      onCurso(id: any){
        this.cursosfaltas=[];
        this.asignaturas=[];
        this.idAsignatura=0;
        this.paralelos=[];
        this.showparalelo=true;
        this.showasignatura=true;
        this.IdParalelo=0;
        this.IdCurso= id;
        this.validarfiltros();
        this.showparalelo=false;
        this.appService.listarparalelo(this.idempleados,this.IdPeriodo,this.idModalidad,this.IdCurso).subscribe((data:any)=>this.paralelos=data);
        if(this.IdCurso==0){
          this.showasignatura=true;
          this.showparalelo=true;
          this.paralelos=[];
          this.asignaturas=[];
          this.estudiantes=[];
          this.IdParalelo=0;
          this.idAsignatura=0;
          
         } 
        this.habilitarfecha();
        }
        //----------------- fin evento  Curso----------------//
  
//-----------------------------evento  para capturar  las faltas
      onNgModelChange(value: any , checked: any){
   
        if(checked){
            this.cursosfaltas.push(parseInt(value));
  
        }else{
          this.cursosfaltas.splice(this.cursosfaltas.indexOf(value),1);
        }
  
     
     
  
  }
  //-------------fin evento para capturar faltas--------------
  //------------------------ingreso estudiantes ------------------------///
  ///----------- evento  submit ingresar-------------//
      submit(){
       if(this.idModalidad == 0 || this.idAsignatura == 0 || this.IdPeriodo ==0  ||  this.IdParalelo ==0 || this.IdCurso==0 ||this.valiadarfecha==0||this.estudiantes.length<1){
        this.clearfech();
        swal.fire( 
          {
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor ingrese fecha y especifique los filtros!',
           
          }
        )
       }else{
         
        this.ntrfecha=this.fechacontrol.value;
                
        this.appService.validarclase(this.idempleados,this.IdPeriodo,this.idModalidad,this.IdCurso,this.IdParalelo,this.idAsignatura,this.ntrfecha).subscribe((data:any)=>this.countclase=data);
        this.appService.validarclaseobj(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso,this.ntrfecha,this.idempleados).subscribe((data:any)=>this.asistenciaclase=data);

      
    
        if(this.countclase>0){
          this.clearfech();
          swal.fire(
            {
              icon: 'error',
              title: 'Oops...',
              text: 'Por favor ya genero la asistencia para la fecha indicada si desea realizar algun cambio actualize su registros!',
             
            }
          )
        }else{
         this.ingresoclase();
        setTimeout(() =>{this.separarestudiantes()}, 1000);
  ///this.separarestudiantes();  
  this.valiadarfecha=0;
 
  this.router.navigate(['asistencia/listarAsistencia']);
}
    }
      }
      // ------------------fin evento submit---------------//
     //--------------------separo estudiantes--------------//
      separarestudiantes(){
        let lstNumero = document.getElementsByClassName("estudiantelista"),   arrayGuardar = [];
        for (var i = 0; i < lstNumero.length; i++) {
          arrayGuardar[i] = lstNumero[i];
          }
          let auxasistiendo:any[]=[];

          let duplicados:any[]=[];
      this.estudiantes.forEach(function(value, key) {
  
        auxasistiendo.push(value.id_estudiante)
  
      });
      let auxiliarlength= this.estudiantes.length;
      let faltando :any[]=[];
      faltando= this.cursosfaltas.slice();
   
    const asistiendo = auxasistiendo.filter(elemento=>faltando.indexOf(elemento)==-1);
    // estudiantes asistiendo
    this.estuadiantesasistiendo(asistiendo);
    // estudiantes faltando
    this.estudiantefalta();
    swal.fire('Asistencia', `Asistencia  creada con éxito!`, 'success');
   
      }
      //---------- fin de funcion separar estudiantes--------//
  //-----------------------convertir fecha-------------------//
       fechaconversion(){
        let latest_date =this.datepipe.transform(this.fecha, "yyyy-MM-dd");
        
        this.fechacontrol.setValue(latest_date+"T05:00:00.000+00:00");
       }
  ///------------------fin de convertir fecha-------------------------------
  //---------------------- ingreso clase------------------------------------
       ingresoclase(){
        this.clases.id_periodo.id_periodo=this.IdPeriodo;
        this.clases.id_modalidad.id_modalidad=this.idModalidad;
        this.clases.idAsignatura.id_asignatura=this.idAsignatura;
        this.clases.idParalelo.id_paralelo=this.IdParalelo;
       this.clases.idCurso.id_curso=this.IdCurso;
       this.clases.idDocente.id_empleado=this.idempleados;
       this.fechaconversion();
       this.clases.fecClase=this.fechacontrol.value;
    
         this.appService.createclase(this.clases).subscribe(data=>{
          this.auxidclaseultm=data.idClase;
           
           this.validarcalendario=1;
           return this.auxidclaseultm;
         });    
        
       }
//---------------------- fin de ingreso clase------------------------------------

//----------------------- actualizar clase---------------------------------
       actualizarclases(){
        this.clase.idClase=this.auxidclaseultm;
        this.clase.id_modalidad.id_modalidad=this.idModalidad;
        this.clase.idAsignatura.id_asignatura=this.idAsignatura;
        this.clase.idParalelo.id_paralelo=this.IdParalelo;
       this.clase.idCurso.id_curso=this.IdCurso;
       this.clase.id_periodo.id_periodo=this.IdPeriodo;
       this.fechaconversion();
       this.clases.fecClase=this.fechacontrol.value;
      
        
        this.appService.actualizarclases(this.clase).subscribe( clase => {
          
    
        });

       }
  //--------------------fin del actualizar clase-----------------------------

    
// ----------metodo para guardar los estudiantes que asisten-----------------
      estuadiantesasistiendo(asistiendo:any[]){
        if(asistiendo.length>0){
        this.idclaseaux = this.auxidclaseultm;
        this.asistencia.idClase=this.idclaseaux;
    
        for(var i=0 ;i<asistiendo.length; i++){
         
          this.asistencia.estadoAsis=false;
          //this.asistencia.idClase=this.idclase;
          this.asistencia.idEstudiante=asistiendo[i];
          
          this.appService.create(this.asistencia)
          .subscribe(asistencia =>{})
        }
      }
        this.idclaseaux=0;
      }
      //--------------fin del mentodo de estudiantes asistiendo-----------

   //------- metodo que  encontraba los estudiantes que faltan---------------
      estudiantefalta(){
        if(this.cursosfaltas.length>0){
  
        
          this.idclaseaux= this.auxidclaseultm;
          this.asistencia.idClase=this.idclaseaux;
          
          for(var i=0 ; i<this.cursosfaltas.length; i++){
            
            this.numestudiante=this.cursosfaltas[i];
             this.asistencia.estadoAsis=true;
             //this.asistencia.idClase=this.idclase;
            this.asistencia.idEstudiante=this.numestudiante;
            this.appService.create(this.asistencia)
            .subscribe(asistencia =>{})
          }
        }
        this.idclaseaux=0;
      }
    //----------- fin de los estudiantes que faltan--------------------------
     
   // metodo para el actualizar faltas
       cambiofalta(value: any , checked:boolean){
        
        if(checked){
        
            this.cursosfaltas.push(parseInt(value));
            this.idasistencia=parseInt(value);
          
            this.Asistencia.idAsistencia=this.idasistencia;
            this.Asistencia.estadoAsis=true;
          
          this.actualizararasistencia();
      
        }else{
     
            this.idasistencia=parseInt(value);
            this.Asistencia.estadoAsis=false;
                this.Asistencia.idAsistencia=this.idasistencia;
           
          this.actualizararasistencia();
      
        //  this.cursosfaltas.splice(this.cursosfaltas.indexOf(value),1);
        }
      
      }
      // fin cambiar faltas

      //********validar filtros ***************** */
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

      //****************fin de validar filtros*****************/
      //---------------------habilita el panel de actualizar-------//
      actualizar(){
        this.actualizarDialog=true;
      }
     //--------------------- fin del habilitar el panel de actualizar-------

    //*******evento asignatura actualizar**********//
      asignaturaactualizar(id: any){
        this.idAsignatura= id;
        this.validarfiltros();
    
        if(this.idAsignatura==0){
          this.asistenciaactualizar=[]; 

        }
       }
       // **** fin evento asignatura actualizar*****//
           //*******evento modalidad actualizar**********//
        onmodalidadactualizar(id: any){
          this.idModalidad= id;

          this.validarfiltros();
          this.showcursoactu=false;
          if(this.idModalidad==0){
            this.showasignaturaactu=true;
            this.showcursoactu=true;
            this.showparaleloactu=true;
            this.asignaturasactu=[];
            this.cursoactu=[];
            this.paralelosactu=[];
            this.asistenciaactualizar=[]; 
           }
         
           this.appService.listarcursos(this.idempleados,this.IdPeriodo ,this.idModalidad).subscribe((data:any)=>this.cursoactu=data);
 
          
          }
          //*******fin evento modalidad actualizar**********//

          //*******evento periodo actualizar**********//
          onperiodoactualizar(id: any){
          this.IdPeriodo= id;
          this.validarfiltros();
          this.appService.listarmodalidad(this.idempleados,this.IdPeriodo).subscribe((data:any)=>this.modalidadesactu=data);
          this.showmodalidadactu=false;
          if(this.IdPeriodo==0){
            this.showasignaturaactu=true;
            this.showmodalidadactu=true;
            this.showcursoactu=true;
            this.showparaleloactu=true;
            this.asignaturasactu=[];
            this.modalidadesactu=[];
            this.cursoactu=[];
            this.paralelosactu=[];
            this.asistenciaactualizar=[]; 
           }
           

         
          }
           //******* fin evento periodo actualizar**********//

          //*******  evento paralelo actualizar**********//
          onparaleloactualizar(id: any){
          this.IdParalelo= id;
          this.validarfiltros();
          this.showasignaturaactu=false;

          if(this.IdParalelo==0){
            this.showasignaturaactu=true;
            this.asignaturasactu=[];
            this.asistenciaactualizar=[]; 
           }
           this.appService.listarAsignatura(this.idempleados,this.IdPeriodo,this.idModalidad,this.IdCurso,this.IdParalelo).subscribe((data:any)=>this.asignaturasactu=data);
         
          }
      //************* fin  evento paralelo actualizar**********//

      //***************  evento curso actualizar****************//
          onCursoactualizar(id: any){
            this.IdCurso= id;
            this.validarfiltros();
            this.showparaleloactu=false;
            if(this.IdCurso==0){
              this.showasignaturaactu=true;
              this.showparaleloactu=true;
              this.paralelosactu=[];
              this.asignaturasactu=[];
              this.asistenciaactualizar=[]; 
             }
            this.appService.listarparalelo(this.idempleados,this.IdPeriodo,this.idModalidad,this.IdCurso).subscribe((data:any)=>this.paralelosactu=data);

    
            }

        //**************  fin evento curso actualizar*************//
       //*********************boton filtrar actualizar**********************************/
            buscaractualizar(){
              if(this.idModalidad==0||this.IdPeriodo==0||this.IdParalelo==0||this.idAsignatura==0 || this.IdCurso==0 || this.valiadarfechaact==0){
                swal.fire(
                  {
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Por favor ingrese fecha y especifique los filtros!',
                   
                  }
                )
            }else{
              this.fechastring=this.fechacontrol.value;
              this.appService.getfiltrosactualizar(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso,this.fechastring,this.idempleados).subscribe((data:any)=> {
                this.asistenciaactualizar=data
                if (data.length == 0) {
                  swal.fire(
                    {
                      title: 'Oops...',
                      text: 'no se encontraron asistencias !',
                     
                    }
                  )
                } 
              });
              this.valiadarfecha==0;

            }
            }

            //********************fin de  el boton filtrar actualizar ********************/

            //******************boton actualizar  asistencia ***************************/
            actualizararasistencia(){
              this.appService.updateasistencia(this.Asistencia).subscribe( cliente => {
                swal.fire('Asistencia Actualizada', `Asistencia actualizada con éxito!`, 'success')
          
              });
            }
            //*******************fin de   actualizar asistencia*****************/
            
            valiadarfechaactualizar() {
              this.valiadarfechaact=1;
            }

            //******************validar fecha**************************** */
            validarfecha(){  
               this.convertidor=document.getElementById("fechas1");
             if ( this.convertidor.value== null || this.convertidor.value=='' ){
               this.clearfech();
              swal.fire(
                {
                  icon: 'error',
                  title: 'Oops...',
                  text: 'ingrese una fecha nuevamente!',
                 
                }
              );
              this.valiadarfecha=0;
            
          } else {
          //    this.fechaactualnew = new Date(this.convertidor.value+"T05:00:00.000+00:00");
          this.fechaactualnew = new Date(this.fecha);
          this.fechaactualnew.setMinutes(this.fechaactualnew.getMinutes()+this.fechaactualnew.getTimezoneOffset());
              this.convertidor=this.controlfecha.value;
             

               if(this.fechaactualnew < this.fechaactual || this.fechaactualnew > this.fechaactual){
               this.clearfech();
                swal.fire(
                  {
                    icon: 'error',
                    title: 'Oops...',
                    text: 'ingrese fecha nuevamente ingrese otra fecha !',
                   
                  }

                );
               
                this.valiadarfecha=0;
                 
               }else{
                 
                this.ntrfecha=this.fechacontrol.value;
                
                this.appService.validarclase(this.idempleados,this.IdPeriodo,this.idModalidad,this.IdCurso,this.IdParalelo,this.idAsignatura,this.ntrfecha).subscribe((data:any)=>this.countclase=data);
                this.appService.validarclaseobj(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso,this.ntrfecha,this.idempleados).subscribe((data:any)=>this.asistenciaclase=data);
                this.valiadarfecha=1;
               }  
              }
            
            }
            // **********************fin de validar fecha******************/
           
            //*********************habilitar fecha**************************/
            habilitarfecha(){
              if(this.idAsignatura>0 && this.idModalidad>0 && this.IdPeriodo>0 && this.IdParalelo>0 && this.IdCurso>0){
               this.showDiv=true;
              }else{
                this.showDiv=false;
              }
            }
          //*************************final del habilitar fecha *************//

       //----------------------limpiar  campo fecha------------------------//
          clearfech(){
            this.clearfecha=null;
          }
      //--------------------------fin limpiar campo fecha---------------------//

}
