import { empleado } from "../rolesTS/empleado";
import { Asignatura } from "./Asignatura";

export class Asignatura_Empleado {

    id_asignatura_empleado: Number = 0;

    id_empleado: empleado = new empleado;

    id_asignatura: Asignatura = new Asignatura;
}