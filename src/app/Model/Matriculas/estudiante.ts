import { extension } from "../rolesTS/extension";
import { persona } from '../rolesTS/persona';
import { correoElectronico } from '../rolesTS/correoElectronico';
import { direccion } from '../rolesTS/direccion';
import { telefono } from '../rolesTS/telefono';

export class Estudiante{
    id_estudiante?: number;
    estadoEstudiante: boolean=true;
    id_extension: extension= new extension();
    id_persona: persona= new persona();
    correo: correoElectronico= new correoElectronico();
    direccion:direccion= new direccion();
    telefono: telefono= new telefono();
}