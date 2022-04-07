import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsuarioService {

  constructor() { }
  dato:Boolean=false;
  authActivate(){
    return new Promise(resolve=>{
      resolve(this.dato);
    })
  }
}
