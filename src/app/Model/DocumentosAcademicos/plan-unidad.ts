import { Unidad } from './unidad';
import { empleado } from "../rolesTS/empleado";
import { Asignatura } from "../Parametrizacion/Asignatura";
import { Curso } from "../Parametrizacion/Curso";
import { Paralelo } from "../Parametrizacion/Paralelo";
import { Modalidad } from "../Parametrizacion/Modalidad";
import { Periodo } from "../Parametrizacion/Periodo";

export class PlanUnidad {
    id_plan_unidad: number = 0;
    titulo_unidad: string = "";
    fecha_creacion?: Date;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    num_periodos: number = 0;
    objetivos: string = "";
    criterios_evaluacion: string = "";
    destrezas: string = "";
    act_experiencia: string = "";
    act_reflexion: string = "";
    act_conceptualizacion: string = "";
    act_aplicacion: string = "";
    recursos: string = "";
    indicadores: string = "";
    tecnicas: string = "";
    adaptaciones_curriculares: string = "";
    adap_necesidad_educativa: string = "";
    especificacion_nesesidad: string = "";
    estado: string = "";
    observaciones: string = "";
    coor_academico: string = "";
    fecha_revision?: Date;
    unidad: Unidad = new Unidad();
    empleado: empleado = new empleado();
    asignatura: Asignatura = new Asignatura();
    curso: Curso = new Curso();
    paralelo: Paralelo = new Paralelo();
    modalidad: Modalidad = new Modalidad();
    periodo: Periodo = new Periodo();
}


