import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from 'src/app/config';
import { Asistencia } from 'src/app/Model/Asistencia/asistencia';
import { Clase } from 'src/app/Model/Asistencia/clase';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private rutaconsulta: HttpClient) { }
  url = Api.url + 'asistencia';

  getAllAsignatura(){
    return this.rutaconsulta.get(this.url+"/asignaturas");
  }
  getAllModalidad(){
    return this.rutaconsulta.get(this.url+"/Modalidad");
  }
  getAllPeriodo(){
    return this.rutaconsulta.get(this.url+"/Periodo");
  }
  getAllParalelo(){
    return this.rutaconsulta.get(this.url+"/Paralelo");
  }
   getAllCurso(){
    return this.rutaconsulta.get(this.url+"/Curso");
  }
  getfiltros(idModalidad: number ,  idPeriodo: number, idParalelo: number,idAsignatura: number, idCurso:number){
    return this.rutaconsulta.get(this.url+"/filtrosdelaasistencia/"+idModalidad+'/'+idPeriodo+'/'+idParalelo+'/'+idAsignatura+'/'+idCurso);
  }
  getInformaciondelestudiante(idEstudiante: number){
    return this.rutaconsulta.get(this.url+"/buscarestudianteid/"+idEstudiante);
  }
  getInfechasfaltasdelestudiante(idEstudiante: number,idocente: number){
    return this.rutaconsulta.get(this.url+"/mostrarfechasdefaltas/"+idEstudiante+'/'+idocente);
  }
  create(asistencia:Asistencia){
    return this.rutaconsulta.post<Asistencia>(this.url+"/asistenciasave",asistencia);
  
  }
  buscarclase(){
    return this.rutaconsulta.get<Clase>(this.url+"/claseingresada");/*<Clase>*/
  
  }
  createclase(clase:Clase):Observable<Clase>{
    return this.rutaconsulta.post<Clase>(this.url+"/clasesave",clase);
  
  }
  getfiltrosactualizar(idModalidad: number ,  idPeriodo: number, idParalelo: number,idAsignatura: number, idCurso:number, fecha: Date){
    return this.rutaconsulta.get(this.url+"/buscaractualizar/"+idModalidad+'/'+idPeriodo+'/'+idParalelo+'/'+idAsignatura+'/'+idCurso+'/'+fecha);
  }
}
