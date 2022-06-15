import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/config';
import { Bitacora } from 'src/app/Model/Secretaria/bitacora';

@Injectable({
  providedIn: 'root'
})
export class BitacoraServiceService {

  private baseUrl: string = Api.url;
  constructor(private http: HttpClient) { }

  getBitacora(): Observable<Bitacora[]>{
    return this.http.get<Bitacora[]>(`${this.baseUrl}api/registroBitacora`)
  }

  /*updateBitacora(id: number, bitacora: Bitacora): Observable<Bitacora> {
    return this.http.put<Bitacora>(`${this.baseUrl}/registroBitacora/${id}`, bitacora);
  }*/

  createBitacora(bitacora: Bitacora): Observable<Bitacora> {
    //console.log(bitacora);//ver que pasa aqui que no me llegan los datos
    return this.http.post<Bitacora>(`${this.baseUrl}api/registroBitacora`, bitacora);
  }
}
