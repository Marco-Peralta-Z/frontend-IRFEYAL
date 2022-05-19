import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from 'src/app/config';
import { Malla } from 'src/app/Model/Parametrizacion/Malla';

@Injectable({
  providedIn: 'root'
})
export class MallaService {

  constructor(private http:HttpClient) { }
  private url=Api.url+"malla"
  getAllMalla(){
    return this.http.get<Malla[]>(this.url+"/views")
  }
}
