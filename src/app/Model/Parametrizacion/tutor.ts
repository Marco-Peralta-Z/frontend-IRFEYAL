import { empleado } from "../rolesTS/empleado";
import { Curso } from "./Curso";
import { Paralelo } from "./Paralelo";

export class tutor{
    
    id_tutor!:Number;

    id_curso!:Curso;

    id_empleado!:empleado;

    id_paralelo!:Paralelo;
}