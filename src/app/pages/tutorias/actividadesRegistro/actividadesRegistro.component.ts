import { Component, OnInit } from '@angular/core';
import { Path } from 'src/app/config';
import { ServiceTutoriasService } from 'src/app/Servicio/tutorias/servicio-tutorias.service';

@Component({
  selector: 'app-actividadesRegistro',
  templateUrl: './actividadesRegistro.component.html',
  styleUrls: ['./actividadesRegistro.component.scss']
})
export class ActividadesRegistroComponent implements OnInit {

  constructor(private miServicio:ServiceTutoriasService) { }
  path:String=Path.url;
  ngOnInit() {
  }

  listarDatos(){
    this.miServicio.muestramensaje("BOTON LISTAR");

  }

  limpiarFormulario(){
    this.miServicio.muestramensaje("BOTON LIMPIAR");

  }

}
