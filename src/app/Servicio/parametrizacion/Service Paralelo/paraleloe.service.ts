import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Paralelo } from 'src/app/Model/Parametrizacion/Paralelo';

@Injectable({
  providedIn: 'root'
})
export class ParaleloeService {

  constructor(private http: HttpClient) { }
  private url = Api.url + "paralelo"
  getAllParalelo() {
    return this.http.get<Paralelo[]>(this.url);
  }

  getidParalelo(id:any) {
    return this.http.get<Paralelo[]>(this.url+"/"+id);
  }

}
