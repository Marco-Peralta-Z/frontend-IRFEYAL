import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Api } from '../../config';
import { Kit } from '../../Model/Inventarios/Kit';
import { ResKit } from '../../Model/Inventarios/intefaces/res_kit.interface';

@Injectable({
  providedIn: 'root'
})
export class KitService {

  private _baseUrl: string = Api.url; 

  constructor(
    private _http: HttpClient,
  ) { }

  crearKit = (kit: Kit) => {
    return this._http.post<ResKit>(`${this._baseUrl}kit/crear/`, kit)
      .pipe(
        map( (response: ResKit) => {
          return response.status;
        }),
        catchError( err => {
          console.log(err);
          return of(false);
        })
      );
  }

  actualizarKit = (id:number, kit: Kit) => {
    return this._http.put<ResKit>(`${this._baseUrl}kit/${id}`, kit)
      .pipe(
        map( (response: ResKit) => {
          return response.status;
        }),
        catchError( err => {
          console.log(err);
          return of(false);
        })
      );
  }

  eliminarPorId = ( id: number ) => {
    return this._http.delete<ResKit>(`${this._baseUrl}kit/${id}`)
      .pipe(
        map( (response: ResKit) => {
          return response.status;
        }),
        catchError( (err) => {
          console.log(err);
          return of(false);
        })
      )
  }

  getKitPorId = (id: number) => {
    return this._http.get<ResKit>(`${this._baseUrl}kit/${id}`);
  }

  getKits = ()  => {
    return this._http.get(`${this._baseUrl}kit/list/`);
  }
}
