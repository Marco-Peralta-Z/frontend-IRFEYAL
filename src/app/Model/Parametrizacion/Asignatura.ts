import { empleado } from "../rolesTS/empleado";
import { Horario } from "./Horario";
import { Malla } from "./Malla";

export class Asignatura {
	id_asignatura?: Number;

	descripcion!: String ;

	fecha_creacion!: Date ;

	empleados!: empleado[];

	//mallas: Malla[] = [];

	//horarios: Horario[] = [];
} 