import {  Categoria } from './categorias';
import { ControlArticulo } from './control_articulo';
export class Articulo {
    id_articulo?:     number;
    artinombre?:      string;
    articodigo?:      string;
    artiprecio?:      number;
    artidescrip?:     string;
    artiestado?:      string;
    artimarca?:       string;
    cateId?:          Categoria;
    controlArticulo?: ControlArticulo;
}
