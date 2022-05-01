import { genero } from "./genero";

export class persona {

  id_persona: number = 0;

  apellido: string = "";

  cedula: String = "";

  fechaNacimiento?: Date;

  nombre: string = "";

  genero: genero = new genero;

}