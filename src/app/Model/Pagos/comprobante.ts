import { TipoComprobante } from './tipoComprobante';
import { Matricula } from "../Matriculas/matricula";
import { empleado } from "../rolesTS/empleado";
import { TipoPago } from './tipoPago';

export class Comprobante {
    id?: number;
    fecha: Date= new Date;
    imagen: string = "";
    valor_total: number = 0;
    saldo: number = 0;
    estado: boolean = false;
    idMatricula: Matricula = new Matricula();
    empleado: empleado = new empleado();
    tipoComprobante: TipoComprobante = new TipoComprobante();
    tipoPago: TipoPago = new TipoPago();
}

export interface StatusComprobante {
    status?:    string;
    comprobante?: any;
}