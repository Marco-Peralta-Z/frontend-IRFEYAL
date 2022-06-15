import { empleado } from './empleado';
export class usuario {

    id_usuario: number = 0;

    contrasenia: string = "";

    estUsuario?: boolean;
    
    usuario?: string;

    roles: string [] = [];

    empleado?: empleado ;
}