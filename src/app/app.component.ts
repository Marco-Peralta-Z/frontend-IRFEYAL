import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'frond_ifreyal';
    constructor(private router: Router) { }
    panel = true;
    public isError = false;
    items: MenuItem[] = new Array();

    ngOnInit(): void {
        this.router.navigate(['']);
        this.items = [
            {
                label: 'Parametrizacion',
                icon: 'fa fa-briefcase',
                items: [
                    {
                        label: 'Mallas',
                        icon: 'fa fa-file-text',
                        items: [
                            {
                                label: 'Agregar Malla',
                                icon: 'fa fa-file-text-o'
                            },
                            {
                                label: 'Ver Mallas',
                                icon: 'fa fa-eye',
                                items: [
                                    {
                                        label: "Mallas Activos"
                                    },
                                    {
                                        label: "Todo"
                                    }
                                ]
                            }

                        ]
                    }, {
                        label: 'Periodos',
                        icon: 'fa fa-graduation-cap',
                        items: [

                            {
                                label: 'Ver Periodos',
                                icon: 'fa fa-eye',
                                items: [
                                    {
                                        label: "Peridos Activos"
                                    },
                                    {
                                        label: "Peridos Todos"
                                    }
                                ]
                            }

                        ]
                    },
                    {
                        label: 'Asignaturas',
                        icon: 'fa fa-book',
                        items: [
                            {
                                label: 'Agregar Asignaturas',
                                icon: 'fa fa-file-text-o'
                            },
                            {
                                label: 'Ver Asignaturas',
                                icon: 'fa fa-eye'
                            }



                        ]
                    }

                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'Left',
                        icon: 'pi pi-fw pi-align-left'
                    },
                    {
                        label: 'Right',
                        icon: 'pi pi-fw pi-align-right'
                    },
                    {
                        label: 'Center',
                        icon: 'pi pi-fw pi-align-center'
                    },
                    {
                        label: 'Justify',
                        icon: 'pi pi-fw pi-align-justify'
                    },

                ]
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus',

                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus',

                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Save',
                                icon: 'pi pi-fw pi-calendar-plus'
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-calendar-minus'
                            },

                        ]
                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-power-off'
            }
        ];
    }


    onIsError(): void {
        this.isError = true;
        setTimeout(() => {
            this.isError = false;
        }, 4000);
    }

    login() {
        this.panel = false;

    }



}
