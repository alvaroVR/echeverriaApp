import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalDiaPage } from './final-dia.page';

const routes: Routes = [
  {
    path: '',
    component: FinalDiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalDiaPageRoutingModule {}
