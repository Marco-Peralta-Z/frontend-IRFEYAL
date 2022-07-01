import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/config';
import { TipoComprobante } from 'src/app/Model/Pagos/tipoComprobante';

@Injectable({
  providedIn: 'root'
})
export class TipoComprobanteService {

  private baseUrl: string = Api.url;
  constructor(private http: HttpClient) { }

  getTipoComprobante(): Observable<TipoComprobante[]>{
    return this.http.get<TipoComprobante[]>(`${this.baseUrl}api/tipoComprobante`);
  } 



}