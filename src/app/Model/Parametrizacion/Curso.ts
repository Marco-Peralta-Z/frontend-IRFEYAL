import { empleado } from "../rolesTS/empleado";
import { Paralelo } from "./Paralelo";

export class Curso {
    
    id_curso: Number = 0;

    descripcion: String = "";

    tipo_curso: String = "";

    fec_creacion: Date = new Date;

    id_empleado: empleado = new empleado;

    paralelo:Paralelo[]=[];
}