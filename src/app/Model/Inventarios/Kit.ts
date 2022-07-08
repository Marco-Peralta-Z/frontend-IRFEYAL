import { Curso } from '../Parametrizacion/Curso';
import { Periodo } from '../Parametrizacion/Periodo';
import { Modulo } from './ModuloLibro';
export class Kit {
    id_kit?:       number;
    nombrekit?:    string;
    precioKit?:    number;
    listaModulos?: Modulo[];
    curso?: Curso;
    periodo?: Periodo;
}


