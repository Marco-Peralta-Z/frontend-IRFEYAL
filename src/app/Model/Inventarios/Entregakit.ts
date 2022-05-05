import { Aprobacion } from "./Aprobacion";
import { kit } from "./Kit";

export class Entregakit {
    id_entrega_kit: number = 0;
    fecha_entrega_kit?: Date;
    id_aprobacion: Aprobacion = new Aprobacion;
    //id_estudiante:Estudiante=new Estudiante;
    id_kit: kit = new kit;

}