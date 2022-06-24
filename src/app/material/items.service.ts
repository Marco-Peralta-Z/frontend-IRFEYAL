import { Injectable } from '@angular/core';
import { AuthService } from '../Servicio/auth/auth.service';
import { MenuItem } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})

/**
* Si desea agregar otro rol de hacerlo asi: "ROLE_" + "nombre del rol de la bd" = 'ROLE_estudiante'
* Revisar el import.sql del back la tabla roles
*/

export class ItemsService {

    constructor(
        private _authService: AuthService,
    ) { }


    item = (): MenuItem[] => {
        return [
            {
                label: 'Inicio',
                icon: 'pi pi-fw pi-home',
                routerLink: 'home',
                visible: true
            },
            {
                label: 'Roles y Usuario',
                icon: 'fa fa-users',
                // si tiene el rol de acceso
                visible: this.hasRolUser(
                    ['ROLE_Administrador']
                ),
                items: [
                    {
                        label: 'Crear Empleado',
                        icon: 'fa fa-user',
                        routerLink: 'roles/empleado'
                    },
                    {
                        label: 'Crear Usuario',
                        icon: 'fa fa-user',
                        routerLink: 'roles/usuarios'
                    }
                ]
            },
            {
                label: 'Parametrizacion',
                icon: 'pi pi-fw pi-book',
                // si tiene el rol de acceso
                visible: this.hasRolUser(
                    ['ROLE_Administrador', 'ROLE_Coordinador administrativo', 'ROLE_Coordinador academico']
                ),
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
                label: 'Inventario',
                icon: 'fa fa-book',
                // si tiene el rol de acceso
                visible: this.hasRolUser(
                    ['ROLE_Administrador', 'ROLE_Coordinador de desarrollo institucional', 'ROLE_Coordinador administrativo']
                ),
                items: [
                    {
                        label: 'Inventario Modulos',
                        icon: 'pi pi-fw pi-book',
                        items: [
                            {
                                label: 'Entregar kit',
                                icon: 'pi pi-tags',
                                routerLink: 'inventariosModule/entregar/listar'
                            },
                            {
                                label: 'Mantenimiento Kits',
                                icon: 'pi pi-tag',
                                routerLink: 'inventariosModule/kit/listar'
                            },
                            {
                                label: 'Mantenimiento Módulos',
                                icon: 'pi pi-book',
                                routerLink: 'inventariosModule/modulo/listar'
                            },
                        ]
                    },
                    {
                        label: 'Inventario Articulos',
                        icon: 'fa fa-book',
                        items: [
                            {
                                label: 'Mantenimiento articulos',
                                icon: 'pi pi-table',
                                routerLink: 'inventariosModule/inventario/listar'
                            },
                            {
                                label: 'Mantenimiento categorias',
                                icon: 'pi pi-clone',
                                routerLink: 'inventariosModule/categoria/listar'
                            },

                        ]
                    },

                ]
            },
            {
                label: 'Tutorias',
                icon: 'pi pi-fw pi-book',
                // si tiene el rol de acceso
                visible: this.hasRolUser(
                    ['ROLE_Administrador', 'ROLE_Docente']
                ),
                items: [
                    {
                        label: 'Registro De Actividades',
                        icon: 'fa fa-plus-square',
                        routerLink: 'tutorias/tutorias/actividadesRegistro'
                    }
                ]
            },
            {
                label: 'Matriculas',
                // si tiene el rol de acceso
                visible: this.hasRolUser(
                    ['ROLE_Administrador', 'ROLE_Secretaria']
                ),
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
                        label: 'Estudiante',
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
            },
            {
                label: 'Asistencia',
                icon: 'pi pi-folder',
                // si tiene el rol de acceso
                visible: this.hasRolUser(
                    ['ROLE_Administrador', 'ROLE_Docente']
                ),
                items: [
                    {
                        label: 'Listar',
                        icon: 'fa fa-plus-square',
                        routerLink: 'asistencia/listarAsistencia'
                    },
                    {
                        label: 'Registrar',
                        icon: 'fa fa-book',
                        routerLink: 'asistencia/agregarAsistencia'
                    }
                ]
            },
            {
                label: 'Documentos Academicos',
                icon: 'pi pi-paperclip',
                // si tiene el rol de acceso
                visible: this.hasRolUser(
                    ['ROLE_Administrador']
                ),
                items: [
                    {
                        label: 'Generar Plan de Unidad',
                        icon: 'fa fa-plus',
                        routerLink: 'documentosacademicos/generarplandeunidad'
                    },
                    {
                        label: 'Revisar Plan de Unidad',
                        icon: 'fa fa-check-square',
                        routerLink: 'documentosacademicos/revisarplandeunidad'
                    }
                ]
            },
            {
                label: 'Documentos Academicos',
                icon: 'pi pi-paperclip',
                // si tiene el rol de acceso
                visible: this.hasRolUser(
                    ['ROLE_Docente']
                ),
                items: [
                    {
                        label: 'Generar Plan de Unidad',
                        icon: 'fa fa-plus',
                        routerLink: 'documentosacademicos/generarplandeunidad'
                    }
                ]
            },
            {
                label: 'Documentos Academicos',
                icon: 'pi pi-paperclip',
                // si tiene el rol de acceso
                visible: this.hasRolUser(
                    ['ROLE_Coordinador academico']
                ),
                items: [
                    {
                        label: 'Revisar Plan de Unidad',
                        icon: 'fa fa-check-square',
                        routerLink: 'documentosacademicos/revisarplandeunidad'
                    }
                ]
            },
            {
                label: 'Pagos',
                icon: 'pi pi-folder',
                visible: this.hasRolUser(
                    ['ROLE_Administrador', 'ROLE_Secretaria']
                ),
                items: [
                    {
                        label: 'Consultar Pagos',
                        icon: 'fa fa-book',
                        routerLink: 'pagos/listarComprobante'
                    },
                    {
                        label: 'Cobros',
                        icon: 'fa fa-plus-square',
                        routerLink: 'pagos/crearComprobante'
                    }
                    
                ]
            },
            {
                label: 'Secretaria',
                icon: 'pi pi-folder',
                visible: this.hasRolUser(
                    ['ROLE_Administrador', 'ROLE_Secretaria']
                ),
                items: [
                    {
                        label: 'Bitacora',
                        icon: 'fa fa-plus-square',
                        routerLink: 'secretaria/listarBitacora'
                    },
                    {
                        label: 'Documentos',
                        icon: 'pi pi-folder',
                        items: [
                            {
                                label: 'Lista de Documentos',
                                icon: 'fa fa-book',
                                routerLink: 'secretaria/listarDocumento'
                            },
                            {
                                label: 'Agregar Documentos',
                                icon: 'fa fa-plus-square',
                                routerLink: 'secretaria/agregarDocumento'
                            }
                        ]
                    },
                    {
                        label: 'Certificados',
                        icon: 'pi pi-folder',
                        items: [
                            {
                                label: 'Certificado de Matricula',
                                icon: 'fa fa-plus-square',
                                routerLink: 'secretaria/generarCertificadoMatricula'
                            },
                            {
                                label: 'Certificado de Promocion',
                                icon: 'fa fa-plus-square',
                                routerLink: 'secretaria/generarCertificadoPromocion'
                            }
                        ]
                    },
                    {
                        label: 'Nomina',
                        icon: 'pi pi-folder',
                        items: [
                            {
                                label: 'Nomina Estudiantil',
                                icon: 'fa fa-plus-square',
                                routerLink: 'secretaria/nominaEstudiantil'
                            }
                        ]
                    }
                ]
            }
        ]
    }

    hasRolUser = (roles: string[]) => {
        for (let i = 0; i < roles.length; i++) {
            // vemos si un rol hace match con los del token
            if (this._authService.hasRole(roles[i])) {
                return true;
            }
        }
        return false;
    }
}
