import { Estudiante } from '../Matriculas/estudiante';
import { Periodo } from '../Parametrizacion/Periodo';
import { Kit } from './Kit';
export class EstudiantePago {
    idComprobante?: number;
    conceptoPago?:  string;
    valorPagado?:   number;
    estudiante?:    Estudiante;
    periodo?:       Periodo;
    kit?:           Kit;
}