import { Articulo } from "./Articulo";

export class Inventario {
    id_inventario?:  number;
    codigo?:         string;
    cantidad?:       number;
    fechaingreso?:   Date;
    disponibilidad?: number;
    ingresadoPor?:   string;
    articulo?:       Articulo;
}







