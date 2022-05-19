import { empleado } from "../rolesTS/empleado";

export class Curso {
    
    id_curso: number = 0;

    descripcion: string = "";

    tipo_curso: string = "";

    fec_creacion: Date = new Date;

    id_empleado: empleado = new empleado;
}