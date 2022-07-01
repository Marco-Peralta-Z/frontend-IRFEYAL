import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { registro } from 'src/app/Model/tutorias/registro';
@Injectable({
  providedIn: 'root'
})
export class ServiceregistroService {

  constructor(private http: HttpClient) { }

  private url = Api.url;

  getPeriodo() {
    //http://localhost:9070/periodo/listperiodo

    return this.http.get<Periodo[]>(this.url + "periodo" + "/viewPeriodo");
  }

  //metodo para buscar estudiante por cedula del modulo de secertaria
  getCedulaPorEstudiante(cedula: string){
    return this.http.get<registro[]>(`${this.url}Registro/buscarcedulaEstudiante/${cedula}`);
  }
}
