import { empleado } from "../rolesTS/empleado";

export class Curso {
    
    id_curso: number = 0;

    descripcion: string = "";

    tipo_curso: string = "";

    fecha_creacion?: Date ;

    id_empleado: empleado = new empleado();
}