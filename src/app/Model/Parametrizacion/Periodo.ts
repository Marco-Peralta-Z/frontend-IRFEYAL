import { Horario } from "./Horario";
import { Malla } from "./Malla";
import { Modalidad } from "./Modalidad";

export class Periodo {

    id_periodo !: any;

    ano_inicio !: Date;

    ano_fin !: Date;

    fecha_creacionDate = new Date;

    fecha_inicio !: Date;

    fecha_fin!: Date;

    costo_mensualidad!: Number;

    costo_matricula!: Number;

    malla!: Malla;

    modalidad!: Modalidad;

    vigencia!: Boolean;

    listaHorario!: Horario[];
}