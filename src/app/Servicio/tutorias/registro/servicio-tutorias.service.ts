import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Asignatura } from 'src/app/Model/Parametrizacion/Asignatura';
import { Curso } from 'src/app/Model/Parametrizacion/Curso';
import { Malla } from 'src/app/Model/Parametrizacion/Malla';
import { Modalidad } from 'src/app/Model/Parametrizacion/Modalidad';
import { Paralelo } from 'src/app/Model/Parametrizacion/Paralelo';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
import { Registro } from 'src/app/Model/tutorias/registro';

@Injectable({
  providedIn: 'root'
})
export class ServiceTutoriasService {

  constructor(private http: HttpClient) { }
  private url = Api.url

  //metodo para obtener las mallas segun el empleado logeado en el sistema.
  getPeriodos(id_empleado: any) {
    return this.http.get<Periodo[]>(this.url + "registro/Periodos/" + id_empleado)
  }

  //metodo para obtener las mallas segun el empleado y periodo seleccionado.
  getMallas(id_empleado: any, periodo: Periodo) {
    return this.http.get<Malla[]>(this.url + "registro/Malla/" + id_empleado + "/" + periodo.id_periodo)
  }

  //metodo para obtener las modalidades segun el empleado, periodo y malla seleccionado.
  getModalidades(id_empleado: any, periodo: Periodo, malla: Malla) {
    return this.http.get<Modalidad[]>(this.url + "registro/Modalidades/" + id_empleado + "/" + periodo.id_periodo + "/" + malla.id_malla)
  }

  //metodo para obtener los cursos segun el empleado, periodo, malla y modalidad seleccionado.
  getCursos(id_empleado: any, periodo: Periodo, malla: Malla, modalidad: Modalidad,) {
    return this.http.get<Curso[]>(this.url + "registro/Cursos/" + id_empleado + "/" + periodo.id_periodo + "/" + malla.id_malla + "/" + modalidad.id_modalidad)
  }

  //metodo para obtener los paralelos segun el empleado, periodo, malla, modalidad y curso seleccionado.
  getParalelos(id_empleado: any, periodo: Periodo, malla: Malla, modalidad: Modalidad, curso: Curso) {
    return this.http.get<Paralelo[]>(this.url + "registro/Paralelos/" + id_empleado + "/" + periodo.id_periodo + "/" + malla.id_malla + "/" + modalidad.id_modalidad + "/" + curso.id_curso)
  }

  //metodo para obtener las asignaturas segun el empleado, periodo, malla, modalidad, curso y paralelo seleccionado.
  getAsignaturas(id_empleado: any, periodo: Periodo, malla: Malla, modalidad: Modalidad, curso: Curso, paralelo: Paralelo) {
    return this.http.get<Asignatura[]>(this.url + "registro/Asignaturas/" + id_empleado + "/" + periodo.id_periodo + "/" + malla.id_malla + "/" + modalidad.id_modalidad + "/" + curso.id_curso + "/" + paralelo.id_paralelo)
  }

  //metodo para obtener un registro segun los filtros seleccionados.
  getRegistros(id_empleado: any, periodo: Periodo, malla: Malla, modalidad: Modalidad, curso: Curso, paralelo: Paralelo, asignatura: Asignatura) {
    return this.http.get<Registro[]>(this.url + "registro/Filtrocompleto/" + id_empleado + "/" + periodo.id_periodo + "/" + malla.id_malla + "/" + modalidad.id_modalidad + "/" + curso.id_curso + "/" + paralelo.id_paralelo + "/" + asignatura.id_asignatura)
  }

  //metodo para actualizar un registro segun los campos asignados.
  setRegistros(registro: Registro) {
    return this.http.put<Registro>(this.url + "registro/Update/" + registro.id_registro, registro)
  }

  //metodo para realizar pdf.
  getPDF(periodo: Periodo, malla: Malla, modalidad: Modalidad, curso: Curso, paralelo: Paralelo, asignatura: Asignatura) {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get(this.url + "registro/exportInvoice/" + periodo.id_periodo + "/" + malla.id_malla + "/" + modalidad.id_modalidad + "/" + curso.id_curso + "/" + paralelo.id_paralelo + "/" + asignatura.id_asignatura, httpOptions);
  }

  //metodo para buscar estudiante por cedula del modulo de secertaria
  getCedulaPorEstudiante(cedula: string) {
    return this.http.get<Registro[]>(`${this.url}registro/buscarcedulaEstudiante/${cedula}`);
  }
}
