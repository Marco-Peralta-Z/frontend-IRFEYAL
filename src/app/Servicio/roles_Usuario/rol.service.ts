import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from '../../config';
import { rol } from 'src/app/Model/rolesTS/rol';
@Injectable({
  providedIn: 'root'
})

export class RolService {
  private _baseUrl: string = Api.url;
  constructor(private http: HttpClient) { }
  dato: Boolean = false;

  getRoles(): Observable<rol[]> {
    return this.http.get<rol[]>(`${this._baseUrl}mapRol/rol`);
  }
}
