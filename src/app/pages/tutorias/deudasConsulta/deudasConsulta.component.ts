import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { Path } from 'src/app/config';
import { ServiceTutoriasService } from 'src/app/Servicio/tutorias/servicio-tutorias.service';

@Component({
  selector: 'app-deudasConsulta',
  templateUrl: './deudasConsulta.component.html',
  styleUrls: ['./deudasConsulta.component.scss']
})
export class DeudasConsultaComponent implements OnInit {

  constructor(private router:Router, private miServicio:ServiceTutoriasService) { }
  path:String=Path.url;
  ngOnInit() { 

  }

  ingresadoBuscar:string='';
  cedula:string='';
  nombre:string='';
  cantidad:string='';
  estado:string='';
  

  llenarCuadro(){
    if(this.ingresadoBuscar.length<10 || this.ingresadoBuscar.length>10){
      this.miServicio.muestramensaje("INGRESE UN NUMERO DE CEDULA VALIDO");
    }else{
      this.cedula='0105865661';
      this.nombre='Cecilia Toapanta';
      this.cantidad='$'+'20';
      this.estado='Debiendo';
    }
  }

  vaciarCuadro(){
    this.ingresadoBuscar='';
    this.cedula="";
    this.nombre="";
    this.cantidad="";
    this.estado="";
  }

  regresarHome(){
    this.router.navigate(["home"]);
  }    

}
