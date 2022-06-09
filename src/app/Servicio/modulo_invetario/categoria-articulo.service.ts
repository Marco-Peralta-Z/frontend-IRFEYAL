import { Injectable } from '@angular/core';
import { Api } from '../../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/Model/Inventarios/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriaArticuloService {

  private _baseUrl: string = Api.url; 

  constructor(
    private _http: HttpClient,
  ) { }

  getInventarios = (): Observable<Categoria[]> => {
    return this._http.get<Categoria[]>(`${this._baseUrl}categoriarticulo/list`);
  }
}
