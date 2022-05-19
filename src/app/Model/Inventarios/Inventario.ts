import { Articulo } from "./Articulo";

export class Inventario {
    id_inventario: number = 0;
    cantidad: number = 0;
    codigo: String = '';
    disponibilidad: number = 0;
    fechaegreso?: Date;
    fechaingres?: Date;
    ingresado_por: String = '';
    id_Articulo: Articulo = new Articulo;
}