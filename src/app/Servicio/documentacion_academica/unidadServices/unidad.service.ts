import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private API_SERVER = "http://localhost:8080/unidades/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllUnidades(): Observable<any> {
    return this.httpClient.get(this.API_SERVER);
  }
}
