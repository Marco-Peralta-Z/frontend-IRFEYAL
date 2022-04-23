import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matricula } from '../../../Model/Matriculas/matricula.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getMatricula():Observable<Matricula[]>{
    return this.http.get<Matricula[]>(`${this.baseUrl}/matricula`);
  }
}
