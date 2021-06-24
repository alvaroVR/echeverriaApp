import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalListaComponent} from "./modal-lista/modal-lista.component";
import {ModalComponent} from "./modal/modal.component";
import {HeaderComponent} from "./header/header.component";
import {ExpandableComponent} from "./expandable/expandable.component";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {MenuComponent} from "./menu/menu.component";


@NgModule({
  declarations: [ModalListaComponent, ModalComponent, HeaderComponent, ExpandableComponent, MenuComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [ModalListaComponent, ModalComponent, HeaderComponent, ExpandableComponent, MenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {
}
