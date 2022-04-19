import { direccion } from "./direccion";
import { empresa } from "./empresa";

export class extension {

    id_extension: number = 0;

    nombre_extension: string = "";

    direccion: direccion = new direccion;

    empresa: empresa = new empresa;
}