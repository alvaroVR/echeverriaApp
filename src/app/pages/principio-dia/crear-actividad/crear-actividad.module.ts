import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CrearActividadPageRoutingModule} from './crear-actividad-routing.module';

import {CrearActividadPage} from './crear-actividad.page';
import {TaskPageModule} from "../../gestion-task-owner/task/task.module";
import {ModalComponent} from "../../../components/modal/modal.component";
import {ModalListaComponent} from "../../../components/modal-lista/modal-lista.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearActividadPageRoutingModule,
    TaskPageModule
  ],
  exports: [ModalComponent, ModalListaComponent],
  declarations: [CrearActividadPage, ModalComponent, ModalListaComponent]
})
export class CrearActividadPageModule {
}
