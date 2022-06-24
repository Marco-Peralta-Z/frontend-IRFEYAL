import { Injectable } from '@angular/core';
import { Api } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { StockArticulo } from '../../Model/Inventarios/stockArticulo';
import { Inventario } from '../../Model/Inventarios/Inventario';
import { catchError } from 'rxjs/operators';
import { ResInventario } from '../../Model/Inventarios/interfaces/resp';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private _baseUrl: string = Api.url; 

  constructor(
    private _http: HttpClient,
  ) { }

  getStockArticulos = (): Observable<StockArticulo[]> => {
    return this._http.get<StockArticulo[]>(`${this._baseUrl}inventario/list`);
  }

  getInventarios = (): Observable<Inventario[]> => {
    return this._http.get<Inventario[]>(`${this._baseUrl}inventario/listarticulos`);
  }

  crearInventario = (inventario: Inventario) => {
    return this._http.post<ResInventario>(`${this._baseUrl}inventario/crear`, inventario)
      .pipe(
        map( (response: ResInventario) =>  response.status),
        catchError( err => of(false))
      );
  }
}
