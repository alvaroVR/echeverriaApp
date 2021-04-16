import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';

import { TaskPage } from './task.page';
import {HeaderComponent} from "../../../components/header/header.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [TaskPage, HeaderComponent]
})
export class TaskPageModule {}
