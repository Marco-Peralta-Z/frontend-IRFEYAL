import { empleado } from "../rolesTS/empleado";
import { Curso } from "./Curso";
import { Paralelo } from "./Paralelo";

export class tutor{
    
    id_tutor!:any;

    id_curso!:Curso;

    id_empleado!:empleado;

    id_paralelo!:Paralelo;
}

export interface RespRegistros {
    status?: string;
    registro?: any;
}