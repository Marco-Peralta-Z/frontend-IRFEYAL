import { categorias } from "./categorias";
import { DetalIngreArti } from "./DetalIngreArti";
export class Articulo {
    id_articulo: number = 0;
    articodigo: String = '';
    artiestado: String = '';
    artimarca: String = '';
    artinombre: String = '';
    artiprecio: number = 0;
    id_categoria: categorias = new categorias;
    id_det_ingre_art: DetalIngreArti = new DetalIngreArti;
}