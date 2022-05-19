import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Path } from 'src/app/config';
import { ActividadesRegistroComponent} from 'src/app/pages/tutorias/actividadesRegistro/actividadesRegistro.component';
import { DeudasConsultaComponent } from 'src/app/pages/tutorias/deudasConsulta/deudasConsulta.component';

const routes: Routes = [
  //Aqui Rutas
  {
  path:'',children:[
    {path:'tutorias/actividadesRegistro',component:ActividadesRegistroComponent},
  
    {path:'tutorias/deudasConsulta',component:DeudasConsultaComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutoriasRoutingModule { }
