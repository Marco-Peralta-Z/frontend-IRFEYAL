import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/config';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { CertificadoMatricula } from 'src/app/Model/Secretaria/certificadoMatricula';

@Injectable({
  providedIn: 'root'
})
export class CertificadoMatriculaServiceService {

  private _baseUrl: string = Api.url;
  constructor(private _http: HttpClient) { }

  getEmpleados(){
    return this._http.get<empleado[]>(`${this._baseUrl}mapEmpleado/empleado`);
  }

  getCertificadoMatriculaPorCedula(cedula: string){
    return this._http.get<CertificadoMatricula[]>(`${this._baseUrl}api/certificadoMatricula/${cedula}`)
  }

  getCertificadoMatriculaAll(): Observable<CertificadoMatricula[]>{
    return this._http.get<CertificadoMatricula[]>(`${this._baseUrl}api/certificadoMatricula`);
  } 
  
  crearCertificadoMatricula(certificadoMatricula: CertificadoMatricula){
    return this._http.post(`${this._baseUrl}api/certificadoMatricula`,certificadoMatricula);
  }
}
