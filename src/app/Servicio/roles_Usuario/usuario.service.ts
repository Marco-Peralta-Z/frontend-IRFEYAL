import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RespUsuario, usuario } from '../../Model/rolesTS/usuario';
import { Api } from '../../config';
import { catchError, map } from 'rxjs/operators';
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


  crearUsuario=(usuario : usuario) =>{
    return this.http.post<RespUsuario>(`${this._baseUrl}mapUsuario/usuario`,usuario).pipe(
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

  actualizarUsuario=(id:number, usuario:usuario)=>{
    return this.http.put(`${this._baseUrl}mapUsuario/usuario/${id}`,usuario).pipe(map((response:any)=>
    response.usuario as usuario),
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

  eliminarUsuarioporId=(id:number)=>{
    return this.http.delete(`${this._baseUrl}mapUsuario/usuario/${id}`);
  }
  
}
