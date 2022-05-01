import { Periodo } from "../Parametrizacion/Periodo";
import { Curso } from '../Parametrizacion/Curso';
import { Modalidad } from '../Parametrizacion/Modalidad';
import { usuario } from "../rolesTS/usuario";
import { Paralelo } from '../Parametrizacion/Paralelo';
import { Estudiante } from './estudiante';


export class Matricula{
    id_matricula?:number;
    fechaMatricula?:Date;
    id_periodo: Periodo= new Periodo();
    curso: Curso= new Curso();
    modalidad:Modalidad= new Modalidad();
    usuario: usuario= new usuario();
    id_paralelo:Paralelo= new Paralelo();
    estudiante: Estudiante= new Estudiante()
}
