import { Asignatura } from "../Parametrizacion/Asignatura";
import { Curso } from "../Parametrizacion/Curso";
import { Modalidad } from "../Parametrizacion/Modalidad";
import { Paralelo } from "../Parametrizacion/Paralelo";
import { Periodo } from "../Parametrizacion/Periodo";



export class Clase{
  idClase:number=0;
    fecClase:Date=new Date(0);
    id_modalidad:Modalidad=new Modalidad;
    id_periodo:Periodo= new Periodo;
    idDocente:number=1;
    idAsignatura:Asignatura= new Asignatura;
    idParalelo:Paralelo=new Paralelo;
    idCurso:number=0;
}
