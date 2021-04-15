import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionTaskOwnerPage } from './gestion-task-owner.page';

const routes: Routes = [
  {
    path: '',
    component: GestionTaskOwnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionTaskOwnerPageRoutingModule {}
