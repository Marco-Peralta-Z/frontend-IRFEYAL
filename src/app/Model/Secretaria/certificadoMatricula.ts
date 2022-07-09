import { Matricula } from "../Matriculas/matricula";
import { empleado } from "../rolesTS/empleado";

export class CertificadoMatricula{
    id_generar_certificado_matricula?: number;
    rectora?:                          string;
    fecha?:                            Date;
    id_empleado?:                      empleado;
    matricula?:                        Matricula;
}

