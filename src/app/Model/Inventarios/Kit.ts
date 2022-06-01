import { Periodo } from '../Parametrizacion/Periodo';
import { Modulo } from './ModuloLibro';
export class Kit {
    id_kit?:       number;
    nombrekit?:    string;
    precioKit?:    number;
    listaModulos?: Modulo[];
    periodo?: Periodo;
}


