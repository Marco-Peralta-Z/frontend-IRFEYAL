import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../../config';
import { persona } from 'src/app/Model/rolesTS/persona';
import { provincia } from 'src/app/Model/rolesTS/provincia';
import { genero } from 'src/app/Model/rolesTS/genero';
import { pais } from 'src/app/Model/rolesTS/pais';
import { parroquia } from 'src/app/Model/rolesTS/parroquia';
import { canton } from 'src/app/Model/rolesTS/canton';
import { extension } from 'src/app/Model/rolesTS/extension';
@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  private _baseUrl: string = Api.url;
  constructor(private http: HttpClient) { }
  dato: Boolean = false;

  getPersonas(): Observable<persona[]> {
    return this.http.get<persona[]>(`${this._baseUrl}mapPersona/persona`);
  }
  getProvincias(): Observable<provincia[]>{
    return this.http.get<provincia[]>(`${this._baseUrl}mapProv/Provincia`);
  }

  getGenero(): Observable<genero[]>{
    return this.http.get<genero[]>(`${this._baseUrl}mapGenero/genero`);
  }

  getPais(): Observable<pais[]>{
    return this.http.get<pais[]>(`${this._baseUrl}mapPais/pais`);
  }

  getParroquia(): Observable<parroquia[]>{
    return this.http.get<parroquia[]>(`${this._baseUrl}mapParroquia/parroquia`);
  }
  getCanton(): Observable<canton[]>{
    return this.http.get<canton[]>(`${this._baseUrl}mapCanton/canton`);
  }

  getExtension(): Observable<extension[]>{
    return this.http.get<extension[]>(`${this._baseUrl}mapExtension/extension`);
  }
}
