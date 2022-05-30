import { Periodo } from '../Parametrizacion/Periodo';
import { Modulo } from './ModuloLibro';
export class Kit {
    id_kit?:       number;
    nombrekit?:    null;
    precioKit?:    number;
    listaModulos?: Modulo[];
    periodos?: Periodo[];
}


