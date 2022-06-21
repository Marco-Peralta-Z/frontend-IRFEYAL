import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/config';
import { canton } from 'src/app/Model/rolesTS/canton';
import { pais } from 'src/app/Model/rolesTS/pais';
import { parroquia } from 'src/app/Model/rolesTS/parroquia';
import { provincia } from 'src/app/Model/rolesTS/provincia';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  private _baseUrl: string = Api.url;
  constructor(private http: HttpClient) { }

  
  getPaises(): Observable<pais[]>{
    return this.http.get<pais[]>(`${this._baseUrl}mapPais/pais`);
  }

  getProvincias(): Observable<provincia[]>{
    return this.http.get<provincia[]>(`${this._baseUrl}mapProv/Provincia`);
  }

  getCantones(): Observable<canton[]>{
    return this.http.get<canton[]>(`${this._baseUrl}mapCanton/canton`);
  }

  getParroquias(): Observable<parroquia[]>{
    return this.http.get<parroquia[]>(`${this._baseUrl}mapParroquia/parroquia`);
  }
  
}