import { Injectable } from '@angular/core';

import { Api } from '../../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntregarKitService {
  private _baseUrl: string = Api.url;

  constructor(
    private _http: HttpClient,
  ) { }




  getKitsEntregados = () => {
    return this._http.get(`${this._baseUrl}aprobacionkit/list`);
  }
}
