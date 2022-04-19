import { Malla } from "./Malla";

export class Periodo {

    id_periodo: Number = 0;

    actividades: String = "";

    fecha_activiti: Date = new Date;

    fecha_creacionDate = new Date;

    fecha_inicio: Date = new Date;

    fecha_fin: Date = new Date;

    costo_mensualidad: Number = 0;

    costo_matricula: Number = 0;

    id_malla: Malla = new Malla;
}