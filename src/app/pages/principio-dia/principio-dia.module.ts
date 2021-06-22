import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipioDiaPageRoutingModule } from './principio-dia-routing.module';

import { PrincipioDiaPage } from './principio-dia.page';
import {TaskPageModule} from "../gestion-task-owner/task/task.module";
import {ExpandableComponent} from "../../components/expandable/expandable.component";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipioDiaPageRoutingModule,
    TaskPageModule,
    ComponentsModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PrincipioDiaPage]
})
export class PrincipioDiaPageModule {}
