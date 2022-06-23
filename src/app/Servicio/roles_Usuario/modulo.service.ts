import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../../config';
import { modulo } from 'src/app/Model/rolesTS/modulo';
@Injectable({
  providedIn: 'root'
})

export class ModuloService {
  private _baseUrl: string = Api.url;
  constructor(private http: HttpClient) { }
  dato: Boolean = false;

  getModulos(): Observable<modulo[]> {
    return this.http.get<modulo[]>(`${this._baseUrl}mapModulo/modulo`);
  }
}
