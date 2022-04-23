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
                    routerLink: 'parametrizacion/malla'
                },
                {
                    label: 'Asignaturas',
                    icon: 'fa fa-book',
                    routerLink: 'parametrizacion/asignatura'
                }
            ]
        },
        
        {
            label: 'Inventario',
            icon: 'pi pi-fw pi-book',
            items: [
                {
                    label: 'Categoria',
                    icon: 'fa fa-plus-square',
                    routerLink: 'inventario/categoria'
                },
                {
                    label:'Articulo',
                    icon:'fa fa-book',
                    routerLink:'inventario/articulo'
                }
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
                    label:'Consulta De Deudas',
                    icon:'fa fa-book',
                    routerLink:'tutorias/tutorias/deudasConsulta'
                }
            ]
        },
         {
            label: 'Matriculas',
            icon: 'pi pi-fw pi-book',
            items: [
                {
                    label: 'Listar Matriculas',
                    icon: 'pi pi-list',
                    routerLink: 'matriculaModule/listarMatriculas'
                },
                {
                    label:'Listar Estudiantes',
                    icon:'fa fa-book',
                    routerLink:'matriculaModule/listarEstudiantes'
                },
                {
                    label:'Listar Estudiantes',
                    icon:'fa fa-book',
                    routerLink:'matriculaModule/eee'
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