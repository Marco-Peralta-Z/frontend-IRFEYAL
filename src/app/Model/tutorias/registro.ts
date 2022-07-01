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
    examen_supletorio: Number = 0;
    examen_remedial: Number = 0;
    examen_gracia: Number = 0;
    nota_final: Number = 0;
    matricula: Matricula = new Matricula;
    asignatura: Asignatura = new Asignatura;
    estado: String = "";
}