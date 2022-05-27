import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuario } from '../../Model/rolesTS/usuario';
import { Api } from '../../config';
@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private _baseUrl: string = Api.url;
  constructor(private http: HttpClient) { }
  dato: Boolean = false;

  getUsuarios(): Observable<usuario[]> {
    return this.http.get<usuario[]>(`${this._baseUrl}mapUsuario/Usuario`);
  }

}
