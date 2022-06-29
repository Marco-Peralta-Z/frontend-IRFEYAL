import { empleado } from "../rolesTS/empleado";
import { Asignatura } from "./Asignatura";
import { tutor } from "./tutor";

export class Horario {

    id_horario: Number = 0;

    tiempo_inicio!: String;

    tiempo_fin!: String;

    dia!: Number;

    fecha_creacion!: Date;

    id_asignatura!: Asignatura;

    id_empleado!: empleado;

    id_tutor!: tutor;

}