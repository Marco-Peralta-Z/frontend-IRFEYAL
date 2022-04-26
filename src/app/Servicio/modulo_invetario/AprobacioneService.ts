import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { Aprobacion } from 'src/app/Model/Inventarios/Aprobacion'; 
import { Api } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class AprobacionesService {

  constructor(private rutaconsulta: HttpClient) { }

  url = 'http://localhost:9070';


  //Extraer un listado de Asignatura metodo get
  getListAsignaturas() {
    return this.rutaconsulta.get<Aprobacion[]>(this.url + "/aprobacion/list");
  }

  //Guardar la asignatura por el metodo post
  postGuardarAsignatura(asing: Asignatura) {
    return this.rutaconsulta.post<Asignatura>(this.url + "/addAsig", asing);
  }

  //Eliminar una asignatura metodo delete
  deleteAsignatura(asing: Asignatura){
    return this.rutaconsulta.delete<boolean>(this.url+"/deleteAsing/"+asing.id_asignatura)
  }

  //Actualizar una asignatura el motodo put
  updateAsignatura(asing: Asignatura,id_asignatura:Number){
    return this.rutaconsulta.put<boolean>(this.url+"/updateAsig/"+id_asignatura,asing)
  }

}




