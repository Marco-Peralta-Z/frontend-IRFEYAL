import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { Api } from 'src/app/config';
import { Matricula } from '../../../Model/Matriculas/matricula';
import { Curso } from '../../../Model/Parametrizacion/Curso';
import { Modalidad } from '../../../Model/Parametrizacion/Modalidad';
import { Periodo } from '../../../Model/Parametrizacion/Periodo';
import { Paralelo } from '../../../Model/Parametrizacion/Paralelo';



@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  private baseUrl: string = Api.url;

  constructor(private http: HttpClient) { }

  getMatricula():Observable<Matricula[]>{
    return this.http.get<Matricula[]>(`${this.baseUrl}api/matricula`);
  }
  getCursos():Observable<Curso[]>{
  return this.http.get<Curso[]>(`${this.baseUrl}curso`).pipe(
    map((response: any) => response as Curso[])
  );
}

getJornadas():Observable<Modalidad[]>{
  return this.http.get<Modalidad[]>(`${this.baseUrl}modalidad`);
}

getJormadasPorCurso(id_curso: number):Observable<Modalidad[]>{
  return this.http.get<Modalidad[]>(`${this.baseUrl}modalidad/getJormadasPorCurso/${id_curso}`);
}

getPeriodos():Observable<Periodo[]>{
  return this.http.get<Periodo[]>(`${this.baseUrl}periodo`);
}

getParalelos():Observable<Paralelo[]>{
  return this.http.get<Paralelo[]>(`${this.baseUrl}paralelo`);
}

postMatricula(matricula: Matricula): Observable<Matricula>{
  return this.http.post<Matricula>(`${this.baseUrl}api/matricula`, matricula).pipe(
    map((response: any) => 
    response.estudiante as Matricula),
    catchError(e => {
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


}
