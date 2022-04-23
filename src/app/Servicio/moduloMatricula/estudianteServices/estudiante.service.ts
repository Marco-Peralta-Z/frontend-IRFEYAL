import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../../../Model/Matriculas/estudiante.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`${this.baseUrl}/estudiantes`);
  }
}
