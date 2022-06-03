import { empleado } from "../rolesTS/empleado";
import { Documento } from "./documento";

export class Bitacora{
    id_registro_bitacora?: number;
    solicitante: string = "";
    emisor: string = "";
    fecha: Date = new Date;
    hora: string = "";
    estado: string = "";
    id_empleado: empleado = new empleado();
    id_documento: Documento = new Documento();
}