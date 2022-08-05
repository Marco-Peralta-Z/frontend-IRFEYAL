import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';
import { usuario } from 'src/app/Model/rolesTS/usuario';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { AsistenciaService } from 'src/app/Servicio/asistencia/asistencia.service';
import { AuthService } from 'src/app/Servicio/auth/auth.service';
import { Paralelo } from 'src/app/Model/Parametrizacion/Paralelo';

import swal from 'sweetalert2'; 
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-listarasistencia',
  templateUrl: './listarasistencia.component.html',
  styleUrls: ['./listarasistencia.component.scss'],
  providers: [MessageService]
})
export class ListarasistenciaComponent implements OnInit {
  //reporte cursos validar fehchas
auxinicio:Date=new Date();
auxfinal:Date=new Date();
  validarfecharango:boolean=false;
  fechacontroliniciostring:string='';
  fechacontrolfinstring: string='';
  fechacontrolinicio=new FormControl('');
  fechacontrolfin=new FormControl('');
  //reporte individual validar fechas
  auxinicioindi:Date=new Date();
auxfinalindi:Date=new Date();
  validarfecharangoindi:boolean=false;
  fechacontroliniciostringindi:string='';
  fechacontrolfinstringindi: string='';
  fechacontrolinicioindi=new FormControl('');
  fechacontrolfinindi=new FormControl('');
  showbotonfechafinindi:boolean=false;
  fechainicioreporteindi:any;
  fechafinreporteindi: any;

  //fin validar reporte
 // variables  de fechas de reporte
  showbotonfechafin:boolean=false;
  fechainicioreporte:any;
  fechafinreporte: any;
  showDiv:boolean=false;
  botonreportes:boolean=false;
  fechas:any[]=[];
  // fin variables de fechas
  //variable
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
  idestudiante:number=0;
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
  constructor(private appService:AsistenciaService, private auth:AuthService,private messageService: MessageService){

   }

  ngOnInit(): void {
    this.idempleados=this.usuarioGuardado().empleado?.id_empleado;
    this.idususarios=this.usuarioGuardado().id_usuario
   
    for(let i=0; i<this.usuarioGuardado().roles.length; i++){
   if(this.usuarioGuardado().roles[i]=="ROLE_Administrador"){ 

    this.appService.getAllPeriodo().subscribe((data:any)=>this.periodos=data);
    return;
  }else{
    this.appService.listarperiodos(this.idempleados).subscribe((data:any)=>this.periodos=data);
    
  }

 
}
 
   
  }
  usuarioGuardado = (): usuario => this.auth.usuario;
 
  mostrarinfo(id:any){
    this.idestudiante=id;
  
    this.appService.getInformaciondelestudiante(id).subscribe((data:any)=>this.Estudiante=data);
          this.showDiv=true;
          this.appService.getInfechasfaltasdelestudiante(id,this.idempleados,this.idAsignatura,this.IdCurso,this.IdParalelo,this.idModalidad,this.IdPeriodo).subscribe((data:any)=>this.fechas=data);
  
    }
    // ---------------- evento asignatura-----------------
    onAsignatura(id: any){
   
      this.botonreportes=true;
      this.showDiv=false;
      this.idAsignatura= id;
      this.validarfiltros();
if(this.idAsignatura==0){
 this.estudiantes=[];
 this.botonreportes=false;
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
      this.periodos=[];
      this.cursos=[];
      this.paralelos=[];
      this.estudiantes=[];
      this.botonreportes=false;
      for(let i=0; i<this.usuarioGuardado().roles.length; i++){
        if(this.usuarioGuardado().roles[i]=="ROLE_Administrador"){ 
     
         this.appService.getAllPeriodo().subscribe((data:any)=>this.periodos=data);
         return;
       }else{
         this.appService.listarperiodos(this.idempleados).subscribe((data:any)=>this.periodos=data);
       }
     }
     // this.appService.listarperiodos(this.idempleados).subscribe((data:any)=>this.periodos=data);
    } 
  });

}
  
      }
      //----------------- fin  evento asignatura

      //--------------- evento modalidad-------------------//
      onmodalidad(id: any){
        this.botonreportes=false;
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
          this.botonreportes=false;
         }

         for(let i=0; i<this.usuarioGuardado().roles.length; i++){
          if(this.usuarioGuardado().roles[i]=="ROLE_Administrador"){ 
       
            this.appService.getAllCurso().subscribe((data:any)=>this.cursos=data);

           return;
         }else{
          this.appService.listarcursos(this.idempleados,this.IdPeriodo ,this.idModalidad).subscribe((data:any)=>this.cursos=data);

         }
       }
        }
        //------------ fin evento modalidad----------------//
        //------------ evento  periodo---------------------//
        onperiodo(id: any){
          this.botonreportes=false;
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
        for(let i=0; i<this.usuarioGuardado().roles.length; i++){
          if(this.usuarioGuardado().roles[i]=="ROLE_Administrador"){ 
       
            this.appService.getAllModalidad().subscribe((data:any)=>this.modalidades=data);

           return;
         }else{
          this.appService.listarmodalidad(this.idempleados,this.IdPeriodo).subscribe((data:any)=>this.modalidades=data);

         }
       }
        

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
         this.botonreportes=false;
        }
        }
        //---------------- fin evento periodo------------//
        //-----------------------evento paralelo -----------------//
        onparalelo(id: any){
          this.botonreportes=false;
          this.showDiv=false;
          this.asignaturas=[];
          this.idAsignatura=0;
        this.showasignatura=true;
        this.estudiantes=[];

        this.IdParalelo= id;
        this.validarfiltros();
        this.showasignatura=false;
        for(let i=0; i<this.usuarioGuardado().roles.length; i++){
          if(this.usuarioGuardado().roles[i]=="ROLE_Administrador"){ 
       
            this.appService.getAllAsignatura().subscribe((data:any)=>this.asignaturas=data);
      

           return;
         }else{
          this.appService.listarAsignatura(this.idempleados,this.IdPeriodo,this.idModalidad,this.IdCurso,this.IdParalelo).subscribe((data:any)=>this.asignaturas=data);

         }
       }


        

        if(this.IdParalelo==0){
          this.showasignatura=true;
          this.asignaturas=[];
          this.estudiantes=[];
          this.botonreportes=false;
         }
        }
        //----------- fin evento paralelo--------------//

        // -------------------  evento  curso ----------------------//
        onCurso(id: any,event: any){
          this.botonreportes=false;
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
          for(let i=0; i<this.usuarioGuardado().roles.length; i++){
            if(this.usuarioGuardado().roles[i]=="ROLE_Administrador"){ 
         
              this.appService.getAllParalelo().subscribe((data:any)=>this.paralelos=data);       

             return;
           }else{
            this.appService.listarparalelo(this.idempleados,this.IdPeriodo,this.idModalidad,event.value.id_curso).subscribe((data:any)=>this.paralelos=data);       

           }
         }
          
         
          if(this.IdCurso==0){
            this.showasignatura=true;
            this.showparalelo=true;
            this.paralelos=[];
            this.asignaturas=[];
            this.estudiantes=[];
            this.botonreportes=false;
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


        reportes(){
          if(this.validarfecharangoindi==true){
            const dateinicioauxindi = new Date(this.fechacontroliniciostringindi);
            const datefinauxindi = new Date(this.fechacontrolfinstringindi);
          console.log("llego"+ this.idestudiante);
          this.appService.exportInvoice(this.idestudiante,this.idempleados,this.idAsignatura,this.idususarios,dateinicioauxindi, datefinauxindi).subscribe(
            (data:any) => {
              const file = new Blob([data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
            });
          }else{
            swal.fire(
              {
                icon: 'error',
                title: 'Oops...',
                text: 'seleccione una fecha nuevamente!',
               
              })

          }
        
        }
        reportsecurso(){
          if(this.validarfecharango==true){
          
          const dateinicioaux = new Date(this.fechacontroliniciostring);
          const datefinaux = new Date(this.fechacontrolfinstring);
          console.log(dateinicioaux,datefinaux);
          this.appService.exportInvoicecurso(this.idModalidad,this.IdPeriodo,this.IdParalelo,this.idAsignatura,this.IdCurso,this.idempleados,this.idususarios, dateinicioaux, datefinaux).subscribe(
            (data:any) => {
              const file = new Blob([data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
            });
          }else{

            swal.fire(
              {
                icon: 'error',
                title: 'Oops...',
                text: 'seleccione una fecha nuevamente!',
               
              })

          }

        }


        showaparecerfechafin(){
          this.fechacontrolfinstring=this.fechacontrolfin.value;
          this.fechacontroliniciostring=this.fechacontrolinicio.value;
        this.auxinicio = new Date(this.fechacontroliniciostring);
          this.auxfinal = new Date(this.fechacontrolfinstring);
          if(this.auxinicio>this.auxfinal && this.showbotonfechafin==true ){
            this.validarfecharango=false;
            setTimeout(() => {
              this.messageService.add({
                severity: "error",
                summary: "Fecha Incorrecta",
                detail: "La fecha debeser  menor a la fecha final"
              });
            }, 500);
          }
          
          this.showbotonfechafin=true;
          console.log(this.fechainicioreporte);
          console.log(this.fechafinreporte);
          
        }
        rangofecha(){
          this.showbotonfechafin=true;
          console.log(this.fechainicioreporte);
          console.log(this.fechafinreporte);
          this.fechacontrolfinstring=this.fechacontrolfin.value;
          this.fechacontroliniciostring=this.fechacontrolinicio.value;
        this.auxinicio = new Date(this.fechacontroliniciostring);
          this.auxfinal = new Date(this.fechacontrolfinstring);
      
          if(this.auxinicio>this.auxfinal){
            this.validarfecharango=false;
          ///  swal.fire(
          //    {
            //    icon: 'error',
            //    title: 'Oops...',
           //     text: 'La fecha debe ser mayor a la fecha de inicio!',
               
           //   })
           setTimeout(() => {
            this.messageService.add({
              severity: "error",
              summary: "Fecha Incorrecta",
              detail: "La fecha deber mayor a la fecha inicial"
            });
          }, 500);
            this.messageService.add({ key: 'tc', severity: 'error', summary: 'Fecha incorrecta', detail: 'La fecha deber mayor a la fecha inicial' , life: 3000});

          }else{
            this.validarfecharango=true;
          }
        }
      
        




        showaparecerfechafinindividual(){
          this.fechacontrolfinstringindi=this.fechacontrolfinindi.value;
          this.fechacontroliniciostringindi=this.fechacontrolinicioindi.value;
        this.auxinicioindi = new Date(this.fechacontroliniciostringindi);
          this.auxfinalindi = new Date(this.fechacontrolfinstringindi);
          if(this.auxinicioindi>this.auxfinalindi && this.showbotonfechafinindi==true ){
            this.validarfecharangoindi=false;


            setTimeout(() => {
              this.messageService.add({
                severity: "error",
                summary: "Fecha Incorrecta",
                detail: "La fecha debe ser  menor a la fecha final"
              });
            }, 500);
            
          }
          
          this.showbotonfechafinindi=true;
          console.log(this.fechainicioreporte);
          console.log(this.fechafinreporte);
          
        }
        rangofechaindividual(){
          this.showbotonfechafinindi=true;
         
          this.fechacontrolfinstringindi=this.fechacontrolfinindi.value;
          this.fechacontroliniciostringindi=this.fechacontrolinicioindi.value;
        this.auxinicioindi = new Date(this.fechacontroliniciostringindi);
          this.auxfinalindi = new Date(this.fechacontrolfinstringindi);
       
           
          if(this.auxinicioindi>this.auxfinalindi){
            this.validarfecharangoindi=false;
            setTimeout(() => {
              this.messageService.add({
                severity: "error",
                summary: "Fecha Incorrecta",
                detail: "La fecha debe ser  mayor a la fecha inicial"
              });
            }, 500);



          }else{
            this.validarfecharangoindi=true;
          }
        }
      
}
