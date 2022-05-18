import { Asignatura } from "./Asignatura";

export class Malla {

    id_malla ?: number;

    estado: Boolean = new Boolean;

    descripcion: String = "";

    fecha_creacion: Date = new Date;

    asignatura!: Asignatura[];
}