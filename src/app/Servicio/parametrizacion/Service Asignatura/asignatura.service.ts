import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Area } from 'src/app/Model/Parametrizacion/Area';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { empleado } from 'src/app/Model/rolesTS/empleado';
import { rolUsuario } from 'src/app/Model/rolesTS/rolUsuario';
import { usuario } from 'src/app/Model/rolesTS/usuario';
@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  constructor(private http: HttpClient) { }
  private url = Api.url + "asignatura";
  private url2 = Api.url + "mapEmpleado";
  private url3 = Api.url + "mapRolUsuario";

  getAsignaturas() {
    return this.http.get<Asignatura[]>(this.url);
  }
  getIdAsignaturas(id: any) {
    return this.http.get<Asignatura>(this.url + "/" + id);
  }
  createAsignatura(asignatura: Asignatura) {
    return this.http.post<any>(this.url, asignatura);
  }

  updateAsignatura(asignatura: Asignatura) {
    return this.http.put<boolean>(this.url + "/" + asignatura.id_asignatura, asignatura);
  }

  deleteAsig(asig: Asignatura) {
    return this.http.delete<Asignatura>(this.url + "/" + asig.id_asignatura);
  }

  //Empleados

  getEmpleados() {
    return this.http.get<empleado[]>(this.url2 + "/empleado")
  }

  getRolUsuario(){
    return this.http.get<rolUsuario[]>(this.url3+"/rolUsuario")
  }

  //Area

  getAllArea() {
    return this.http.get<Area[]>(Api.url + "area")
  }

  UpdateArea(area: Area) {
    return this.http.put<any>(Api.url + "area/"+area.id_area, area);
  }
}
