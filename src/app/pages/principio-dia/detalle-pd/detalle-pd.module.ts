import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePdPageRoutingModule } from './detalle-pd-routing.module';

import { DetallePdPage } from './detalle-pd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePdPageRoutingModule
  ],
  declarations: [DetallePdPage]
})
export class DetallePdPageModule {}
