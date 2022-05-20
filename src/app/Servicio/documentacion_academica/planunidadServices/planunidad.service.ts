import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanunidadService {
  private API_SERVER = "http://localhost:8080/planunidades/";

  constructor(
    private httpClient: HttpClient
  ) { }

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

  public getAllParalelo(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "paralelos");
  }
}