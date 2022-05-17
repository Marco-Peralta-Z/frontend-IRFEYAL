import { Injectable } from '@angular/core';
import { usuario } from '../../Model/rolesTS/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthConfig } from '../../config';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario?: usuario | null;
  private _token?: string | null;
  private _baseUrl: string = AuthConfig.url;
  
  constructor(
    private _http: HttpClient,
  ) { }

  public get usuario(): usuario {
    if ( this._usuario != null ) {
      return this._usuario;
    } else if ( this._usuario == null && sessionStorage.getItem('usuario') != null ) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')!) as usuario;
      return this._usuario;
    }

    return new usuario();
  }
  public get token(): string | null {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return null;
  }

  logIn = ( cedula: string, password: string): Observable<any>=> {
    // credenciales del cliente   
    const credenciales = btoa(AuthConfig.credenciales);
    // las cabeceras de la peticion para login
    const headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales
    })

    // datos para la authentificacion
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', cedula);
    params.set('password', password);

    return this._http.post<any>(`${this._baseUrl}oauth/token`, params.toString(), {headers});
  }

  guardarUsuario = ( access_token: string ): void => {
    let payload = this.obtenerDatosToken( access_token );
    let {id, user_name, authorities} = payload;
    this._usuario = new usuario();
    this._usuario.id_usuario = id;
    this._usuario.usuario = user_name;
    this._usuario.roles = authorities;

    // guardamos en el sessionstorage
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  // guardamos token en el session storage
  guardarToken = (access_token: string): void => {
    this._token = access_token;
    sessionStorage.setItem('token', this._token);
  }

  obtenerDatosToken = ( access_token: string|null ) => {
    if( access_token !== null) {
      return JSON.parse(atob(access_token.split('.')[1]));
    }
    return null;
  }

  // verificamos loggeo
  isAuthenticated = (): boolean => {
    let payload = this.obtenerDatosToken(this.token);
    if ( payload !== null && payload.user_name && payload.user_name.length > 0 ) {
      return true;
    }
    return false;
  }

  // cerramos session
  logOut = (): void => {
    this._token = null;
    this._usuario = null;

    // borramos de la memoria
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
    
  }

  // verificamos que contega el rol permitido
  hasRole = (role: string): boolean => {
    if (this._usuario?.roles.includes(role)) {
      return true;
    }
    return false;
  }

  showLoading = (close: boolean, title: string, text: string) => {
    Swal.fire({
        title ,
        text,
        width: 600,
        padding: '3em',
        color: '#716add',
        allowOutsideClick: close,
        showConfirmButton: false,
        backdrop: `
          rgba(0,0,123,0.4)
          left top
          no-repeat
        `,
        didOpen: () => {
            Swal.showLoading()
        }
      })
  }
}
