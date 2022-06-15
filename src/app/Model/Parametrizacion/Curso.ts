import { empleado } from "../rolesTS/empleado";
import { Paralelo } from './Paralelo';

export class Curso {
    
    id_curso: number = 0;

    descripcion: string = "";

    tipo_curso: string = "";

    fecha_creacion?: Date ;

    id_paralelo: Paralelo= new Paralelo()
    id_empleado: empleado = new empleado();
}