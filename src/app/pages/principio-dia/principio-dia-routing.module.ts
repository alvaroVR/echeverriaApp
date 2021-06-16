import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipioDiaPage } from './principio-dia.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipioDiaPage
  },
  {
    path: 'detalle-pd',
    loadChildren: () => import('./detalle-pd/detalle-pd.module').then( m => m.DetallePdPageModule)
  },
  {
    path: 'crear-actividad',
    loadChildren: () => import('./crear-actividad/crear-actividad.module').then( m => m.CrearActividadPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipioDiaPageRoutingModule {}
