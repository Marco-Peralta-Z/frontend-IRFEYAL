import { Curso } from './Curso';
import { Modalidad } from '../tutorias/registro';
export class Malla {

    id_malla?: number;

    estado?: boolean;

    descripcion?: string;

    fecha_creacion?:Date;
    listaCursos?: Curso;
    id_modalidad?: Modalidad;
}