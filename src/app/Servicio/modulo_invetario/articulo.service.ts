import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { Articulo } from '../../Model/Inventarios/Articulo';
import { map, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResArticulo } from '../../Model/Inventarios/interfaces/resp';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private _baseUrl: string = Api.url; 

  constructor(
    private _http: HttpClient,
  ) { }

  getArticuloPorId = ( id: number ): Observable<Articulo> => {
    return this._http.get<Articulo>(`${this._baseUrl}articulo/?id= ${id}`);
  }

  actualizarArticulo = (articulo: Articulo, id: number) => {
    return this._http.put<ResArticulo>(`${this._baseUrl}articulo/${id}`, articulo)
      .pipe(
        map( (response: ResArticulo) =>  response.status),
        catchError( err => of(false))
      );
  }
}
