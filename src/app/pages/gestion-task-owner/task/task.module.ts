import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {TaskPageRoutingModule} from './task-routing.module';

import {TaskPage} from './task.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule,
    ReactiveFormsModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [TaskPage]
})
export class TaskPageModule {
}
