import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretariaRoutingModule } from './secretaria-routing.module';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { ListarBitacoraComponent } from 'src/app/pages/secretaria/bitacora/listar-bitacora/listar-bitacora.component';
import { ListarDocumentoComponent } from 'src/app/pages/secretaria/bitacora/documento/listar-documento/listar-documento.component';
import { AgregarDocumentoComponent } from 'src/app/pages/secretaria/bitacora/documento/agregar-documento/agregar-documento.component';
import { GenerarCertificadomatriculaComponent } from 'src/app/pages/secretaria/certificados/generar-certificadomatricula/generar-certificadomatricula.component';
import { GenerarCertificadopromocionComponent } from 'src/app/pages/secretaria/certificados/generar-certificadopromocion/generar-certificadopromocion.component';
import { NominaEstudiantilComponent } from 'src/app/pages/secretaria/nomina/nomina-estudiantil/nomina-estudiantil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListarBitacoraComponent,
    ListarDocumentoComponent,
    AgregarDocumentoComponent,
    GenerarCertificadomatriculaComponent,
    GenerarCertificadopromocionComponent,
    NominaEstudiantilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,

    SecretariaRoutingModule
  ]
})
export class SecretariaModule { }
