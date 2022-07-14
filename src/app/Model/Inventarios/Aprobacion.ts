
import { empleado } from "../rolesTS/empleado";
import { Estudiante } from '../Matriculas/estudiante';
import { Kit } from './Kit';
import { EstudiantePago } from "./EstudiantePago";
export class Aprobacion {
    id_aprobacion?:   number;
    tipoAprobacion?:  string;
    estadoAproba?:    boolean;
    detalleControl?:  string;
    fechaAprobacion?: Date;
    administrador?:   empleado;
    estudiante?:      Estudiante;
    kit?:             Kit;
    estudiantePago?: EstudiantePago;
}