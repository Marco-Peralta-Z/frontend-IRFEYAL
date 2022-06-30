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
import { Api } from '../../../config';
import { persona } from '../../../Model/rolesTS/persona';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
private baseUrl: string = Api.url;

  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`${this.baseUrl}api/estudiantes`);
  }

  getEstudiantePersonas(): Observable<persona[]>{
    return this.http.get<persona[]>(`${this.baseUrl}api/estudiantePersonas`);
  }
  
  getEstudiantePorCedula(cedula: string): Observable<Estudiante>{
    return this.http.get<Estudiante>(`${this.baseUrl}api/buscarEstudiante/${cedula}`);
  }

  // para modulo de inventario
  getEstudiantesPorCedula(cedula: string): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`${this.baseUrl}api/buscarEstudiantes/${cedula}`);
  }

  postEstudiante(estudiante: Estudiante): Observable<Estudiante>{
    return this.http.post<Estudiante>(`${this.baseUrl}api/estudiante`, estudiante).pipe(
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

  putEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put(`${this.baseUrl}api/estudiante/${estudiante.id_estudiante}`, estudiante).pipe(

      map((response: any) => response.estudiante as Estudiante), catchError(e => {

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
    return this.http.get<provincia[]>(`${this.baseUrl}mapProv/Provincia`);
  }

  getGenero(): Observable<genero[]>{
    return this.http.get<genero[]>(`${this.baseUrl}mapGenero/genero`);
  }

  getPais(): Observable<pais[]>{
    return this.http.get<pais[]>(`${this.baseUrl}mapPais/pais`);
  }

  getParroquia(): Observable<parroquia[]>{
    return this.http.get<parroquia[]>(`${this.baseUrl}mapParroquia/parroquia`);
  }
  getCatonPorProvinciaId(id: number):Observable<canton[]>{
    return this.http.get<canton[]>(`${this.baseUrl}mapCanton/canton/${id}`);
  }

  getParroquiaPorCantonId(id: number):Observable<parroquia[]>{
    return this.http.get<parroquia[]>(`${this.baseUrl}mapParroquia/parroquia/${id}`);
  }

  getCanton(): Observable<canton[]>{
    return this.http.get<canton[]>(`${this.baseUrl}mapCanton/canton`);
  }

  getExtension(): Observable<extension[]>{
    return this.http.get<extension[]>(`${this.baseUrl}mapExtension/extension`);
  }
}
