import { usuario } from "../rolesTS/usuario";
import { kit } from "./Kit";

export class ModuloLibro {
    id_modulo_libro: number = 0;
    cantidad: number = 0;
    cod_modulo: number = 0;
    curso: String = '';
    nombre_modulo: String = '';
    numero: number = 0;
    id_kit: kit = new kit;
}