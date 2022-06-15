import { TipoComprobante } from './tipoComprobante';
import { Matricula } from "../Matriculas/matricula";
import { empleado } from "../rolesTS/empleado";
import { TipoPago } from './tipoPago';

export class Comprobante {
    idComprobante?: number;
    fecha: Date= new Date;
    imagen: string = "";
    valor_total: number = 0;
    estado: boolean = false;
    idMatricula: Matricula = new Matricula();
    id_empleado: empleado = new empleado();
    idTipoComprobante: TipoComprobante = new TipoComprobante();
    id_tipo_pago: TipoPago = new TipoPago();
}