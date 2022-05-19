import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../../../Model/Matriculas/estudiante';
import { Observable, throwError } from 'rxjs';
import { provincia } from 'src/app/Model/rolesTS/provincia';
import { catchError, map } from 'rxjs/operators';
import { genero } from '../../../Model/rolesTS/genero';
import { pais } from '../../../Model/rolesTS/pais';
import { parroquia } from '../../../Model/rolesTS/parroquia';
import { canton } from '../../../Model/rolesTS/canton';
import { extension } from '../../../Model/rolesTS/extension';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
private baseUrl: string = environment.baseUrl;
private urlPrueba: string = 'http://localhost:9070/mapProv';
private  urlGenero: string ='http://localhost:9070/mapGenero';
private  urlPais: string ='http://localhost:9070/mapPais';
private  urlParroquia: string ='http://localhost:9070/mapParroquia';
private  urlCanton: string ='http://localhost:9070/mapCanton'
private  urlExten: string ='http://localhost:9070/mapExtension'
  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`${this.baseUrl}/estudiantes`);
  }

  getEstudiantePorCedula(cedula: string): Observable<Estudiante>{
    return this.http.get<Estudiante>(`${this.baseUrl}/buscarEstudiante/${cedula}`);
  }

  postEstudiante(estudiante: Estudiante): Observable<Estudiante>{
    return this.http.post<Estudiante>(`${this.baseUrl}/estudiante`, estudiante).pipe(
      map((response: any) => response.estudiante as Estudiante),
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
  getProvincias(): Observable<provincia[]>{
    return this.http.get<provincia[]>(`${this.urlPrueba}/Provincia`);
  }

  getGenero(): Observable<genero[]>{
    return this.http.get<genero[]>(`${this.urlGenero}/genero`);
  }

  getPais(): Observable<pais[]>{
    return this.http.get<pais[]>(`${this.urlPais}/pais`);
  }

  getParroquia(): Observable<parroquia[]>{
    return this.http.get<parroquia[]>(`${this.urlParroquia}/parroquia`);
  }
  getCanton(): Observable<canton[]>{
    return this.http.get<canton[]>(`${this.urlCanton}/canton`);
  }

  getExtension(): Observable<extension[]>{
    return this.http.get<extension[]>(`${this.urlExten}/extension`);
  }
}
