import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearActividadPage } from './crear-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: CrearActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearActividadPageRoutingModule {}
