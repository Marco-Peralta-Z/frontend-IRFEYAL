import { correoElectronico } from "./correoElectronico";
import { direccion } from "./direccion";
import { extension } from "./extension";
import { persona } from "./persona";
import { telefono } from "./telefono";
import { usuario } from "./usuario";

export class empleado {

    id_empleado: number = 0;

    cargo: string = "";

    extension: extension = new extension;

    direccion: direccion = new direccion;

    telefono: telefono = new telefono;

    usuario: usuario = new usuario;

    CorreoElectronico: correoElectronico = new correoElectronico;

    persona: persona = new persona;

}