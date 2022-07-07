import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/config';
import { Documento } from 'src/app/Model/Secretaria/documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoServiceService {

  private baseUrl: string = Api.url;
  constructor(private http: HttpClient) { }

  getDocumento(): Observable<Documento[]>{
    return this.http.get<Documento[]>(`${this.baseUrl}api/documentos`);
  }

  createDocumento(documento: Documento): Observable<Documento> {
    console.log(documento);
    return this.http.post<Documento>(`${this.baseUrl}api/documentos`, documento);
  }

  getDocumentoId(id: number): Observable<Documento> {
    return this.http.get<Documento>(`${this.baseUrl}api/documentos/${id}`);
  }
}
