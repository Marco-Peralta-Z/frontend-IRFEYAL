
export class ConvertirNumerosLetras {
    Unidades(num:number){

        switch(num)
        {
            
            case 1: return 'UNO';
            case 2: return 'DOS';
            case 3: return 'TRES';
            case 4: return 'CUATRO';
            case 5: return 'CINCO';
            case 6: return 'SEIS';
            case 7: return 'SIETE';
            case 8: return 'OCHO';
            case 9: return 'NUEVE';
        }
    
        return '';
    }//Unidades()
    
    Decenas(num: number, tieneCero:boolean){
        if (tieneCero) {
            return 'CERO ' + this.Unidades(num);
        }
        let decena = Math.floor(num/10);
        let unidad = num - (decena * 10);
    
        switch(decena)
        {   
            case 1:
                switch(unidad)
                {
                    case 0: return 'DIEZ';
                    case 1: return 'ONCE';
                    case 2: return 'DOCE';
                    case 3: return 'TRECE';
                    case 4: return 'CATORCE';
                    case 5: return 'QUINCE';
                    default: return 'DIECI' + this.Unidades(unidad);
                }
            case 2:
                switch(unidad)
                {
                    case 0: return 'VEINTE';
                    default: return 'VEINTI' + this.Unidades(unidad);
                }
            case 3: return this.DecenasY('TREINTA', unidad);
            case 4: return this.DecenasY('CUARENTA', unidad);
            case 5: return this.DecenasY('CINCUENTA', unidad);
            case 6: return this.DecenasY('SESENTA', unidad);
            case 7: return this.DecenasY('SETENTA', unidad);
            case 8: return this.DecenasY('OCHENTA', unidad);
            case 9: return this.DecenasY('NOVENTA', unidad);
            case 0: return this.Unidades(unidad);
        }
        return '';
    }//Unidades()
    
    DecenasY(strSin: string, numUnidades: number) {
        if (numUnidades > 0)
        return strSin + ' Y ' + this.Unidades(numUnidades)
    
        return strSin;
    }//DecenasY()
}