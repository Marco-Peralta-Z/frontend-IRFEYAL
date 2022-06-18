import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Api } from 'src/app/config';
import { Asistencia } from 'src/app/Model/Asistencia/asistencia';
import { Clase } from 'src/app/Model/Asistencia/clase';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DatePipe } from '@angular/common'
@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private rutaconsulta: HttpClient,public datepipe: DatePipe) { }
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
  getInfechasfaltasdelestudiante(idEstudiante: number,idocente: number,idasignatura:number,idcurso:number,idparalelo:number,idmodalidad:number,idperiodo:number){
    return this.rutaconsulta.get(this.url+"/mostrarfechasdefaltas/"+idEstudiante+'/'+idocente+'/'+idasignatura+'/'+idcurso+'/'+idparalelo+'/'+idmodalidad+'/'+idperiodo);
  }
  create(asistencia:Asistencia){
    return this.rutaconsulta.post<Asistencia>(this.url+"/asistenciasave",asistencia);
  
  }
  buscarclase(){
    return this.rutaconsulta.get<Clase>(this.url+"/claseingresada");/*<Clase>*/
  
  }
  createclase(clase:Clase):Observable<Clase>{
    return this.rutaconsulta.post<Clase>(this.url+"/clasesave",clase).pipe(
      map((response:any) => response.cliente as Clase),catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );

  }

  getfiltrosactualizar(idModalidad: number , idPeriodo: number, idParalelo: number,idAsignatura: number, idCurso:number, fecha: string){
    return this.rutaconsulta.get(this.url+"/buscaractualizar/"+idModalidad+'/'+idPeriodo+'/'+idParalelo+'/'+idAsignatura+'/'+idCurso+'/'+fecha);
  }
  
  updateasistencia(asistencia: Asistencia){
    return this.rutaconsulta.put<Asistencia>(this.url +"/updateasistencia/"+asistencia.idAsistencia, asistencia);
  }
  listarperiodos(idempleado:number){
    return this.rutaconsulta.get(this.url+"/Periodos/"+idempleado);
  }
  listarmodalidad(idempleado:number,idperiodo : number){
    return this.rutaconsulta.get(this.url+"/modalidades/"+idempleado+'/'+ idperiodo);
  }
  listarcursos(idempleado:number,idmodalidad: number){
    return this.rutaconsulta.get(this.url+"/cursos/"+idempleado+'/'+ idmodalidad);
  }
  listarparalelo(idempleado:number,idcursp: number){
    return this.rutaconsulta.get(this.url+"/paralelos/"+idempleado+'/'+ idcursp);
  }
  listarAsignatura(idempleado:number,idperiodo: number,idcurso:number,idparalelo:number){
    return this.rutaconsulta.get(this.url+"/asignaturas/"+idempleado+'/'+ idperiodo+'/'+idcurso+'/'+ idparalelo);
  }

  actualizarclases(clase:Clase){
    return this.rutaconsulta.put<Clase>(this.url+"/claseactualizar/"+clase.idClase,clase);
  }
}
