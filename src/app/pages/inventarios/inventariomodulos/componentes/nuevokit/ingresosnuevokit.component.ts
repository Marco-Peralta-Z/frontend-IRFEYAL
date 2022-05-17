import { Component, OnInit, Input } from '@angular/core';
import { Ingresokit } from 'src/app/Model/Inventarios/Ingresokit';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'add-ingresosNuevokit',
    templateUrl: './ingresonuevokit.component.html',
    providers:[MessageService]
})
export class NuevoKitComponent implements OnInit {

    nuevoKit: Ingresokit = new Ingresokit();

    periodosLista: any[];
    selectPeriodo: any;

    kitFormulario: FormGroup = this.fb.group({
        nombreKit: [, [Validators.required, Validators.minLength(3)]],
        precioKit: [, [Validators.required, Validators.minLength(3)]],
        periodo: [, [Validators.required, Validators.minLength(10)]],
    })



    constructor(private fb: FormBuilder, private messageService: MessageService) {
        this.periodosLista = [
            {
                name: '2022-2023',
                code: '2022-2023',
            },
            {
                name: '2023-2024',
                code: '2023-2024',
            },
            {
                name: '2024-2025',
                code: '2024-2025',
            },
            {
                name: '2025-2026',
                code: '2025-2026',
            },
            {
                name: '2026-2027',
                code: '2026-2027',
            },
            {
                name: '2027-2028',
                code: '2027-2028',
            },
            {
                name: '2028-2028',
                code: '2028-2028',
            },
            {
                name: '2030-2030',
                code: '2030-2030',
            },


        ];
    }

    campoValido(valor: string): boolean {
        return this.kitFormulario.controls[valor].errors!
            && this.kitFormulario.controls[valor].touched
    }



    guardarKit() {
        if (this.validarTxt() == true) {

        }

    }
    validarTxt(): boolean {

        return true;
    }


    ngOnInit(): void {

    }
}