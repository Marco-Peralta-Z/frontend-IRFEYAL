import { Malla } from "./Malla";

export class Periodo {

    id_periodo ?: Number;

    actividades: String = "";

    fecha_activiti: Date = new Date;

    fecha_creacionDate = new Date;

    fecha_inicio: Date = new Date;

    fecha_fin: Date = new Date;

    costo_mensualidad: Number = 0;

    costo_matricula: Number = 0;

    malla: Malla = new Malla;
}