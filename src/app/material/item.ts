export let item = {
    items: [
        {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            routerLink: 'home'
        },
        {
            label: 'Parametrizacion',
            icon: 'pi pi-fw pi-book',
            items: [
                {
                    label: 'Periodo',
                    icon: 'fa fa-indent',
                    routerLink: 'parametrizacion/periodo'
                },
                {
                    label: 'Malla',
                    icon: 'fa fa-file-text',
                    routerLink: 'parametrizacion/malla',

                },
                {
                    label: 'Asignaturas',
                    icon: 'fa fa-book',
                    routerLink: 'parametrizacion/asignatura',

                }
            ]
        },
        {
            label: 'Roles y Usuario',
            icon: 'fa fa-users',
            items: [{
                label: 'Usuario',
                icon: 'fa fa-user',
                routerLink: 'roles/usuarios'
            }]
        },

        {
            label: 'Inventario',
            icon: 'fa fa-book',
            items: [
                {
                    label: 'Inventario Modulos',
                    icon: 'pi pi-fw pi-book',
                    routerLink: 'inventariosModule/kit',
                    items: [
                        {
                            label: 'Mantenimiento Kits',
                            icon: 'fa fa-book',
                            routerLink: 'inventariosModule/kit'
                        },
                        {
                            label: 'Aprobaciones',
                            icon: 'fa fa-book',
                            routerLink: 'inventariosModule/aprobaciones'
                        }
                    ]
                },
                {
                    label: 'Inventario Articulos',
                    icon: 'fa fa-book',
                    routerLink: 'inventariosModule/kit',
                    items: [
                        {
                            label: 'Mantenimiento articulos',
                            icon: 'fa fa-book',
                            routerLink: 'inventariosModule/articulo'
                        },

                    ]
                },

            ]
        },
        {
            label: 'Tutorias',
            icon: 'pi pi-fw pi-book',
            items: [
                {
                    label: 'Registro De Actividades',
                    icon: 'fa fa-plus-square',
                    routerLink: 'tutorias/tutorias/actividadesRegistro'
                },
                {
                    label: 'Articulo',
                    icon: 'fa fa-book',
                    routerLink: 'inventario/articulo'
                }
            ]
        },
        {
            label: 'Matriculas',
            icon: 'pi pi-folder',
            items: [
                {
                    label: 'Matricula',
                    icon: 'pi pi-list',
                    items: [
                        {
                            label: 'crear',
                            icon: 'pi pi-plus',
                            routerLink: 'matriculaModule/agregarMatricula',
                        },
                        {
                            label: 'Listar',
                            icon: 'fa fa-book',
                            routerLink: 'matriculaModule/listarMatriculas',
                        }
                    ]
                },
                {
                    label: 'Estudiantes',
                    icon: 'pi pi-users',
                    items: [
                        {
                            label: 'Registrar',
                            icon: 'pi pi-plus',
                            routerLink: 'matriculaModule/agregarEstudiante'
                        },
                        {
                            label: 'Listar',
                            icon: 'fa fa-book',
                            routerLink: 'matriculaModule/listarEstudiantes'
                        }
                    ]
                }
            ]
        }
    ]
}
export let responsive = {
    responsiveOptions: [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ]
}