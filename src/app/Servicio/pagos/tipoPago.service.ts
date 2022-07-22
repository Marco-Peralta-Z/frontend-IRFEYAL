import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/config';
import { TipoPago } from 'src/app/Model/Pagos/tipoPago';
import { ConceptoPago } from '../../Model/Pagos/conceptoPago';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  private baseUrl: string = Api.url;
  constructor(private http: HttpClient) { }

  getTipoPago(): Observable<TipoPago[]>{
    return this.http.get<TipoPago[]>(`${this.baseUrl}api/tipo_pago`);
  }

  getConceptoPago(): Observable<ConceptoPago[]>{
    return this.http.get<ConceptoPago[]>(`${this.baseUrl}api/conceptoPago`);
  }



}