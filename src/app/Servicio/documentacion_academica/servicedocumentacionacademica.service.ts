import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
@Injectable({
  providedIn: 'root'
})
export class ServicedocumentacionacademicaService {

  constructor(private htpp: HttpClient) { }

  url = Api.url + "asignatura";

  getAsignaturas() {
    return this.htpp.get<Asignatura[]>(this.url + "/views");
  }
}
