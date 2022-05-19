import { canton } from "./canton";
import { pais } from "./pais";
import { parroquia } from "./parroquia";
import { provincia } from "./provincia";

export class direccion{
    id_direccion:number=0;

	avPrincipal:string="";

	avSecundaria:string="";

    canton:canton=new canton;

    pais:pais=new pais;

    parroquia:parroquia=new parroquia;
    
    provincia:provincia=new provincia;
    
}