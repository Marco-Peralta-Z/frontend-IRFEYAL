import { Asignatura } from "../Parametrizacion/Asignatura";
import { Periodo } from "../Parametrizacion/Periodo";

export class registro {
    id_registro!: number;

    aporte1!: number;
    aporte2!: number;
    aporte3!: number;
    aporte4!: number;
    evaluacion1!: number;
    aporte5!: number;
    aporte6!: number;
    aporte7!: number;
    aporte8!: number;
    evaluacion2!: number;
    examenfinal!: number;
    promediofinal!: number;
    examen_supletorio!: number;
    promedio_supletorio!: number;
    examen_remedial!: number;
    promedio_remedial!: number;
    examen_gracia!: number;
    promedio_gracia!: number;
    comportamiento!: number;
    id_perdido!: Periodo;
    id_asignatura!: Asignatura;
}