import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionTaskOwnerPageRoutingModule } from './gestion-task-owner-routing.module';

import { GestionTaskOwnerPage } from './gestion-task-owner.page';
import {TaskPageModule} from "./task/task.module";
import {ExpandableComponent} from "../../components/expandable/expandable.component";
import {HeaderComponent} from "../../components/header/header.component";
import {PrincipioDiaPageModule} from "../principio-dia/principio-dia.module";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionTaskOwnerPageRoutingModule,
    TaskPageModule,
    PrincipioDiaPageModule,
    ComponentsModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [GestionTaskOwnerPage]
})
export class GestionTaskOwnerPageModule {}
