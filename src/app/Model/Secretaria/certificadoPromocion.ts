import { Curso } from "../Parametrizacion/Curso";
import { empleado } from "../rolesTS/empleado";
import { Registro } from "../tutorias/registro";


export class CertificadoPromocion{

    id_generar_certificado_promocion?:number;
    promedio_general_num?: number;
    promedio_general_let: string = "";
    descripcion: string = "";
    fecha: Date = new Date();
    rectora: string = "";
    id_empleado: empleado = new empleado();
    id_registro: Registro = new Registro();
    id_curso: Curso = new Curso();
}

export interface CertificadoTablaPromocion {
    asignatura?: string;
    numero?: string;
    letras?: string;
}