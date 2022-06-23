import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/config';
import { genero } from 'src/app/Model/rolesTS/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private _baseUrl: string = Api.url;
  constructor(private _http: HttpClient) { }
  

  getGeneros(): Observable<genero[]> {
    return this._http.get<genero[]>(`${this._baseUrl}mapGenero/genero`);
  }
}
