import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { Asignatura_Empleado } from 'src/app/Model/Parametrizacion/Asignatura_Empleado';
@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  constructor(private http: HttpClient) { }
  private url = Api.url + "asignatura/";

  getAsignaturas() {
    return this.http.get<Asignatura[]>(this.url + "views");
  }
  createAsignatura(asignatura: Asignatura) {
    return this.http.post<Asignatura>(this.url + "addAsig", asignatura);
  }

  updateAsignatura(asignatura: Asignatura) {
    return this.http.put<boolean>(this.url + "updateAsig/" + asignatura.id_asignatura, asignatura);
  }


  getAsignatura_empleado() {
    return this.http.get<Asignatura_Empleado[]>(this.url + "asignatura_empleado")
  }
}
