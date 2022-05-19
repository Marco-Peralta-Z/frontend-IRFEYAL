import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceTutoriasService {

  constructor() { }

  muestramensaje(mensaje:string){
    alert(mensaje);

  }

}
