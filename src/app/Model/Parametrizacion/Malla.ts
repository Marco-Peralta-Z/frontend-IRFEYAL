import { Asignatura } from "./Asignatura";
import { Curso } from "./Curso";

export class Malla {

    id_malla !: number;

    estado: Boolean = new Boolean;

    descripcion: String = "";

    fecha_creacion: Date = new Date;

    asignaturas: Asignatura[] = new Array;

    listaCursos: Curso[] = [];
}