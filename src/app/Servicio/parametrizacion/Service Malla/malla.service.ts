import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Malla } from 'src/app/Model/Parametrizacion/Malla';

@Injectable({
  providedIn: 'root'
})
export class MallaService {

  constructor(private http: HttpClient) { }
  private url = Api.url + "malla"
  getAllMalla() {
    return this.http.get<Malla[]>(this.url);
  }
  getidMalla(id: any) {
    return this.http.get<any>(this.url + "/" + id);
  }

  postMalla(malla: Malla) {
    return this.http.post<any>(this.url, malla);
  }

  putMalla(malla: Malla) {
    return this.http.put<any>(this.url + "/" + malla.id_malla, malla);
  }

  delteMalla(malla: Malla) {
    return this.http.delete<any>(this.url + "/" + malla.id_malla);
  }
}
