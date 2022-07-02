import { Asignatura } from "../Parametrizacion/Asignatura";
import { Curso } from "../Parametrizacion/Curso";
import { Modalidad } from "../Parametrizacion/Modalidad";
import { Paralelo } from "../Parametrizacion/Paralelo";
import { Periodo } from "../Parametrizacion/Periodo";
import { empleado } from "../rolesTS/empleado";



export class Clase {
  idClase: number = 0;
  fecClase: Date = new Date(0);
  id_modalidad: Modalidad = new Modalidad;
  id_periodo: Periodo = new Periodo;
  idDocente: empleado = new empleado;
  idAsignatura: Asignatura = new Asignatura;
  idParalelo: Paralelo = new Paralelo;
  idCurso: Curso = new Curso;
}
