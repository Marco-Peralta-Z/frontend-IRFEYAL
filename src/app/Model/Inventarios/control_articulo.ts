import { empleado } from '../rolesTS/empleado';
export class ControlArticulo {
    id_control_articulo?: number;
    fechaingreso?:        Date;
    cantidad?:            number;
    observacion?:         string;
    administrador?:       empleado;
}