import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Api } from '../../config';
import { Categoria } from 'src/app/Model/Inventarios/categorias';
import { ResCategoria } from '../../Model/Inventarios/interfaces/resp';

@Injectable({
  providedIn: 'root'
})
export class CategoriaArticuloService {

  private _baseUrl: string = Api.url; 

  constructor(
    private _http: HttpClient,
  ) { }

  getCategorias = (): Observable<Categoria[]> => {
    return this._http.get<Categoria[]>(`${this._baseUrl}categoriarticulo/list`);
  }

  getPorId = (id: number) => {
    return this._http.get<ResCategoria>(`${this._baseUrl}categoriarticulo/?id=${id}`);
  }

  crearCategoria = (categoria: Categoria) => {
    return this._http.post<ResCategoria>(`${this._baseUrl}categoriarticulo/crear`, categoria)
      .pipe(
        map( (response: ResCategoria) => {
          return response.status;
        }),
        catchError( err => {
          return of(false);
        })
      );
  }

  actualizarCategoria = (id:number, categoria: Categoria) => {
    return this._http.put<ResCategoria>(`${this._baseUrl}categoriarticulo/${id}`, categoria)
      .pipe(
        map( (response: ResCategoria) => {
          return response.status;
        }),
        catchError( err => {
          return of(false);
        })
      );
  }

  eliminarPorId = (id: number) => {
    return this._http.delete<ResCategoria>(`${this._baseUrl}categoriarticulo/${id}`)
      .pipe(
        map( (response: ResCategoria) => {
          return response.status;
        }),
        catchError( (err) => {
          return of(false);
        })
      );
  }
}
