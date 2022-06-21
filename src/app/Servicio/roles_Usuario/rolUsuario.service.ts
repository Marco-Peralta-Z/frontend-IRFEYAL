import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Api } from '../../config';
import { RespRolUsuario, rolUsuario } from 'src/app/Model/rolesTS/rolUsuario';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class rolUsuarioService {
  private _baseUrl: string = Api.url;
  constructor(private http: HttpClient) { }
  dato: Boolean = false;

  getRolUsuarios(): Observable<rolUsuario[]> {
    return this.http.get<rolUsuario[]>(`${this._baseUrl}mapRolUsuario/rolUsuario`);
  }
  crearRolUsuario=( rolUsuario:rolUsuario)=>{
    return this.http.post<RespRolUsuario>(`${this._baseUrl}mapRolUsuario/rolUsuario`,rolUsuario).pipe(
    catchError(e =>{
      if(e.status ==400){
        return throwError(e);
      }
      if(e.error.mensaje){
        console.log(e.error.mensaje);
      };
      return throwError(e);
    })
    ); 
  }

  actualizarRolUsuarios=(id:number, rolUsuario:rolUsuario)=>{
    return this.http.put(`${this._baseUrl}maprolUsuario/rolUsuario`,rolUsuario).pipe(map((response:any)=>
    response.rolUsuario as rolUsuario),
    catchError(e =>{
      if(e.status ==400){
        return throwError(e);
      }
      if(e.error.mensaje){
        console.log(e.error.mensaje);
      };
      return throwError(e);
    })
    ); 
  }

  eliminarRolUsuario=(id:number)=>{
    return this.http.delete(`${this._baseUrl}mapRolUsuario/rolUsuario/${id}`);
  }

  
}
