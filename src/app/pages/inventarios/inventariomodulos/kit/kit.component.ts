import { Component, OnInit, Input } from '@angular/core';
@Component({
    selector: 'app-mant-kits',
    templateUrl: './kit.component.html',
    styleUrls: ['./kit.component.scss'],
})
export class KitComponent implements OnInit {
    
    constructor() { }
    
    itemsMenu = [
        {   
            label:'Ingreso de kits',
            items:[
                {
                    label:'Listado',
                    icon:'pi pi-fw pi-bars',
                    items:[
                    {
                        label:'Ingresos kits',
                        icon:'pi pi-fw pi-bars',
                    },
                    {
                        label:'Aprobaciones',
                        icon:'pi pi-fw pi-bars',
                    }

                    ]
                }
            ]
        },
        {
            label:'Kit',
            icon:'pi pi-fw pi-plus',
            items:[
                {
                    label:'Nuevo kit',
                    icon:'pi pi-fw pi-plus',
                },
                {
                    label:'Actualizar kit',
                    icon:'pi pi-fw pi-plus',
                },
                {
                    label:'Eliminar kit',
                    icon:'pi pi-fw pi-plus',
                },
                {
                    label:'Buscar kit',
                    icon:'pi pi-fw pi-plus',
                }

            ]
        },
        {
            label:'Modulo',
            icon:'pi pi-fw pi-plus',
            items:[
                {
                    label:'Nuevo Modulo',
                    icon:'pi pi-fw pi-plus',
                },
                {
                    label:'Actualizar Modulo',
                    icon:'pi pi-fw pi-plus',
                },
                {
                    label:'Eliminar Modulo',
                    icon:'pi pi-fw pi-plus',
                },
                {
                    label:'Buscar Modulo',
                    icon:'pi pi-fw pi-plus',
                }

            ]
        },
    ];



   
  
    ngOnInit(): void {
        
    }
  
  }