import { Estudiante } from '../Matriculas/estudiante';
import { Periodo } from '../Parametrizacion/Periodo';
import { Kit } from './Kit';
export class EstudiantePago {
    idEstudiante?: number;
    conceptoPago?:  string;
    valorPagado?:   number;
    estudiante?:    Estudiante;
    idKit?:         number;
    kit?: Kit;
}