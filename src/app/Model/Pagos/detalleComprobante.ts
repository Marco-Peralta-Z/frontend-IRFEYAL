import { Comprobante } from "../Pagos/comprobante";

export class DetalleComprobante{
    idDetalleComprobante!: number;
    valor: number = 0;
    detalle: string = "";
    idComprobante: Comprobante = new Comprobante();
}