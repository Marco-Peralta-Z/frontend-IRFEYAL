import { Injectable } from '@angular/core';
import { Api } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario } from '../../Model/Inventarios/Inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private _baseUrl: string = Api.url; 

  constructor(
    private _http: HttpClient,
  ) { }

  getInventarios = (): Observable<Inventario[]> => {
    return this._http.get<Inventario[]>(`${this._baseUrl}inventario/list`);
  }
}
