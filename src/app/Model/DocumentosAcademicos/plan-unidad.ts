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
    objetivos: string = "";
    contenidos: string = "";
    criterios_evaluacion: string = "";
    destrezas: string = "";
    fecha_inicio?: Date;
    fecha_fin?: Date;
    estado: string = "";
    unidad: Unidad = new Unidad();
    empleado: empleado = new empleado();
    asignatura: Asignatura = new Asignatura();
    curso: Curso = new Curso();
    paralelo: Paralelo = new Paralelo();
    modalidad: Modalidad = new Modalidad();
    periodo: Periodo = new Periodo();
}

