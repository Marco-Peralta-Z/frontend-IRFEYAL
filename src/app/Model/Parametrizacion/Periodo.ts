import { Malla } from "./Malla";

export class Periodo {

    id_periodo: number = 0;

    periodo_academico: string = "";

    fecha_actividad?: Date;

    fecha_creacion?:Date;

    fecha_inicio?: Date;

    fecha_fin?: Date;

    ano_inicio?:        string;

    ano_fin?:           string;

    vigencia?:          boolean;
    
    costo_mensualidad: number = 0;

    costo_matricula: number = 0;

    id_malla: Malla = new Malla();

}