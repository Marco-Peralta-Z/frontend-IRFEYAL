import { Injectable } from '@angular/core';

import { Api } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Aprobacion } from '../../Model/Inventarios/Aprobacion';
import { ResAprobacion } from '../../Model/Inventarios/intefaces/res_aprobacion.interface';
import { map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Estudiante } from 'src/app/Model/Matriculas/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EntregarKitService {
  private _baseUrl: string = Api.url;

  constructor(
    private _http: HttpClient,
  ) { }


  crearAprobacion = (aprobacion: Aprobacion) => {
    return this._http.post<ResAprobacion>(`${this._baseUrl}aprobacionkit/crear/`, aprobacion)
      .pipe(
        map( (response: ResAprobacion) => {
          return response.status;
        }),
        catchError( err => {
          console.log(err);
          return of(false);
        })
      );
  }

  actualizarAprobacion = ( aprobacion: Aprobacion ) => {
    return this._http.put<ResAprobacion>(`${this._baseUrl}aprobacionkit`, aprobacion)
      .pipe(
        map( (response: ResAprobacion) => {
          return response.status;
        }),
        catchError( err => {
          console.log(err);
          return of(false);
        })
      );
  }

  eliminarAprobacionPorId = ( id:number ) => {
    return this._http.delete<ResAprobacion>(`${this._baseUrl}aprobacionkit/${id}`)
      .pipe(
        map( (response: ResAprobacion) => {
          return response.status;
        }),
        catchError( (err) => {
          console.log(err);
          return of(false);
        })
      );
  }

  getAprobacionPorId = (id: number) => {
    return this._http.get<ResAprobacion>(`${this._baseUrl}aprobacionkit/?id=${id}`);
  }

  getKitsEntregados = () => {
    return this._http.get(`${this._baseUrl}aprobacionkit/list`);
  }

}
