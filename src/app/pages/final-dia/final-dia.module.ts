import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FinalDiaPageRoutingModule} from './final-dia-routing.module';

import {FinalDiaPage} from './final-dia.page';
import {TaskPageModule} from "../gestion-task-owner/task/task.module";
import {PrincipioDiaPageModule} from "../principio-dia/principio-dia.module";
import {ExpandableComponent} from "../../components/expandable/expandable.component";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalDiaPageRoutingModule,
    TaskPageModule,
    PrincipioDiaPageModule,
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
  declarations: [FinalDiaPage]
})
export class FinalDiaPageModule {
}
