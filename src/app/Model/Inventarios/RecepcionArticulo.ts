import { DetalIngreArti } from "./DetalIngreArti";

export class RecepcionArticulo {
    id_recepcion_art: number = 0;
    codigo: String = '';
    detallerecep: String = '';
    fecha?: Date;
    id_det_ingre_art: DetalIngreArti = new DetalIngreArti;
}