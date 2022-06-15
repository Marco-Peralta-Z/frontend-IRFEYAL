import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignaturasComponent } from 'src/app/pages/parametrizacion/asignaturas/asignaturas.component';
import { AgregarDocumentoComponent } from 'src/app/pages/secretaria/bitacora/documento/agregar-documento/agregar-documento.component';
import { ListarDocumentoComponent } from 'src/app/pages/secretaria/bitacora/documento/listar-documento/listar-documento.component';
import { ListarBitacoraComponent } from 'src/app/pages/secretaria/bitacora/listar-bitacora/listar-bitacora.component';
import { GenerarCertificadomatriculaComponent } from 'src/app/pages/secretaria/certificados/generar-certificadomatricula/generar-certificadomatricula.component';
import { GenerarCertificadopromocionComponent } from 'src/app/pages/secretaria/certificados/generar-certificadopromocion/generar-certificadopromocion.component';
import { NominaEstudiantilComponent } from 'src/app/pages/secretaria/nomina/nomina-estudiantil/nomina-estudiantil.component';

const routes: Routes = [
  //Aqui Rutas
  {
    path:'',
    children: [
      {
        path:'listarBitacora',
        component: ListarBitacoraComponent
      },
      {
        path: 'listarDocumento',
        component: ListarDocumentoComponent
      },
      {
        path: 'agregarDocumento',
        component: AgregarDocumentoComponent
      },
      {
        path:'generarCertificadoMatricula',
        component: GenerarCertificadomatriculaComponent
      },
      {
        path:'generarCertificadoPromocion',
        component: GenerarCertificadopromocionComponent
      },
      {
        path:'nominaEstudiantil',
        component: NominaEstudiantilComponent
      }

    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretariaRoutingModule { }
