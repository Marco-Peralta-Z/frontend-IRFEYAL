import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Horario } from 'src/app/Model/Parametrizacion/Horario';

@Injectable({
  providedIn: 'root'
})
export class ServiceHorarioService {

  constructor(private http: HttpClient) { }

  private url = Api.url + "horario";

  getAllHorario() {
    return this.http.get<Horario[]>(this.url);
  }

  postHorario(h:Horario){
    return this.http.post<any>(this.url,h);
  }

  getIdHorario(id:any) {
    return this.http.get<Horario>(this.url+"/"+id);
  }
}
