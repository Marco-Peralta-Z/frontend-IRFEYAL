
import { empleado } from "../rolesTS/empleado";

export class Aprobacion {
    id_aprobacion: number=0;
    observacionAproba: string='';
    estadoAproba: boolean=false;
    detalleControl: string='';
    fechaAprobacion: string='';
    fechaControl: string='';
    empleado: empleado= new empleado;
}
