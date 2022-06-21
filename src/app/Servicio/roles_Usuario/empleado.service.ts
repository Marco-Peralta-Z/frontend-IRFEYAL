import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Api } from 'src/app/config';
import { empleado, RespEmpleado } from 'src/app/Model/rolesTS/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private _baseUrl: string = Api.url;
  constructor(private _http: HttpClient) { }
  
  crearEmpleado=(empleado : empleado) =>{
    return this._http.post<RespEmpleado>(`${this._baseUrl}mapEmpleado/empleado`,empleado);
  } 

  getEmpleados(): Observable<empleado[]> {
    return this._http.get<empleado[]>(`${this._baseUrl}mapEmpleado/empleado`);
  }

  eliminarEmpleadoporId=(id:number)=>{
    return this._http.delete(`${this._baseUrl}mapEmpleado/empleado/${id}`);
  }
  actualizarEmpleado=(id:number, empleado:empleado)=>{
    // TODO: CAMBIAR PARTH  (CANTON POR EMPLEADO) TANTO BACK COMO FRONT
    return this._http.put(`${this._baseUrl}mapEmpleado/canton/${id}`,empleado); 
  }
  bucarCedula(cedula: string ){
    return this._http.get<empleado[]>(`${this._baseUrl}mapEmpleado/empleado/${cedula}`)
  }
}
