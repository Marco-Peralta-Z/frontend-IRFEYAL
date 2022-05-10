import { InventariosModule } from "src/app/Routing/inventarios/inventarios.module";
import { Inventario } from "./Inventario";

export class DetallebajaArti{
    id_det_baja_art:number=0;
    cantidad:number=0;
    codigo:String ='';
    fecha_baja?:Date;
    motivo:String='';
    id_inventario:Inventario=new Inventario;
}