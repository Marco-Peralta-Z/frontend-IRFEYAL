import { Kit } from "../Inventarios/Kit";
import { Periodo } from "../Parametrizacion/Periodo";
import { ConceptoPago } from './conceptoPago';

export class TipoComprobante{
    idTipoComprobante?: number;
    id_conceptoPago?: ConceptoPago = new ConceptoPago();
    id_periodo: Periodo = new Periodo();
    id_kit?: Kit = new Kit();
}