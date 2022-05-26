import { Injectable } from '@angular/core';

import { Api } from '../../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KitService {

  private _baseUrl: string = Api.url; 

  constructor(
    private _http: HttpClient,
  ) { }

  getKits = ()  => {
    return this._http.get(`${this._baseUrl}kit/list/`);
  }
}
