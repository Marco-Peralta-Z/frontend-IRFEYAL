import { empleado } from "../rolesTS/empleado";
import { Horario } from "./Horario";
import { Malla } from "./Malla";

export class Asignatura {
	id_asignatura: Number = 0;

	descripcion: String = "";

	fecha_creacion: Date = new Date();

	empleados: empleado[] = [];

	mallas: Malla[] = [];

	horarios: Horario[] = [];
} 