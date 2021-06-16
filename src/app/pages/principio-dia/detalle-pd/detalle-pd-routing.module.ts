import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePdPage } from './detalle-pd.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePdPageRoutingModule {}
