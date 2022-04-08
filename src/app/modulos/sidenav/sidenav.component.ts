import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
<<<<<<< HEAD:src/app/modulos/sidenav/sidenav.component.ts
import { ServiceUsuarioService } from 'src/app/Servicio/roles_Usuario/service-usuario.service';
=======
import { Router } from '@angular/router';
>>>>>>> c2a466a106516fb1ee616bb59338ba91ef11f4c8:src/app/auth/login/login.component.ts

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

<<<<<<< HEAD:src/app/modulos/sidenav/sidenav.component.ts
    constructor(private router: Router, private userServis: ServiceUsuarioService) { }
    items: MenuItem[] = [];
    authValidate: boolean = false;
    ngOnInit() {
        this.authValidate = Boolean(this.userServis.dato);
=======
  constructor(private router: Router) { }
    panel = true;
    public isError = false;
    items: MenuItem[] = new Array();
>>>>>>> c2a466a106516fb1ee616bb59338ba91ef11f4c8:src/app/auth/login/login.component.ts

        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                routerLink: 'home'
            },
            {
                label: 'Dasboard',
                icon: 'pi pi-fw pi-book',
                routerLink: 'dashboard'
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
                    }
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
                            }
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
               separator:true
            },
            {
               label:'Quit',
               icon:'pi pi-fw pi-power-off'
            }
<<<<<<< HEAD:src/app/modulos/sidenav/sidenav.component.ts
        ]
=======
        ];
    }


    onIsError(): void {
        this.isError = true;
        setTimeout(() => {
            this.isError = false;
        }, 4000);
    }

    login() {
        this.router.navigate(['./main']);

>>>>>>> c2a466a106516fb1ee616bb59338ba91ef11f4c8:src/app/auth/login/login.component.ts
    }

}
