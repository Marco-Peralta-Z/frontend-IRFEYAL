import { Curso } from './Curso';
export class Malla {

    id_malla?: number;

    estado?: boolean;

    descripcion?: string;

    fecha_creacion?:Date;
    listaCursos?: Curso;
}