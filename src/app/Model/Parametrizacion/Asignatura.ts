import { empleado } from "../rolesTS/empleado";

export class Asignatura {
	
	id_asignatura!: Number;

	descripcion!: String;

	fecha_creacion!: Date;

	empleados!: empleado[];

} 