import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Periodo, Modalidad, Curso, Paralelo, Asignatura, Registro } from 'src/app/Model/tutorias/registro';

@Injectable({
  providedIn: 'root'
})
export class ServiceTutoriasService {

  constructor(private http: HttpClient) { }
  private url = Api.url

  getPeriodos(id_empleado: any) {
    return this.http.get<Periodo[]>(this.url + "registro/Periodos/" + id_empleado)
  }

  getModalidades(id_empleado: any, periodo: Periodo) {
    return this.http.get<Modalidad[]>(this.url + "registro/Modalidades/" + id_empleado + "/" + periodo.id_periodo)
  }

  getCursos(id_empleado: any, modalidad: Modalidad, periodo: Periodo) {
    return this.http.get<Curso[]>(this.url + "registro/Cursos/" + id_empleado + "/" + modalidad.id_modalidad + "/" + periodo.id_periodo)
  }

  getParalelos(id_empleado: any, curso: Curso, modalidad: Modalidad, periodo: Periodo) {
    return this.http.get<Paralelo[]>(this.url + "registro/Paralelos/" + id_empleado + "/" + curso.id_curso + "/" + modalidad.id_modalidad + "/" + periodo.id_periodo)
  }

  getAsignaturas(id_empleado: any, paralelo: Paralelo, curso: Curso, modalidad: Modalidad, periodo: Periodo) {
    return this.http.get<Asignatura[]>(this.url + "registro/Asignaturas/" + id_empleado + "/" + periodo.id_periodo + "/" + curso.id_curso + "/" + paralelo.id_paralelo + "/" + modalidad.id_modalidad)
  }

  getRegistros(paralelo: Paralelo, curso: Curso, modalidad: Modalidad, periodo: Periodo, asignatura: Asignatura) {
    return this.http.get<Registro[]>(this.url + "registro/Filtrocompleto/" + periodo.id_periodo + "/" + modalidad.id_modalidad + "/" + curso.id_curso + "/" + paralelo.id_paralelo + "/" + asignatura.id_asignatura)
  }

  setRegistros(registro: Registro) {
    return this.http.put<Registro>(this.url + "registro/Update/" + registro.id_registro, registro)
  }
}
