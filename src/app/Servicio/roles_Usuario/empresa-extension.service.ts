import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/config';
import { empresa } from 'src/app/Model/rolesTS/empresa';
import { extension } from 'src/app/Model/rolesTS/extension';

@Injectable({
  providedIn: 'root'
})
export class EmpresaExtensionService {

  private _baseUrl: string = Api.url;
  constructor(private _http: HttpClient) { }

  getExtensiones(): Observable<extension[]>{
    return this._http.get<extension[]>(`${this._baseUrl}mapExtension/extension`);
  }
  getEmpresas(): Observable<empresa[]>{
    return this._http.get<empresa[]>(`${this._baseUrl}mapEmpresa/empresa`);
  }
}
