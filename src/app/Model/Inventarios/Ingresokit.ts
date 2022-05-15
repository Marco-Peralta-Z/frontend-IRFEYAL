import { empleado } from "../rolesTS/empleado";
import { kit } from "./Kit";
import { Aprobacion } from "./Aprobacion";

export class Ingresokit {
    id_ingreso_kit: number = 0;
    fecha_ingreso?: Date;
    nombrekit: string = "";
    id_aprobacion: Aprobacion = new Aprobacion;
    id_kit: kit = new kit;
    id_secretaria: empleado = new empleado;
}
