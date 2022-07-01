import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { SalidaArticulo } from '../../Model/Inventarios/SalidaArticulo';
import { map, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResSalida } from '../../Model/Inventarios/interfaces/resp';

@Injectable({
  providedIn: 'root'
})
export class SalidaArticuloService {
  private _baseUrl: string = Api.url; 

  constructor(
    private _http: HttpClient,
  ) { }

  getSalidaArticulos = (): Observable<SalidaArticulo[]> => {
    return this._http.get<SalidaArticulo[]>(`${this._baseUrl}salidaarticulo/list`);
  }

  crearSalida = ( salida: SalidaArticulo ) => {
    return this._http.post<ResSalida>(`${this._baseUrl}salidaarticulo/crear`, salida)
      .pipe(
        map( (response: ResSalida) =>  response.status),
        catchError( err => {          
          return of(false)
        })
      );
  }

  eliminarSalidaArticulo = ( id: number ) => {
    return this._http.delete<ResSalida>(`${this._baseUrl}salidaarticulo/${id}`)
      .pipe(
        map( (response: ResSalida) => {
          return response.status;
        }),
        catchError( (err) => {
          return of(false);
        })
      );
  }
}
