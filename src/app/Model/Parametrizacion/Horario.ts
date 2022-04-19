import { empleado } from "../rolesTS/empleado";
import { Asignatura } from "./Asignatura";

export class Horario {
    
    id_horario: Number = 0;

    tiempo_inicio: String = "";

    tiempo_fin: String = "";

    dia: Number = 0;

    fecha_creacion: Date = new Date;

    id_asignatura: Asignatura = new Asignatura;

    id_empleado: empleado = new empleado;
}