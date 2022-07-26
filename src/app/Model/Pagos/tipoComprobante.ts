import { Kit } from "../Inventarios/Kit";
import { Periodo } from "../Parametrizacion/Periodo";

export class TipoComprobante{
    idTipoComprobante?: number;
    concepto_pago: string = "";
    id_periodo: Periodo = new Periodo();
    id_kit: Kit = new Kit();
}