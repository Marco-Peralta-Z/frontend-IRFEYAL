import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Api } from 'src/app/config';
import { Modulo } from '../../Model/Inventarios/ModuloLibro';
import { ResModulo } from '../../Model/Inventarios/interfaces/res_modulo.interface';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  private _baseUrl: string = Api.url; 

  constructor(
    private _http: HttpClient
  ) { }

  crearModulo = (modulo: Modulo) => {
    return this._http.post<ResModulo>(`${this._baseUrl}modulolibro/crear/`, modulo)
      .pipe(
        map( (response: ResModulo) => {
          return response.status;
        }),
        catchError( err => {
          return of(false);
        })
      );
  }

  actualizarModulo = (id:number, modulo: Modulo) => {
    return this._http.put<ResModulo>(`${this._baseUrl}modulolibro/${id}`, modulo)
      .pipe(
        map( (response: ResModulo) => {
          return response.status;
        }),
        catchError( err => {
          return of(false);
        })
      );
  }

  eliminarPorId = ( id: number ) => {
    return this._http.delete<ResModulo>(`${this._baseUrl}modulolibro/${id}`)
      .pipe(
        map( (response: ResModulo) => {
          return response.status;
        }),
        catchError( (err) => {
          return of(false);
        })
      );
  }

  getModuloPorId = (id: number) => {
    return this._http.get<ResModulo>(`${this._baseUrl}modulolibro/${id}`);
  }
  getModulos = ()  => {
    return this._http.get(`${this._baseUrl}modulolibro/list/`);
  }


}
