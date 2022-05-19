import { Aprobacion } from "./Aprobacion";

export class SalidaArticulo {
    id_salida_art: number = 0;
    codigo: String = '';
    detallesalida: String = '';
    fecha_salida?: Date;
    id_aprobacion: Aprobacion = new Aprobacion;
}