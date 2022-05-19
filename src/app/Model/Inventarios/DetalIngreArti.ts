import { Aprobacion } from "./Aprobacion";

export class DetalIngreArti {
    id_det_ingre_art: number = 0;
    cantidad: number = 0;
    fechaingreso?: Date;
    id_aprobacion: Aprobacion = new Aprobacion;
    observacion: String = '';
    tipo_ingreso: String = '';

}