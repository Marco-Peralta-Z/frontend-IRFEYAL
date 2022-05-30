
import { empleado } from "../rolesTS/empleado";
import { Estudiante } from '../Matriculas/estudiante';
import { Kit } from './Kit';
export class Aprobacion {
    id_aprobacion?:   number;
    tipoAprobacion?:  string;
    estadoAproba?:    boolean;
    detalleControl?:  string;
    fechaAprobacion?: Date;
    administrador?:   empleado;
    estudiante?:      Estudiante;
    kit?:             Kit;
}