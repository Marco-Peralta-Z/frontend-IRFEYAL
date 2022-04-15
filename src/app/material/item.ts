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
                    label: 'Agregar',
                    icon: 'fa fa-plus-square',
                    routerLink: 'parametrizacion'
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