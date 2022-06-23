import { Inventario } from './Inventario';
import { empleado } from '../rolesTS/empleado';

export class SalidaArticulo {
    id_salida_art?: number = 0;
    fechaSalida?:   Date;
    codigo?:        string;
    detallesalida?: string;
    inventario?:    Inventario;
    empleado?:      empleado;
}