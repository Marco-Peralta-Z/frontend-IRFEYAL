import { Component, OnInit, Input } from '@angular/core';
import { Ingresokit } from 'src/app/Model/Inventarios/Ingresokit';

@Component({
    selector: 'add-ingresosNuevokit',
    templateUrl: './ingresonuevokit.component.html',
})
export class NuevoKitComponent implements OnInit {

    nuevoKit: Ingresokit = new Ingresokit();



    validarCampo(value: string): boolean {
        if(value.length > 0) {
            return true;
        }else{
            return false;
        }

    }

  
    ngOnInit(): void {

    }
}