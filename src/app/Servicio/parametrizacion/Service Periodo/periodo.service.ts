import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Periodo } from 'src/app/Model/Parametrizacion/Periodo';
@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  constructor(private http:HttpClient) { }
  private url=Api.url+"/perdiodo"

  getAllPerdiodo(){
    return this.http.get<Periodo[]>(this.url+"/views")
  }
}
