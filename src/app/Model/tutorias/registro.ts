import { Matricula } from "../Matriculas/matricula";
import { Asignatura } from "../Parametrizacion/Asignatura";

export class Registro {
    id_registro: Number = 0;
    aporte1: Number = 0;
    aporte2: Number = 0;
    examen_Iquimestre: Number = 0;
    promedio_Iquimestre: Number = 0;
    aporte3: Number = 0;
    aporte4: Number = 0;
    examen_IIquimestre: Number = 0;
    promedio_IIquimestre: Number = 0;
    conducta: Number = 0;
    examen_supletorio: Number = 0;
    examen_remedial: Number = 0;
    examen_gracia: Number = 0;
    nota_final: Number = 0;
    promedio_final: Number = 0;
    id_matricula: Matricula = new Matricula;
    id_asignatura: Asignatura = new Asignatura;
    asignatura?: string;
    estado: String = "";
}

export interface Notas { 
    ord?: number, 
    nombre?: string, 
    cedula?:string,  
    materias?: string[], 
    notasQ1?: number[], 
    notasQ2?: number[],
    notasPQ?: number[],
    notasEG?: number[],
    notasPF?: number[],
    conductas?: number[]
}