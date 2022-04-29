import { Injectable } from '@angular/core';
import { Api } from '../../config'
@Injectable({
  providedIn: 'root'
})
export class ServiceUsuarioService {

  constructor() { }

  dato: Boolean = false;

  private url = Api.url;
  
  authActivate() {
    return new Promise(resolve => {
      resolve(this.dato);
    })
  }


  
}
