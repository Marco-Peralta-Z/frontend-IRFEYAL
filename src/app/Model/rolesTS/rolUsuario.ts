import { modulo } from "./modulo";
import { rol } from "./rol";
import { usuario } from "./usuario";

export class rolUsuario {

    id_rol_usuario?: number = 0;

    estado: boolean = true;

    rol: rol = new rol;

    usuario: usuario = new usuario;

    id_modulo?:modulo;
}

export interface RespRolUsuario{
    rolUsuario: rolUsuario;
    mensaje : string;

}