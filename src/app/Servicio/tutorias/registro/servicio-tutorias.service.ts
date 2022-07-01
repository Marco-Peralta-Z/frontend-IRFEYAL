import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Periodo, Malla, Modalidad, Curso, Paralelo, Asignatura, Registro } from 'src/app/Model/tutorias/registro';

@Injectable({
  providedIn: 'root'
})
export class ServiceTutoriasService {

  constructor(private http: HttpClient) { }
  private url = Api.url

  getPeriodos(id_empleado: any) {
    return this.http.get<Periodo[]>(this.url + "registro/Periodos/" + id_empleado)
  }

  getMallas(id_empleado: any, periodo: Periodo) {
    return this.http.get<Malla[]>(this.url + "registro/Malla/" + id_empleado + "/" + periodo.id_periodo)
  }

  getModalidades(id_empleado: any, periodo: Periodo, malla: Malla) {
    return this.http.get<Modalidad[]>(this.url + "registro/Modalidades/" + id_empleado + "/" + periodo.id_periodo + "/" + malla.id_malla)
  }

  getCursos(id_empleado: any, periodo: Periodo, malla: Malla, modalidad: Modalidad,) {
    return this.http.get<Curso[]>(this.url + "registro/Cursos/" + id_empleado + "/" + periodo.id_periodo + "/" + malla.id_malla + "/" + modalidad.id_modalidad)
  }

  getParalelos(id_empleado: any, periodo: Periodo, malla: Malla, modalidad: Modalidad, curso: Curso) {
    return this.http.get<Paralelo[]>(this.url + "registro/Paralelos/" + id_empleado + "/" + periodo.id_periodo + "/" + malla.id_malla + "/" + modalidad.id_modalidad + "/" + curso.id_curso)
  }

  getAsignaturas(id_empleado: any, periodo: Periodo, malla: Malla, modalidad: Modalidad, curso: Curso, paralelo: Paralelo) {
    return this.http.get<Asignatura[]>(this.url + "registro/Asignaturas/" + id_empleado + "/" + periodo.id_periodo + "/" + malla.id_malla + "/" + modalidad.id_modalidad + "/" + curso.id_curso + "/" + paralelo.id_paralelo)
  }

  getRegistros(periodo: Periodo, , asignatura: Asignatura) {
    return this.http.get<Registro[]>(this.url + "registro/Filtrocompleto/" + periodo.id_periodo + "/" + malla.id_malla + "/" + modalidad.id_modalidad + "/" + curso.id_curso + "/" + paralelo.id_paralelo + "/" + asignatura.id_asignatura)
  }

  setRegistros(registro: Registro) {
    return this.http.put<Registro>(this.url + "registro/UpdateRegistro/" + registro.id_registro, registro)
  }
}
