import { Periodo } from "../Parametrizacion/Periodo";
import { Curso } from '../Parametrizacion/Curso';
import { Modalidad } from '../Parametrizacion/Modalidad';
import { usuario } from "../rolesTS/usuario";
import { Paralelo } from '../Parametrizacion/Paralelo';
import { Estudiante } from './estudiante.interface';


export interface Matricula{
    id_matricula?:number;
    fechaMatricula?:string;
    id_periodo: Periodo;
    curso: Curso;
    modalidad:Modalidad;
    usuario: usuario;
    id_paralelo:Paralelo;
    estudiante: Estudiante
}
