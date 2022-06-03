import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/config';
import { Matricula } from 'src/app/Model/Matriculas/matricula';
import { Comprobante } from 'src/app/Model/Pagos/comprobante';
import { DetalleComprobante } from 'src/app/Model/Pagos/detalleComprobante';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  private baseUrl: string = Api.url;
  constructor(private http: HttpClient) { }

  url= Api.url+'api';

  getComprobante(): Observable<DetalleComprobante[]>{
    return this.http.get<DetalleComprobante[]>(`${this.baseUrl}/detalleComprobante`);
  } 

  getAllComprobante(){
    return this.http.get<DetalleComprobante[]>(this.url+'/detalleComprobante');
  }

  deleteComprobante(id:number){
    return this.http.delete(this.url+'/detalleComprobante/'+id);
  }

  createComprobante(comprobante: Comprobante){
    console.log(this.url+'/comprobante')
    return this.http.post(this.url+'/comprobante', comprobante);
  }

  getMatricula():Observable<Matricula[]>{
    return this.http.get<Matricula[]>(`${this.baseUrl}/matricula`);
  }
}
