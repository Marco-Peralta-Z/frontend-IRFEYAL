import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Api } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class PlanunidadService {
  private API_SERVER = Api.url + "planunidades/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getUsuario(id_usuario: number): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "usuario/" + id_usuario);
  }

  public getAllPlanUnidades(): Observable<any> {
    return this.httpClient.get(this.API_SERVER);
  }

  public getAllPlanUnidadesPendientes(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "Pendiente");
  }

  public getAllPlanUnidadesAprobados(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "Aprobado");
  }

  public getAllPlanUnidadesRechazados(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "Rechazado");
  }

  public savePlanUnidad(planunidad: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER, planunidad);
  }

  public deletePlanUnidad(id: any): Observable<any> {
    return this.httpClient.delete(this.API_SERVER + "delete/" + id);
  }

  public updatePlanUnidad(id: any, planunidad: any): Observable<any> {
    return this.httpClient.put(this.API_SERVER + "update/" + id, planunidad);
  }

  public getAllPlanUnidadesByEmpleado(id: number, estado: String): Observable<any> {
    return this.httpClient.get(this.API_SERVER + estado + "/empleado/" + id);
  }

  public verificarPlanUnidad(id_unidad: number, id_asignatura: number, id_modalidad: number, id_curso: number): Observable<any> {
    return this.httpClient.get(this.API_SERVER + id_unidad + "/" + id_asignatura + "/" + id_modalidad + "/" + id_curso);
  }

  //Consumido de parametrizacion

  public getAllModalidad(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "modalidades");
  }

  public getAllPeriodo(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "periodos");
  }

  public getAllAsignaturasMalla(idMalla: any): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "asignaturas/" + idMalla);
  }

  public getAllCurso(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "cursos");
  }
}
