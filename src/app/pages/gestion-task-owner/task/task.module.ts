import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {TaskPageRoutingModule} from './task-routing.module';

import {TaskPage} from './task.page';
import {HeaderComponent} from '../../../components/header/header.component';
import {ExpandableComponent} from '../../../components/expandable/expandable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,

  ],
  declarations: [TaskPage, HeaderComponent]
})
export class TaskPageModule {
}
