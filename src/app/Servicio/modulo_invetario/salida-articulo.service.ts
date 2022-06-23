import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { SalidaArticulo } from '../../Model/Inventarios/SalidaArticulo';
import { map, of } from 'rxjs';
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

  // getStockArticulos = (): Observable<StockArticulo[]> => {
  //   return this._http.get<StockArticulo[]>(`${this._baseUrl}inventario/list`);
  // }

  crearSalida = ( salida: SalidaArticulo ) => {
    return this._http.post<ResSalida>(`${this._baseUrl}salidaarticulo/crear`, salida)
      .pipe(
        map( (response: ResSalida) =>  response.status),
        catchError( err => of(false))
      );
  }
}
