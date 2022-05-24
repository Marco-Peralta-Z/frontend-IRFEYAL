import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { Modulo } from '../../Model/Inventarios/ModuloLibro';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  private _baseUrl: string = Api.url; 

  constructor(
    private _http: HttpClient
  ) { }

  crearModulo = (modulo: Modulo) => {
    return this._http.post(`${this._baseUrl}modulolibro/crear/`, modulo);
  }

  getModulos = ()  => {
    return this._http.get(`${this._baseUrl}modulolibro/list/`);
  }
}
