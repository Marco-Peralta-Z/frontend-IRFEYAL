import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { Asignatura_Empleado } from 'src/app/Model/Parametrizacion/Asignatura_Empleado';
import { empleado } from 'src/app/Model/rolesTS/empleado';
@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  constructor(private http: HttpClient) { }
  private url = Api.url + "asignatura";
  private url2 = Api.url + "mapEmpleado";

  getAsignaturas() {
    return this.http.get<Asignatura[]>(this.url);
  }
  createAsignatura(asignatura: Asignatura) {
    return this.http.post<Asignatura>(this.url + "/addAsig", asignatura);
  }

  updateAsignatura(asignatura: Asignatura) {
    return this.http.put<boolean>(this.url + "/updateAsig/" + asignatura.id_asignatura, asignatura);
  }

  getAsignatura_empleado() {
    return this.http.get<Asignatura_Empleado[]>(this.url + "/asignatura_empleado");
  }

  deleteAsig(asig: Asignatura) {
    return this.http.delete<Asignatura>(this.url + "/deleteAsig/" + asig.id_asignatura);
  }

  //Empleados

  getEmpleados(){
    return this.http.get<empleado[]>(this.url2+"/empleado")
  }
}
