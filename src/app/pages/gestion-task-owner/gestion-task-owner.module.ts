import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionTaskOwnerPageRoutingModule } from './gestion-task-owner-routing.module';

import { GestionTaskOwnerPage } from './gestion-task-owner.page';
import {TaskPageModule} from "./task/task.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionTaskOwnerPageRoutingModule,
    TaskPageModule
  ],
  declarations: [GestionTaskOwnerPage]
})
export class GestionTaskOwnerPageModule {}
