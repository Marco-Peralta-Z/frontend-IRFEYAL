import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { HttpClient } from '@angular/common/http';
import { ResDetallaBajaArt } from '../../Model/Inventarios/interfaces/resp';
import { DetallebajaArti } from '../../Model/Inventarios/DetallebajaArti';
import { map, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetalleBajaArticuloService {

  private _baseUrl: string = Api.url; 

  constructor(
    private _http: HttpClient,
  ) { }

  // getArticuloPorId = ( id: number ): Observable<Articulo> => {
  //   return this._http.get<Articulo>(`${this._baseUrl}articulo/?id= ${id}`);
  // }

  crearDetalleBajaArticulo = (detalleBaja: DetallebajaArti) => {
    return this._http.post<ResDetallaBajaArt>(`${this._baseUrl}bajaarticulo/crear/`, detalleBaja);
  }
}
