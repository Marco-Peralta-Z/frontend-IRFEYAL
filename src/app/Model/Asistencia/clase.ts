import { Asignatura } from "../Parametrizacion/Asignatura";
import { Modalidad } from "../Parametrizacion/Modalidad";
import { Paralelo } from "../Parametrizacion/Paralelo";
import { Periodo } from "../Parametrizacion/Periodo";
import { empleado } from "../rolesTS/empleado";


export class Clase{
  idClase:number=0;
  fecClase:Date=new Date(0);
  id_modalidad:Modalidad= new Modalidad;
  id_periodo:Periodo=new Periodo;
  id_paralelo:Paralelo=new Paralelo;
  id_asignatura:Asignatura=new Asignatura;
  id_docente: empleado = new empleado;


}
