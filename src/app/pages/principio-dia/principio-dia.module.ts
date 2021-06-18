import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipioDiaPageRoutingModule } from './principio-dia-routing.module';

import { PrincipioDiaPage } from './principio-dia.page';
import {TaskPageModule} from "../gestion-task-owner/task/task.module";
import {ExpandableComponent} from "../../components/expandable/expandable.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipioDiaPageRoutingModule,
    TaskPageModule
  ],
  exports: [
    ExpandableComponent
  ],
  declarations: [PrincipioDiaPage, ExpandableComponent]
})
export class PrincipioDiaPageModule {}
