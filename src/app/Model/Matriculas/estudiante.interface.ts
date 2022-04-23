import { extension } from "../rolesTS/extension";
import { persona } from '../rolesTS/persona';
import { correoElectronico } from '../rolesTS/correoElectronico';
import { direccion } from '../rolesTS/direccion';
import { canton } from '../rolesTS/canton';
import { pais } from '../rolesTS/pais';
import { parroquia } from '../rolesTS/parroquia';
import { provincia } from '../rolesTS/provincia';
import { telefono } from '../rolesTS/telefono';

export interface Estudiante{
    id_estudiante?: number;
    estadoEstudiante: true;
    id_extension: extension;
    id_persona: persona;
    correo: correoElectronico;
    direccion:direccion;
    canton:canton;
    pais: pais;
    parroquia:parroquia;
    provincia: provincia;
    telefono: telefono;
}