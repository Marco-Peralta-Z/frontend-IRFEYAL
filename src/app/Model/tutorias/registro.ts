export class id_persona{
    apellido: String="";
    cedula: String="";
    nombre: String=""
}
export class Periodo {
    id_periodo: Number = 0;
    periodo_academico: String = "";
    fecha_inicio: Date = new Date;
    fecha_fin: Date = new Date;
}

export class Modalidad {
    id_modalidad: Number = 0;
    descripcion: String = "";
}

export class Curso {
    id_curso: Number = 0;
    descripcion: String = "";
}

export class Paralelo {
    id_paralelo: Number = 0;
    descripcion: String = "";
}

export class Asignatura {
    id_asignatura: Number = 0;
    descripcion: String = "";
}

export class Estudiante{
    id_estudiante:Number=0;
    id_persona: id_persona = new id_persona;
}

export class id_matricula{
    id_matricula: Number =0;
    estudiante: Estudiante = new Estudiante;
    id_periodo: Periodo = new Periodo;
    modalidad: Modalidad = new Modalidad;
    curso: Curso = new Curso;
    id_paralelo: Paralelo = new Paralelo;
}

export class Registro {
    id_registro: Number = 0;
    aporte1: Number = 0;
    aporte2: Number = 0;
    aporte3: Number = 0;
    aporte4: Number = 0;
    aporte5: Number = 0;
    aporte6: Number = 0;
    aporte7: Number = 0;
    aporte8: Number = 0;
    comportamiento: Number = 0;
    evaluacion1: Number = 0;
    evaluacion2: Number = 0;
    examen_gracia: Number = 0;
    examen_remedial: Number = 0;
    examen_supletorio: Number = 0;
    examenfinal: Number = 0;
    id_asignatura: Asignatura = new Asignatura;
    id_matricula: id_matricula= new id_matricula;
    promedio_gracia: Number = 0;
    promedio_remedial: Number = 0;
    promedio_supletorio: Number = 0;
    promediofinal: Number = 0;
}