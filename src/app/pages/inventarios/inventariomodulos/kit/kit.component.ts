import { Component, OnInit, Input } from '@angular/core';
@Component({
    selector: 'app-mant-kits',
    templateUrl: './kit.component.html',
    styleUrls: ['./kit.component.scss'],
})
export class KitComponent implements OnInit {

    tablaAprobacionesKit: string = 'none';
    tablaIngresosKit: string = 'none';
    addKit: string = 'none';



    constructor() { }

    itemsMenu = [
        {
            label: 'Ingreso de kits',
            items: [
                {
                    label: 'Listado',
                    icon: 'pi pi-fw pi-bars',

                    items: [
                        {
                            label: 'Aprobaciones',
                            icon: 'pi pi-fw pi-bars',
                            command: () => { this.showDialog('showTablaAproba') }
                        },
                        {
                            label: 'Ingresos kits',
                            icon: 'pi pi-fw pi-bars',
                            command: () => { this.showDialog('showTablaIngreso') }

                        },


                    ]
                }
            ]
        },
        {
            label: 'Mantenimiento Kit',
            icon: 'pi pi-fw pi-plus',
            items: [
                {
                    label: 'Nuevo kit',
                    icon: 'pi pi-fw pi-plus',
                    command: () => { this.showDialog('showAddKit') }
                },
                {
                    label: 'Actualizar kit',
                    icon: 'pi pi-fw pi-plus',
                },
                {
                    label: 'Eliminar kit',
                    icon: 'pi pi-fw pi-plus',
                },
                {
                    label: 'Buscar kit',
                    icon: 'pi pi-fw pi-plus',
                }

            ]
        },
        {
            label: 'Modulo',
            icon: 'pi pi-fw pi-plus',
            items: [
                {
                    label: 'Nuevo Modulo',
                    icon: 'pi pi-fw pi-plus',
                },
                {
                    label: 'Actualizar Modulo',
                    icon: 'pi pi-fw pi-plus',
                },
                {
                    label: 'Eliminar Modulo',
                    icon: 'pi pi-fw pi-plus',
                },
                {
                    label: 'Buscar Modulo',
                    icon: 'pi pi-fw pi-plus',
                }

            ]
        },
    ];


    showDialog(showChange: string) {
        this.tablaAprobacionesKit = 'none';
        this.tablaIngresosKit = 'none';
        this.addKit = 'none';



        switch (showChange) {
            case 'showTablaAproba':
                this.tablaAprobacionesKit = 'inline';
                break;
            case 'showTablaIngreso':
                this.tablaIngresosKit = 'inline';
                break;
            case 'showAddKit':
                this.addKit = 'inline';
                break;
        }





    }

    ngOnInit(): void {

    }

}