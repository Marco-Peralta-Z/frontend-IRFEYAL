/*
import { Component, OnInit, Input } from '@angular/core';
import { Aprobacion } from 'src/app/Model/Inventarios/Aprobacion';
import { AprobacionService } from 'src/app/Servicio/modulo_invetario/AprobacionService';

@Component({
    selector: 'tabla-aprobaciones',
    templateUrl: './tabla.component.html',
})
export class TablaAprobacionesKit implements OnInit {


    aprobacionesLista: Aprobacion[] = [];

    listaAprobFILTRO:  Aprobacion[] = [];

    first = 0;

    rows = 10;

    loading: boolean = true;

    filtroEmpleados: string = '';

    constructor(private aprobacionesServi: AprobacionService) { }

    ngOnInit(): void {
        this.aprobacionesServi.getAprobaciones()
            .subscribe(aprobacion => {this.aprobacionesLista = aprobacion,this.listaAprobFILTRO = aprobacion});
            this.loading = false;
    }



    Filtros(value: string, nombreFiltro: string) {
        console.log('----++5988'+nombreFiltro);
        let aprobacionesLisTemp: Aprobacion[] = [];
        if(nombreFiltro == 'empleado' && value.length > 0){
            this.aprobacionesLista.map((aproba)=>{
                const nombreEmple = aproba.id_empleado_admin.id_persona.nombre.toUpperCase()+' '+aproba.id_empleado_admin.id_persona.apellido.toUpperCase();
                if(nombreEmple.includes(value.toUpperCase())){
                    aprobacionesLisTemp.push(aproba);
                }
            });
            this.listaAprobFILTRO = aprobacionesLisTemp;
        }else{
            this.listaAprobFILTRO = this.aprobacionesLista;
        }
    }







    //--------------Paginacion
    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.aprobacionesLista ? this.first === (this.aprobacionesLista.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.aprobacionesLista ? this.first === 0 : true;
    }
}
*/