import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Modalidad } from 'src/app/Model/Parametrizacion/Modalidad';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  constructor(private http: HttpClient) { }
  private url = Api.url + "periodo"

  getAllPerdiodo() {
    return this.http.get<Periodo[]>(this.url)
  }

  getPeridoId(id: any) {
    return this.http.get<Periodo>(this.url + "/" + id)
  }

  postPeriodo(perido: Periodo) {
    return this.http.post<Periodo>(this.url, perido);
  }

  deltePeriodo(perido: Periodo) {
    return this.http.delete<any>(this.url + "/" + perido.id_periodo);
  }

  putPeriodo(perido: Periodo) {
    return this.http.put<Periodo>(this.url + "/" + perido.id_periodo, perido);
  }

  //Modalidad

  getAllModalidad() {
    return this.http.get<Modalidad[]>(Api.url + "modalidad");
  }
}
