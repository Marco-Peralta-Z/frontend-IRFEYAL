import { genero } from "./genero";

export class persona {

  id_persona?: number ;

  apellido: string = "";

  cedula: string = "";

  fechaNacimiento: Date= new Date();

  nombre: string = "";

  genero: genero = new genero;

}