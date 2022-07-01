import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { registro } from 'src/app/Model/tutorias/registro';

@Injectable({
  providedIn: 'root'
})
export class CertificadoPromocionServiceService {

  private _baseUrl: string = Api.url;
  constructor(private _http: HttpClient) { }

  getEmpleados(){
    return this._http.get<empleado[]>(`${this._baseUrl}mapEmpleado/empleado`);
  }

  getRegistros(){
    return this._http.get<registro[]>(`${this._baseUrl}registro/ListarRegistros`);
  }
  
}
