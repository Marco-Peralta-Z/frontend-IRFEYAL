import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matricula } from '../../../Model/Matriculas/matricula';
import { Curso } from '../../../Model/Parametrizacion/Curso';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
private baseUrl: string = environment.baseUrl;
private baseCursos: string = 'http://localhost:9070/curso'
  constructor(private http: HttpClient) { }

  getMatricula():Observable<Matricula[]>{
    return this.http.get<Matricula[]>(`${this.baseUrl}/matricula`);
  }

  getCursos():Observable<Curso[]>{
    return this.http.get<Curso[]>(`${this.baseCursos}`);
  }
}
