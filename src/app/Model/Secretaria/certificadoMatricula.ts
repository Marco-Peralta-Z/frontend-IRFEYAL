import { Estudiante } from "../Matriculas/estudiante";
import { Matricula } from "../Matriculas/matricula";
import { direccion } from "../rolesTS/direccion";
import { empleado } from "../rolesTS/empleado";

export class CertificadoMatricula{
    id_generar_certificado_matricula?: number;
    rectora: string = "";
    fecha: Date= new Date();
    id_empleado: empleado = new empleado();
    id_matricula: Matricula = new Matricula();
    


    
    
}