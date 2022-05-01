import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../../../Model/Matriculas/estudiante';
import { Observable, throwError } from 'rxjs';
import { provincia } from 'src/app/Model/rolesTS/provincia';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
private baseUrl: string = environment.baseUrl;
private urlPrueba: string = 'http://localhost:9090/mapProv';
  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`${this.baseUrl}/estudiantes`);
  }

  getEstudiantePorCedula(cedula: string): Observable<Estudiante>{
    return this.http.get<Estudiante>(`${this.baseUrl}/buscarEstudiante/${cedula}`);
  }

  getProvincias(): Observable<provincia[]>{
    return this.http.get<provincia[]>(`${this.urlPrueba}/Provincia`);
  }
}
