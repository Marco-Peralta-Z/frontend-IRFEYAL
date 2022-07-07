import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/config';
import { DetalleComprobante } from 'src/app/Model/Pagos/detalleComprobante';

@Injectable({
  providedIn: 'root'
})
export class DetalleComprobanteService {

  private baseUrl: string = Api.url;
  constructor(private http: HttpClient) { }

  getDetalleComprobante(): Observable<DetalleComprobante[]>{
    return this.http.get<DetalleComprobante[]>(`${this.baseUrl}/detalleComprobante`);
  } 

  crearDetalleComprobante(detalleComprobante: DetalleComprobante){
    return this.http.post(`${this.baseUrl}api/detalleComprobante`,detalleComprobante);
  }

  deleteComprobante(id:number){
    return this.http.delete(this.baseUrl+'api/detalleComprobante/'+id);
  }
}
