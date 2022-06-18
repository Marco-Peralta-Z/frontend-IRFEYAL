import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Api } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private API_SERVER = Api.url + "unidades/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllUnidades(): Observable<any> {
    return this.httpClient.get(this.API_SERVER);
  }
}
