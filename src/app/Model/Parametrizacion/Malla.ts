import { empleado } from "../rolesTS/empleado";
import { Area } from "./Area";
import { Asignatura } from "./Asignatura";
import { Curso } from "./Curso";
import { Modalidad } from "./Modalidad";
import { Paralelo } from "./Paralelo";

export class Malla {

    id_malla!: any;

    estado!: Boolean;

    descripcion!: String;

    fecha_creacion!: Date;

    listaAsignaturas !: Asignatura[];

    listaCursos!: Curso[];

    id_modalidad!: Modalidad;

    listarea!:Area[];

}